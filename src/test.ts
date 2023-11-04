import { db } from './db/index';

// const USER_ID = 123;

// let tryUser = db.getUserById(USER_ID);

// console.log(tryUser);

// if (tryUser) {
//   db.deleteUserById(USER_ID);
// }

// let user = db.createUser(USER_ID);

// console.log(user); // user with no messages

// const message1 = db.createMessage({ userId: user.id, text: 'Hello', timestamp: new Date() });
// console.log(message1);
// const message2 = db.createMessage({ userId: user.id, text: 'World' });
// console.log(message2);

// let updatedUser = db.getUserById(user.id);

// console.log(updatedUser); // user with 2 messages

// const updateMessage1 = db.updateMessage({ id: message1.id, text: 'vot' });

// console.log(updateMessage1);

// updatedUser = db.getUserById(user.id);
// console.log(updatedUser); // user with 2 messages + update message'Hi'

// db.deleteMessageById(message1.id);

// updatedUser = db.getUserById(user.id);
// console.log(updatedUser); // user with 1 messages 'World'

// console.log(db.getAllUsersIds()); // [222, 720410021, 123]

// let user = db.getUserById(123);
// console.log(user);

console.log(db.getMessagesById(123)); // 1. Hello 2. World

// db.deleteMessageByIndex({ id: 123, index: 1 });

// console.log(db.getMessagesById(123)); // 1. World

// console.log(db.getMessagesById(123)); // 1. Hello 2. World

// db.deleteAllMessages(123);

// console.log(db.getMessagesById(123)); // []
