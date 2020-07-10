import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const createHash = (plainTextPassword: string) => bcrypt.hash(plainTextPassword, SALT_ROUNDS);

const comparePasswords = async (plainTextPassword: string, hash: string) =>
  await bcrypt.compare(plainTextPassword, hash);

export const passwordUtils = {
  createHash,
  comparePasswords,
};
