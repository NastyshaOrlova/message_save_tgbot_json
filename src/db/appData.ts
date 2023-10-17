import { readFileSync, writeFileSync } from 'fs'; 

const SOURCE = __dirname + '/.json';
if (!SOURCE) throw new Error('No appData.json found!'); // проверят путь к appData.json

type AppDataUser = { // показываем ожидаемую структуру для чтение/записи в .json
  id: number;
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

export const app = 1;