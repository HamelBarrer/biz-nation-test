import { NextFunction, Request, Response } from 'express';
import { validationToken } from '../utils/token.util';

export const verificationJWTToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).json({ message: 'Information not found' });

  if (!token.toLocaleLowerCase().startsWith('bearer'))
    return res.status(403).json({ message: 'Information not found' });

  const jwt = token.substring(7);

  const { userId, userRoleId } = await validationToken(jwt);
  if (!userId) {
    return res.status(404).json({ message: 'Information not found' });
  }
  if (!userRoleId) {
    return res.status(404).json({ message: 'Information not found' });
  }

  req.userId = userId as number;
  req.userRoleId = userRoleId as number;

  return next();
};

export const verificationAdminRole = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.userRoleId !== 1) {
    res
      .status(403)
      .json({ message: 'does not have the necessary permissions' });

    return;
  }

  next();
};

export const verificationStudentRole = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.userRoleId !== 2) {
    res
      .status(403)
      .json({ message: 'does not have the necessary permissions' });

    return;
  }

  next();
};
