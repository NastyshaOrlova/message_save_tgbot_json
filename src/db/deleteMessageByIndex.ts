import { readData } from './json/readData';
import { ID } from './json/types';
import { writeData } from './json/writeData';

export const deleteMessageByIndex = ({ id, index }: { id: ID; index: number }): void => {
  const currentUsers = readData();
  const user = currentUsers.users.find(user => user.id === id);
  if (!user) throw Error(`User with id ${id} not found`);

  if (!user.messages[index]) throw Error(`Message with index ${index} not found`);

  const newMessages = user.messages.filter((_, i) => i !== index);
  user.messages = newMessages;
  writeData(currentUsers);
};
