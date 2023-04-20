import bcrypt from 'bcrypt';

export const encrypt = async (password: string) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

export const compare = async (password: string, hashPassword: string) =>
  await bcrypt.compare(password, hashPassword);
