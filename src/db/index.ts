import { makeId } from '../utils';
import { ID, MessageData, UserData, json } from './json/JSON_SOURCE';

type Message = {
  id: ID;
  index: number;
  text: string;
  timestamp: Date;
};

type User = {
  id: ID;
  messages: Message[];
};

export const createUser = (id?: number): UserData => {
  const currentUsers = json.read();

  id = id ?? makeId();

  if (currentUsers.users.some(user => user.id === id)) {
    throw Error('This ID already exists');
  }

  const newUser: UserData = {
    id: id,
    messages: [],
  };

  currentUsers.users.push(newUser);
  json.write(currentUsers);

  return newUser;
};

export const db = {
  createMessage({ userId, text, timestamp }: { userId: ID; text: string; timestamp?: Date }): Message {
    const currentUsers = json.read();
    const user = currentUsers.users.find(user => user.id === userId);

    if (!user) {
      console.log('The user is not in the db');
    }

    const currentIndex = user!.messages.length + 1;

    const newMessage: Message = {
      id: makeId(),
      index: currentIndex,
      text: text,
      timestamp: timestamp || new Date(),
    };

    const newMessageData: MessageData = {
      id: newMessage.id,
      index: newMessage.index,
      text: newMessage.text,
      timestamp: newMessage.timestamp.toISOString(),
    };

    user!.messages.push(newMessageData);
    json.write(currentUsers);
    return newMessage;
  },

  getUserById: (id: ID): User | undefined => {
    const currentUsers = json.read();
    const user = currentUsers.users.find(user => user.id === id);

    if (!user) return undefined;

    const transformUser: User = {
      id: user.id,
      messages: user.messages.map(message => ({
        id: message.id,
        index: message.index,
        text: message.text,
        timestamp: new Date(message.timestamp),
      })),
    };

    return transformUser;
  },

  getAllUsersIds: (): number[] => {
    return json.read().users.map(user => user.id);
  },

  getMessagesById: (id: ID): string[] | undefined => {
    const users = json.read();
    const messages = users.users.find(user => user.id === id)?.messages;
    const formattedMessages = messages?.map(message => `${message.index}. ${message.text}`);
    return formattedMessages;
  },

  checkUserById: (id: ID): boolean => {
    const users = json.read();
    const isUserPresent = users.users.some(user => user.id === id);
    return isUserPresent;
  },

  updateMessage: ({ id, text }: { id: ID; text: string }) => {
    const currentUsers = json.read();
    const currentUser = currentUsers.users.find(user => user.messages.some(message => message.id === id));
    if (!currentUser) throw Error('A user with such a message was not found.');

    const currentMessage = currentUser.messages.find(message => message.id === id);
    if (!currentMessage) throw Error('Message was not found');

    currentMessage.text = text;

    json.write(currentUsers);
    return currentMessage;
  },

  deleteMessageByIndex: ({ id, index }: { id: ID; index: number }): void => {
    const currentUsers = json.read();
    const user = currentUsers.users.find(user => user.id === id);

    if (!user) throw Error('User not found');

    user.messages = user.messages.filter(message => message.index !== index);
    if (user.messages.length > 0) {
      user.messages.forEach((message, idx) => {
        message.index = idx + 1;
      });
    }
    json.write(currentUsers);
  },

  deleteAllMessages: (id: ID): void => {
    const currentUsers = json.read();
    const currentUser = currentUsers.users.find(user => user.id === id);

    if (!currentUser) throw Error('User not found');

    currentUser.messages = [];

    json.write(currentUsers);
  },
};
