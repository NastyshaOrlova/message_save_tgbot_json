import { MessageData } from '../json/types';
import { Message } from '../types';

export const messageEntityToData = (message: Message): MessageData => ({
  id: message.id,
  index: message.index,
  text: message.text,
  timestamp: message.timestamp.toISOString(),
});
