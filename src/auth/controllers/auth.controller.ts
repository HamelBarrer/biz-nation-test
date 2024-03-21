import { Request, Response } from 'express';
import { verificationHash } from '../../utils/creationHash.util';
import { creationToken } from '../../utils/token.util';
import { createUser, findUserByEmail } from '../repository/auth.repository';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const repository = await findUserByEmail(email);
  if (!repository) {
    res.status(404).json({ message: 'Email or password incorrect' });
    return;
  }

  if (!(await verificationHash(repository.password, password))) {
    res.status(404).json({ message: 'Email or password incorrect' });
    return;
  }

  const token = await creationToken(repository.userId, repository.userRoleId);

  res.status(200).json({ ...repository, token });
};

export const registerUser = async (req: Request, res: Response) => {
  const repository = await createUser(req.body);

  res.status(201).json(repository);
};
