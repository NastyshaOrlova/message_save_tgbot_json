import { makeId } from '../utils';
import { UserData, json } from './json/JSON_SOURCE';

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
