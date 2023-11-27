import { readData } from './json/readData';
import { ID } from './json/types';
import { writeData } from './json/writeData';

export const deleteAllMessages = (id: ID): void => {
  const currentUsers = readData();
  const currentUser = currentUsers.users.find(user => user.id === id);

  if (!currentUser) throw Error(`User with id ${id} not found`);

  currentUser.messages = [];

  writeData(currentUsers);
};
