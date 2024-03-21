import { SignJWT, jwtVerify } from 'jose';

export const creationToken = async (userId: number, userRoleId: number) => {
  const secret = new TextEncoder().encode(process.env.SECRET_KEY);

  const alg = 'HS256';

  const jwt = await new SignJWT({ userId, userRoleId })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret);

  return jwt;
};

export const validationToken = async (token: string) => {
  try {
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);

    const { payload } = await jwtVerify(token, secret);

    return { userId: payload.userId, userRoleId: payload.userRoleId };
  } catch (error) {
    return {};
  }
};
