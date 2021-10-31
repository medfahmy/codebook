import { Request, Response } from 'express';
import { User } from '../entity/user.entity';
import { compare, hash } from 'bcryptjs';
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from './auth';
import { verify } from 'jsonwebtoken';
import { Router } from 'express';
import { getConnection } from 'typeorm';

async function users(_req: Request, res: Response) {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.send(500).json({ message: error.message, error });
  }
};

async function me(req: Request, res: Response) {
  const authorization = req.headers['authorization'];

  if (!authorization) {
    return res.status(200).json({ username: '' });
  }

  try {
    const token = authorization.split(' ')[1];
    const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    const user = await User.findOne(payload.userId);

    return res.status(200).json({ username: user!.username });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

async function register(req: Request, res: Response) {
  const { username, password } = req.body;
  const _user = await User.findOne({ where: { username } });
  if (_user) {
    return res.status(400).json({ message: 'username already exists' });
  }

  const hashedPassword = await hash(password, 10);

  try {
    await User.insert({ username, password: hashedPassword });
  } catch (error) {
    console.log(error);
    return res.send(500).json({ message: error.message, error });
  }

  return res.status(201).json({ message: 'success' });
};

async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user) {
    return res.status(400).json({ message: 'username not found' });
  }

  const isValid = await compare(password, user.password);

  if (!isValid) {
    return res.status(400).json({ message: 'wrong password' });
  }

  sendRefreshToken(res, createRefreshToken(user));

  return res.status(200).json({
    accessToken: createAccessToken(user),
    username: user.username,
  });
};

async function refreshToken(req: Request, res: Response) {
  const token = req.cookies.jid;

  if (!token) {
    return res.status(400).json({
      ok: false,
      accessToken: '',
    });
  }

  let payload: any = null;

  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      accessToken: '',
    });
  }

  const user = await User.findOne({ id: payload.userId });

  if (!user) {
    return res.status(400).json({
      ok: false,
      accessToken: '',
    });
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return res.status(400).json({
      ok: false,
      accessToken: '',
    });
  }

  sendRefreshToken(res, createRefreshToken(user));

  return res.status(200).json({
    ok: true,
    accessToken: createAccessToken(user),
  });
};

async function revokeRefreshToken(req: Request, res: Response) {
  const id = req.body.userId;
  await getConnection()
    .getRepository(User)
    .increment({ id }, 'tokenVersion', 1);

  return res.sendStatus(200);
};

function logout(_req: Request, res: Response) {
  sendRefreshToken(res, '');
  return res.sendStatus(200);
};

async function deleteById(req: Request, res: Response) {
  const id: any = req.params.id;
  await User.delete({ id });

  return res.sendStatus(200);
};

const userRouter = Router();

userRouter.get('/get', users);
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/refresh_token', refreshToken);
userRouter.get('/logout', logout);
userRouter.get('/me', me);
userRouter.post('/revoke', revokeRefreshToken);
userRouter.delete('/deleteById/:id', deleteById);

export { userRouter };
