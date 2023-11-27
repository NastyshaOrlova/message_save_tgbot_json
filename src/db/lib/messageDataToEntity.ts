import { MessageData } from '../json/types';
import { Message } from '../types';

export const messageDataToEntity = (message: MessageData): Message => ({
  id: message.id,
  index: message.index,
  text: message.text,
  timestamp: new Date(message.timestamp),
});
