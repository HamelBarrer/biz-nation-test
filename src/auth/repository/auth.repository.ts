import { PrismaClient } from '@prisma/client';
import { creationHash } from '../../utils/creationHash.util';
import { AuthI } from '../types/auth.type';

const prisma = new PrismaClient();

export const createUser = async (auth: AuthI) => {
  const password = await creationHash(auth.password);

  const user = await prisma.users.create({
    data: {
      fullname: auth.fullname,
      birthdate: auth.birthdate,
      email: auth.email,
      password,
      userRoleId: auth.userRoleId,
    },
  });

  return user;
};

export const findUserByEmail = async (email: string) => {
  return await prisma.users.findFirst({
    where: {
      email,
    },
  });
};
