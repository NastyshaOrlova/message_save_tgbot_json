import { makeId } from '../utils';
import { readData } from './json/readData';
import { ID, MessageData } from './json/types';
import { writeData } from './json/writeData';
import { messageEntityToData } from './lib/messageEntityToData';
import { Message } from './types';

export const createMessage = ({ userId, text, timestamp }: { userId: ID; text: string; timestamp?: Date }): Message => {
  const currentUsers = readData();
  const user = currentUsers.users.find(user => user.id === userId);

  if (!user) throw Error(`User with id ${userId} was not found.`);

  const newMessage: Message = {
    id: makeId(),
    index: user.messages.length,
    text,
    timestamp: timestamp || new Date(),
  };

  user.messages.push(messageEntityToData(newMessage));
  writeData(currentUsers);
  return newMessage;
};
