import { readData } from './json/readData';
import { ID } from './json/types';
import { writeData } from './json/writeData';

export const deleteUserById = (id: ID): void => {
  const currentUsers = readData();
  const userIndex = currentUsers.users.findIndex(user => user.id === id);

  if (userIndex === -1) throw Error(`User with id ${id} not found`);

  currentUsers.users.splice(userIndex, 1);

  writeData(currentUsers);
};
