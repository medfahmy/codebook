import { User } from '../entity/user.entity';
import { sign } from 'jsonwebtoken';
import { Response } from 'express';

export const createAccessToken = (user: User) =>
  sign(
    { userId: user.id },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: '10m' }
  );

export const createRefreshToken = (user: User) =>
  sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: '7d' }
  );

export const sendRefreshToken = (res: Response, token: string) =>
  res.cookie('jid', token, { httpOnly: true, path: '/refresh_token' });
