import { readData } from './json/readData';
import { ID } from './json/types';
import { writeData } from './json/writeData';

export const deleteMessageByIndex = ({ userId, index }: { userId: ID; index: number }): void => {
  const currentUsers = readData();
  const user = currentUsers.users.find(user => user.id === userId);
  if (!user) throw Error(`User with id ${userId} not found`);

  if (!user.messages[index]) throw Error(`Message with index ${index} not found`);

  const newMessages = user.messages.filter((_, i) => i !== index);
  user.messages = newMessages;
  writeData(currentUsers);
};
