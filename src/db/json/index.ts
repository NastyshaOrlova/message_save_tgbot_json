import { existsSync, readFileSync, writeFileSync } from 'fs';

type ID = number;

type MessageData = {
  id: ID;
  text: string;
  timestamp: string;
};

type UserData = {
  id: ID;
  messages: ID[];
};

type MessagesFile = Record<ID, MessageData>;
type UsersFile = UserData[];

const MESSAGES_JSON = __dirname + '/messages.json';
if (!existsSync(MESSAGES_JSON)) throw new Error('MESSAGES_JSON is not provided!');

const USERS_JSON = __dirname + '/users.json';
if (!existsSync(USERS_JSON)) throw new Error('USERS_JSON is not provided!');

export const json = {
  messages: {
    read: () => JSON.parse(readFileSync(MESSAGES_JSON, 'utf-8')) as MessagesFile,
    write: (messagesMap: MessagesFile) => writeFileSync(MESSAGES_JSON, JSON.stringify(messagesMap, null, 2), 'utf-8'),
  },
  users: {
    read: () => JSON.parse(readFileSync(USERS_JSON, 'utf-8')) as UsersFile,
    write: (users: UserData[]) => writeFileSync(USERS_JSON, JSON.stringify(users, null, 2), 'utf-8'),
  },
};
