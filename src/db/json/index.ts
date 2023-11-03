import { existsSync, readFileSync, writeFileSync } from 'fs';

export type ID = number;

export type MessageData = {
  id: ID;
  text: string;
  timestamp: string;
};

export type UserData = {
  id: ID;
  messages: MessageData[];
};

type JsonFile = {
  users: UserData[];
};

const JSON_SOURCE = __dirname + '/.json';

export const json = {
  read: (): JsonFile => {
    if (!existsSync(JSON_SOURCE)) writeFileSync(JSON_SOURCE, JSON.stringify({ users: [] }, null, 2));
    const data = readFileSync(JSON_SOURCE, 'utf-8');
    return JSON.parse(data);
  },
  write: (data: JsonFile) => {
    writeFileSync(JSON_SOURCE, JSON.stringify(data, null, 2));
  },
};
