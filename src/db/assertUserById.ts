import { ID } from './json/types';
import { User } from './types';
import { getUserById } from './getUserById';

export const assertUserById = (id: ID): User => {
  const user = getUserById(id);
  if (!user) throw Error(`User with id ${id} not found`);
  return user;
};
