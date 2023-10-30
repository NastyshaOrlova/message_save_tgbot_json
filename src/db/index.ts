import { Transform } from 'stream';
import { makeId } from '../utils';
import { ID, MessageData, UserData, json } from './json/index';
import { time } from 'console';

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
  createUser: (id?: number): UserData => {
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
  },

  createMessage({ userId, text, timestamp }: { userId: ID; text: string; timestamp?: Date }): Message {
    const currentUsers = json.read();
    const user = currentUsers.users.find(user => user.id === userId);

    if (!user) throw Error('The user is not in the db');

    const newMessage: Message = {
      id: makeId(),
      text: text,
      timestamp: timestamp || new Date(),
    };

    const newMessageData: MessageData = {
      id: newMessage.id,
      text: newMessage.text,
      timestamp: newMessage.timestamp.toISOString(),
    };

    user.messages.push(newMessageData);
    json.write(currentUsers);
    return newMessage;
  },

  getUserById: (id: ID) => {
    const currentUsers = json.read();
    const user = currentUsers.users.find(user => user.id === id);

    if (!user) throw Error('Такого ID не существует');

    const transformUser: User = {
      id: user.id,
      messages: user.messages.map(message => ({
        id: message.id,
        text: message.text,
        timestamp: new Date(message.timestamp),
      })),
    };

    return transformUser;
  },

  updateMessage: ({ id, text }: { id: ID; text: string }) => {
    const currentUsers = json.read();
    const currentUser = currentUsers.users.find(user => user.messages.some(message => message.id === id));
    if (!currentUser) throw Error('Пользователь с таким сообщением не найден');

    const currentMessage = currentUser.messages.find(message => message.id === id);
    if (!currentMessage) throw Error('Такое сообщение не найдено');

    currentMessage.text = text;

    json.write(currentUsers);
    return currentMessage;
  },

  deleteUserById: (id: ID): void => {
    const currentUsers = json.read();
    const user = currentUsers.users.find(user => user.id === id);
    if (!user) throw Error('Такого ID не существует');

    currentUsers.users = currentUsers.users.filter(user => user.id !== id);

    json.write(currentUsers);
  },

  deleteMessageById: (id: ID): void => {
    const currentUsers = json.read();

    const currentUser = currentUsers.users.find(user => user.messages.some(message => message.id === id));
    if (!currentUser) throw Error('Такого пользователя нет');

    const initialMessagesLength = currentUser.messages.length;
    currentUser.messages = currentUser.messages.filter(message => message.id !== id);

    if (initialMessagesLength === currentUser.messages.length) throw Error('Такого сообщения нет');

    json.write(currentUsers);
  },
};
