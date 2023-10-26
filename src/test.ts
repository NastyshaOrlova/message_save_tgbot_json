import { db } from "./db/index";

const USER_ID = 123;

let tryUser = db.getUserById(USER_ID);

console.log(tryUser)

if (tryUser) {
    db.deleteUserById(USER_ID);
}

let user = db.createUser(USER_ID);

console.log(user) // user with no messages

const message1 = db.creatMessage({ userId: user.id, text: 'Hello', timestamp: new Date()});
console.log(message1)
const message2 = db.creatMessage({ userId: user.id, text: 'World'});
console.log(message2)

user = db.assertUserById(user.id);

console.log(user) // user with 2 messages

const updateMessage1 = db.updateMessage({ id: message1.id, text: 'vooot'});

console.log(updateMessage1);

user = db.assertUserById(user.id);
console.log(user) // user with 2 messages + update message'Hi'

db.deleteMessageById(message1.id);

user = db.assertUserById(user.id);
console.log(user) // user with 1 messages 'World'

