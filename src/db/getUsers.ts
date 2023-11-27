import { readData } from './json/readData';
import { userDataToEntity } from './lib/userDataToEntity';
import { User } from './types';

export const getUsers = (): User[] => readData().users.map(userDataToEntity);
