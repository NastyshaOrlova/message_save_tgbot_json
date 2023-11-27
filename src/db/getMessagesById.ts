import { readData } from './json/readData';
import { ID } from './json/types';
import { messageDataToEntity } from './lib/messageDataToEntity';
import { Message } from './types';

export const getMessagesByUserId = (id: ID): Message[] => {
  const users = readData();
  const messages = users.users.find(user => user.id === id)?.messages ?? [];
  return messages.map(messageDataToEntity);
};
