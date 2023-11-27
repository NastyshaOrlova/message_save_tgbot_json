import { db } from '../db/index';

export const auth = (userId: number) => {
  return db.checkUserAuth(userId);
};
