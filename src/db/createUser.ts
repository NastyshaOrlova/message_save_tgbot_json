import { makeId } from '../utils';
import { readData } from './json/readData';
import { UserData } from './json/types';
import { writeData } from './json/writeData';

export const createUser = (id?: number): UserData => {
  const currentUsers = readData();

  id = id ?? makeId();

  if (currentUsers.users.some(user => user.id === id)) throw Error('This ID already exists');

  const newUser: UserData = { id: id, messages: [] };

  currentUsers.users.push(newUser);
  writeData(currentUsers);
  return newUser;
};
