import { db } from "./db/index";
import { ID, json } from "./db/json/index"

console.log(db.getMessangesTextByUserId(5))
db.updateMessange(1696360457941, "A VOT I YA")
console.log(db.getMessangesTextByUserId(5))

// console.log(db.getAllUserIds())

// import 'dotenv/config'; // позволяет работать с .evn

// import TelegramBot from 'node-telegram-bot-api'; // библиотека для работы с тг-ботом

// import { config } from './config';
// import { db } from './db';

// // console.log(db.getUsers());
// // console.log(db.createUser());
// // console.log(db.getUsers());
// console.log(db.createMessage({ text: 'Hello', timestamp: new Date(), userId: 235235423 }));

// // prisma.message.findMany({}).then(console.log).catch(console.error);

// const bot = new TelegramBot(config.BOT_TOKEN, { polling: true });
// // // // создание бота(с нашим токеном и разрешение на получение сообщений)




