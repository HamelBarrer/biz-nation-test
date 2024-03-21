import argon2 from 'argon2';

export const creationHash = async (textPlain: string) => {
  return await argon2.hash(textPlain);
};

export const verificationHash = async (textHash: string, textPlain: string) => {
  return await argon2.verify(textHash, textPlain);
};
