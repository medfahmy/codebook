import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { log } from "../config/logger";
import { IUser } from "../model/user.model";

export const signJWT = (
  user: IUser,
  callback: (error: Error | null, token: string | null) => void
): void => {
  let timeSinceEpoch = new Date().getTime();
  // expiration time in milliseconds
  let expirationTime =
    timeSinceEpoch + Number(config.token.expireTime) * 100000;
  let expirationTimeInSeconds = Math.floor(expirationTime / 1000);

  try {
    jwt.sign(
      {
        email: user.email,
      },
      config.token.secret,
      {
        issuer: config.token.issuer,
        algorithm: "HS256",
        expiresIn: expirationTimeInSeconds,
      },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      }
    );
  } catch (error) {
    log.error(error.message, error);
    callback(error, null);
  }
};
