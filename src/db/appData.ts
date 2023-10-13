import { readFileSync, writeFileSync } from 'fs';

const SOURCE = __dirname + '/appData.json';

if (!SOURCE) throw new Error('No appData.json found!');

export type ID = number;

export type AppDataUser = {
  id: ID;
  messages: {
    id: ID;
    text: string;
    timestamp: string;
  }[];
};

type AppData = {
  users: AppDataUser[];
};

export const readAppData = (): AppData => {
  const appDataText = readFileSync(SOURCE, 'utf8');
  return JSON.parse(appDataText) as AppData;
};

export const writeAppData = (appData: AppData) => {
  const appDataText = JSON.stringify(appData, null, 2);
  writeFileSync(SOURCE, appDataText, 'utf8');
};
