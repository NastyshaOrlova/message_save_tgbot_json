
import { makeId } from "../utils"

type User = { 
  id: number;
  messanges: Messange[]
};

type Messange = {
  id: number;
  text: string;
  timestamp: Date;
};


// export const db = { // методы работы с данными
//   // Create
//   createUser: (): void  => {
//     const currentData = readAppData(); // получение данных
//     let newId: number;
//     do { 
//       newId = makeId();
//     } while (currentData.users.some(user => user.id === newId));

//     const newUser = { // создание нового пользователя
//       id: newId
//     }

//     currentData.users.push(newUser); // добавление его в нашу базу
//     writeAppData(currentData); // сохрание новой базы
//   },

//   // Read
//   getAllUserId: (): number[] => { // получение всех user id
//     const currentData = readAppData(); // получение тек.данных
//     return currentData.users.map(user => user.id) // с помощью map, возвращаем только user.id
//   },

//   // Update
  

//   // Delete
//   deleteById: ({ id }: { id: number }): void => {
//     const currentData = readAppData();
//     const updatedUsers  = currentData.users.filter(user => user.id !== id);
//     currentData.users = updatedUsers;
//     writeAppData(currentData);
//   },

//   deleteAll: (): void => {
//     const currentData = readAppData();
//     currentData.users = [];
//     writeAppData(currentData);
//   }
// };
