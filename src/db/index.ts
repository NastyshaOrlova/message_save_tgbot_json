import { makeId } from '../utils';
import { json } from './json';

type ID = number;

type Message = {
  id: ID;
  text: string;
  timestamp: Date;
};

type User = {
  id: ID;
  messages: Message[];
};

export const db = {
  createUser: (): User => {
    const users = json.users.read();
    const newUser = { id: makeId(), messages: [] as number[] };
    users.push(newUser);
    json.users.write(users);
    return { ...newUser, messages: [] };
  },
  getUsers: (): User[] => {
    const messagesMap = json.messages.read();
    const users = json.users.read().map(user => ({
      ...user,
      messages: user.messages.map(messageId => ({
        ...messagesMap[messageId],
        timestamp: new Date(messagesMap[messageId].timestamp),
      })),
    }));
    return users;
  },
  createMessage: ({ text, timestamp, userId }: { text: string; timestamp: Date; userId: ID }): Message => {
    const users = json.users.read();
    const user = users.find(user => user.id === userId);
    if (!user) throw new Error(`User with id ${userId} not found`);

    const newMessage = { id: makeId(), text, timestamp };
    const messagesMap = json.messages.read();

    messagesMap[newMessage.id] = { ...newMessage, timestamp: newMessage.timestamp.toISOString() };
    user.messages.push(newMessage.id);

    json.messages.write(messagesMap);
    json.users.write(users);
    return newMessage;
  },
};
