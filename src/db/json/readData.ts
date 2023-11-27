import { existsSync, readFileSync, writeFileSync } from 'fs';
import { JSON_SOURCE } from './JSON_SOURCE';
import { JsonFile } from './types';

export const readData = (): JsonFile => {
  if (!existsSync(JSON_SOURCE)) writeFileSync(JSON_SOURCE, JSON.stringify({ users: [] }, null, 2));
  const data = readFileSync(JSON_SOURCE, 'utf-8');
  return JSON.parse(data);
};
