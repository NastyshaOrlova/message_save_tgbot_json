
import { makeId } from "../utils"
import { ID, json } from "./json/index"
 
type User = { 
  id: ID;
  messanges: Messange[]
};

type Messange = {
  id: ID;
  text: string;
  timestamp: Date;
};


export const db = { // методы работы с данными
  // Create
  createUser: (id?: number): void => {
    const currentData = json.users.read();
    if (!id) {
      id = makeId();
    }
    if (currentData.some(user => user.id === id)) {
      console.log("Такой ID уже существует, введите другой")
      return
    }

    const newUser = {
      id: id,
      messages: []
    };

    currentData.push(newUser);
    json.users.write(currentData);
  },

  creatMessangeByUserId({ id, text }: { id: ID, text: string } ): void {
    const users = json.users.read(); 
    const messages = json.messages.read();
    if (!users.some(user => user.id === id)) {
      console.log('Такого ID не существует')
      return
    }

    const messageId = makeId();
    const newMessange = {
      id: messageId,
      text: text,
      timestamp: new Date().toISOString()
    }

    messages[messageId] = newMessange; 
    json.messages.write(messages);

    const user = users.find(user => user.id === id);
    user!.messages.push(messageId);
    json.users.write(users);
  },

  // Read
  getAllUserIds: (): ID[] => {
    const currentData = json.users.read();
    return currentData.map(user => user.id)
  },

  getMessangesTextByUserId: (id: ID): string[]  => {
    const users = json.users.read(); 
    const messages = json.messages.read();

    const user = users.find(user => user.id === id);

    if (!users) {
      console.log('Такого ID не существует')
      return [];
    }

    return user!.messages.map(messageId => messages[messageId].text);
  },

  getMessangesIdsByUserId: (id: ID): number[]  => {
    const users = json.users.read(); 
    const messages = json.messages.read();

    const user = users.find(user => user.id === id);

    if (!users) {
      console.log('Такого ID не существует')
      return [];
    }

    return user!.messages.map(messageId => messages[messageId].id);
  },
  
  getMessangesTextAll: (): string[] => {
    const messages = json.messages.read();
    return Object.values(messages).map(message => message.text); 
  },

  // Update
  updateMessange: (messageId: ID, newText: string): void => {
    const messages = json.messages.read();

    const message = messages[messageId];

    if (!message) {
      console.log('Сообщение с таким ID не найдено.');
      return;
    }

    message.text = newText;

    json.messages.write(messages);
  },

  // Delete
  deleteUserById: (id: ID): void => {
    const users = json.users.read(); 
    const messages = json.messages.read();

    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
      console.log('Пользователь с таким ID не найден');
      return;
    }
    
    const userMessagesIds = users[userIndex].messages;

    users.splice(userIndex, 1)

    userMessagesIds.forEach(messageId => {
      delete messages[messageId];
    })

    json.users.write(users);
    json.messages.write(messages);
  }, 

  deleteMesangesAllById: (id: ID): void => {
    const users = json.users.read(); 
    const messages = json.messages.read();

    const user = users.find(user => user.id === id);

    if (!users) {
      console.log('Такого ID не существует')
      return;
    }

    const userMessagesIds = user?.messages;
    userMessagesIds?.forEach(messageId => {
      delete messages[messageId]
    })

    json.users.write(users);
    json.messages.write(messages);
  },

  deleteMessange: (messageId: ID): void => {
    const users = json.users.read(); 
    const messages = json.messages.read();

    if (!messages[messageId]) {
      console.log('Сообщение с таким ID не найдено.');
      return;
    }

    delete messages[messageId];

    users.forEach(user => {
      const messageIndex = user.messages.indexOf(messageId);
      if (messageIndex !== -1) {
        user.messages.splice(messageIndex, 1);
      }
    })

    json.messages.write(messages);
    json.users.write(users);
  }
};
