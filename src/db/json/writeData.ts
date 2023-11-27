import { writeFileSync } from 'fs';
import { JSON_SOURCE } from './JSON_SOURCE';
import { JsonFile } from './types';

export const writeData = (data: JsonFile): void => {
  writeFileSync(JSON_SOURCE, JSON.stringify(data, null, 2));
};
