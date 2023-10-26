
import { Transform } from "stream";
import { makeId } from "../utils"
import { ID, MessageData, UserData, json } from "./json/index"
import { MetadataArgsStorage } from "typeorm/metadata-args/MetadataArgsStorage";
 
type Message = {
  id: ID;
  text: string;
  timestamp: Date;
};

type User = { 
  id: ID;
  messages: Message[]
};

// превращаем статику в динамику
const transformMessage = (messageData: MessageData): Message => {
  return {
    id: messageData.id,
    text: messageData.text,
    timestamp: new Date(messageData.timestamp)
  };
};

const transformUser = (userData: UserData): User => {
  const messageDataMap = json.messages.read();

  const user: User = {
    id: userData.id,
    messages: userData.messages.map(messageId => transformMessage(messageDataMap[messageId]))
  };

  return user;
};

export const db = { // методы работы с данными
  createUser: (id?: number): User => { // создание нового user
    const currentData = json.users.read(); // чтение бд
    id = id ?? makeId(); // создаем нов.id, если он не передан

    if (currentData.some(user => user.id === id)) { // проверка, если id уже такой есть
      throw Error('Такой ID уже существует, введите другой')
    }

    const newUserData: UserData = { id, messages: [] }; // создание нового объекта пользователя

    currentData.push(newUserData); // добавляем его в текущую бд
    json.users.write(currentData); // перезаписываем бд

    const newUser = transformUser(newUserData); // превращаем из статики в динамику

    return newUser;
  },

  creatMessage({ userId, text, timestamp }: { userId: ID, text: string, timestamp?: Date }): Message { // создание сообщения
    const updatedUser = json.users.read().find(user => user.id === userId); // находим user по id
    if(!updatedUser) throw Error('Такого ID не существует'); // проверка, есть ли такой id

    const messageData = json.messages.read(); // получаем messages из бд

    const messageId = makeId(); // генерируем новый id для сообщения

    const newMessageData: MessageData = { // создаем новое сообщение
      id: messageId,
      text: text,
      timestamp: timestamp?.toISOString() ?? new Date().toISOString() // либо конркетное время, либо новое автоматически
    }

    messageData[messageId] = newMessageData; // это и есть новое сообщение(объект)
    json.messages.write(messageData) // перезаписываем бд сообщений

    updatedUser.messages.push(messageId); // добавляем ID нового сообщения в массив сообщений пользователя

    const users = json.users.read(); // получаем бд users
    const updatedUsers = users.map(storedUser => storedUser.id === updatedUser.id ? updatedUser : storedUser); // обновленые все пользователи 
    json.users.write(updatedUsers); // перезапись бд users

    return transformMessage(newMessageData); // возвращение из статике в динамику
  },

  getUserById: (id: ID): User | null => { // получение user по ID
    const users = json.users.read(); // чтение бд
    const user = users.find(user => user.id === id); // находим конкретного user
    if (!user) return null; // проверка, есть ли такой user в бд

    return transformUser(user); // превращаем в динамику
  },

  assertUserById: (id: ID): User => { 
    const user = db.getUserById(id);
    if (!user) throw Error('Такого ID не существует');
    return user;
  },

  updateMessage: ({id, text}: {id: ID, text: string}): Message => {
    const messagesData = json.messages.read(); // получаем все сообщения 

    const storedMessage = messagesData[id]; // находим тот id сообщения, у которого будем text менять
    if (!storedMessage) throw Error ('Сообщение с таким ID не найдено');

    storedMessage.text = text; // перезаписываем text

    messagesData[id] = storedMessage; // сохраняем уже обновленый вариант в старый 
    json.messages.write(messagesData); // записываюм в бд

    return transformMessage(storedMessage); // возвращаем статику 
  },

  deleteUserById: (id: ID): void => {
    const users = json.users.read(); // получаем бд users
    const messages = json.messages.read(); // получаем бд messages

    const userIndex = users.findIndex(user => user.id === id); // ищем индекс пользователя с заданным ID

    if (userIndex === -1) { // проверка, если id не найдет
      throw Error('Пользователь с таким ID не найден');
    }
    
    const userMessagesIds = users[userIndex].messages; // получаем массив ID сообщений этого пользователя

    users.splice(userIndex, 1) // удаляем пользователя из списка

    userMessagesIds.forEach(messageId => { // удаляем все сообщения этого пользователя
      delete messages[messageId];
    })

    json.users.write(users); // обновляем инфо о users и messages в базе данных
    json.messages.write(messages);
  }, 
  
  deleteMessageById: (id: ID): void => {
    const messages = json.messages.read();
    const users = json.users.read(); 

    const messageToDelete = messages[id] // сообщение, которое удалиться
    if (!messageToDelete) throw Error('Сообщение с таким ID не найдено');

    delete messages[id]; // удаление  
    json.messages.write(messages);

    users.forEach(user => {
      const messageIndex = user.messages.indexOf(id); // находим index сообщения
      if (messageIndex !== -1) {
          user.messages.splice(messageIndex, 1); // удаление id сообщения из массива
      }
    });

    json.users.write(users);

   }
};


