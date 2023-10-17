import { readAppData, writeAppData } from "./appData";

type User = { // определение структуры данных
  id: number;
};


export const db = { // методы работы с данными
  // Create
  createUser: (): void  => {
    const currentData = readAppData(); // получение данных
    const maxId = Math.max(...currentData.users.map(user => user.id), 0); // определение id
    const newId = maxId + 1;

    const newUser = { // создание нового пользователя
      id: newId
    }

    currentData.users.push(newUser); // добавление его в нашу базу
    writeAppData(currentData); // сохрание новой базы
  },

  createUserById(id: number): void {
    const currentData = readAppData();
    const existingUser = currentData.users.find(user => user.id === id);
    console.log(existingUser)
    if (existingUser) {
      console.log('Введите другой id');
      return
    }
    const newUser = {
      id: id
    }
    currentData.users.push(newUser);
    writeAppData(currentData);
  },

  // Read
  getAllUserId: (): number[] => { // получение всех user id
    const currentData = readAppData(); // получение тек.данных
    return currentData.users.map(user => user.id) // с помощью map, возвращаем только user.id
  },

  // Update
  updateUserById: ({currentId, newId}: {currentId: number, newId: number}): void => {
    const currentData = readAppData();

    const hasCurrentId = currentData.users.some(user => user.id === currentId);
    if (!hasCurrentId) { // проверяем наличие currentId
      console.log('currentId не существует');
      return;
    }

    const hasNewId = currentData.users.some(user => user.id === newId);
    if(hasNewId) { // проверяем наличие newId
      console.log('newId уже есть в базе');
      return;
    }

    const currentUser = currentData.users.find(user => user.id === currentId);
    if (currentUser) { // проверка что currentUser - не undefind
      currentUser.id = newId;
    }
    writeAppData(currentData);
  },

  // Delete
  deleteById: ({ id }: { id: number }): void => {
    const currentData = readAppData();
    const updatedUsers  = currentData.users.filter(user => user.id !== id);
    currentData.users = updatedUsers;
    writeAppData(currentData);
  },

  delete: (): void => {
    const currentData = readAppData();
    currentData.users = [];
    writeAppData(currentData);
  }
};
