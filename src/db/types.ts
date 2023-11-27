import { ID } from './json/types';

export type Message = {
  id: ID;
  index: number;
  text: string;
  timestamp: Date;
};

export type User = {
  id: ID;
  messages: Message[];
};
