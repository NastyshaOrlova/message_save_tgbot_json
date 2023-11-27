import { MyBot } from './lib/myBot';
import { BOT_TOKEN } from './evn';

import { beforeAllHandler } from './bot/beforeAllHandler';
import { startHandler } from './bot/startHandler';
import { showHandler } from './bot/showHandler';
import { deleteAllHandler } from './bot/deleteAllHandler';
import { deleteHandler } from './bot/deleteHandler';
import { textHandler } from './bot/textHandler';

export const myBot = new MyBot(BOT_TOKEN);

myBot.beforeAll(beforeAllHandler);
myBot.onCmd('/start', startHandler);
myBot.onCmd('/show', showHandler);
myBot.onCmd('/deleteAll', deleteAllHandler);
myBot.onCmd('/delete', deleteHandler);
myBot.onText(textHandler);
