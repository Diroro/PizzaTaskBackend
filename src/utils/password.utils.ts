import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const createHash = (plainTextPassword: string) => bcrypt.hash(plainTextPassword, SALT_ROUNDS);

const comparePasswords = (plainTextPassword: string, hash: string) =>
  bcrypt.compare(plainTextPassword, hash);

export const passwordUtils = {
  createHash,
  comparePasswords,
};
