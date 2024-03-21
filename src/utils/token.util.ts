import { SignJWT, jwtVerify } from 'jose';

export const creationToken = async (userId: number) => {
  const secret = new TextEncoder().encode(process.env.SECRET_KEY);

  const alg = 'HS256';

  const jwt = await new SignJWT({ userId })
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

    return payload.userId as number;
  } catch (error) {
    return 0;
  }
};
