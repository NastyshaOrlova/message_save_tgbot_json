import { UserData } from '../json/types';
import { User } from '../types';
import { messageEntityToData } from './messageEntityToData';

export const userEntityToData = (user: User): UserData => ({
  id: user.id,
  messages: user.messages.map(messageEntityToData),
});
