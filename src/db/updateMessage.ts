import { readData } from './json/readData';
import { ID } from './json/types';
import { writeData } from './json/writeData';

export const updateMessage = ({ id, text }: { id: ID; text: string }) => {
  const currentUsers = readData();
  const currentUser = currentUsers.users.find(user => user.messages.some(message => message.id === id));
  if (!currentUser) throw Error('A user with such a message was not found.');

  const currentMessage = currentUser.messages.find(message => message.id === id);
  if (!currentMessage) throw Error('Message was not found');

  currentMessage.text = text;

  writeData(currentUsers);
  return currentMessage;
};
