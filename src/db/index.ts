import { makeId } from '../utils';
import { AppDataUser, ID, readAppData, writeAppData } from './appData';

type Message = {
  id: ID;
  text: string;
  timestamp: Date;
};

type User = {
  id: ID;
  messages: Message[];
};

const transformUser = (user: AppDataUser): User => ({
  ...user,
  messages: user.messages.map(message => ({
    ...message,
    timestamp: new Date(message.timestamp),
  })),
});

export const db = {
  users: {
    // READ
    getAll: (): User[] => {
      const { users } = readAppData();
      return users.map(transformUser);
    },
    // READ
    getById: (id: ID): User | undefined => {
      const { users } = readAppData();
      const user = users.find(user => user.id === id);
      if (!user) return;
      return transformUser(user);
    },
  },
  messages: {
    create: ({ text, datetime, userId }: { text: string; datetime?: Date; userId: number }) => {
      if (!datetime) datetime = new Date();
      const { users } = readAppData();
      const user = users.find(user => user.id === userId);
      if (!user) throw new Error(`No user found with id ${userId}`);
      user.messages.push({
        id: makeId(),
        text,
        timestamp: datetime.toISOString(),
      });
      writeAppData({ users });
    },
    update: ({ id, text, datetime }: { id: ID; text?: string; datetime?: Date }) => {
      const { users } = readAppData();
      for (const user of users) {
        const message = user.messages.find(message => message.id === id);
        if (!message) continue;
        if (text) message.text = text;
        if (datetime) message.timestamp = datetime.toISOString();
        writeAppData({ users });
        return;
      }
    },
  },
};
