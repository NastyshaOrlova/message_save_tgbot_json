// Модуль предназначен для чтения и записи данных

import { existsSync, readFileSync, writeFileSync } from 'fs';

type ID = number;

type MessageData = { // Структура сообщений 
  id: ID;
  text: string;
  timestamp: string;
};

type UserData = { // Структура данных пользователя
  id: ID;
  messages: ID[];
};

type MessagesFile = Record<ID, MessageData>; // Тип для хранения всех сообщений
type UsersFile = UserData[]; //  Тип для хранения всех пользователей.

// Определение путей к файлам:
const MESSAGES_JSON = __dirname + '/messages.json'; // Пути файла
if (!existsSync(MESSAGES_JSON)) throw new Error('MESSAGES_JSON is not provided!'); // Проверка

const USERS_JSON = __dirname + '/users.json';
if (!existsSync(USERS_JSON)) throw new Error('USERS_JSON is not provided!');

// Основной функционал
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