import { readData } from './json/readData';
import { ID } from './json/types';
import { userDataToEntity } from './lib/userDataToEntity';
import { User } from './types';

export const getUserById = (id: ID): User | undefined => {
  const currentUsers = readData();
  const user = currentUsers.users.find(user => user.id === id);

  if (!user) return undefined;

  return userDataToEntity(user);
};
