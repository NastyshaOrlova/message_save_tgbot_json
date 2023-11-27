import { UserData } from '../json/types';
import { User } from '../types';
import { messageDataToEntity } from './messageDataToEntity';

export const userDataToEntity = (user: UserData): User => ({
  id: user.id,
  messages: user.messages.map(messageDataToEntity),
});
