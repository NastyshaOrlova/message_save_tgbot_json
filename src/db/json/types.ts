export type ID = number;

export type MessageData = {
  id: ID;
  index: number;
  text: string;
  timestamp: string;
};

export type UserData = {
  id: ID;
  messages: MessageData[];
};

export type JsonFile = {
  users: UserData[];
};
