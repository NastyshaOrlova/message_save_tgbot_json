import { LibBot } from '../lib/myBot';
import { BOT_TOKEN } from '../evn';

export const appBot = new LibBot(BOT_TOKEN);

appBot.beforeAll(beforeAllHandler);
appBot.onCmd('/start', startHandler);
appBot.onCmd('/show', showHandler);
appBot.onCmd('/deleteAll', deleteAllHandler);
appBot.onCmd('/delete', deleteHandler);
appBot.onText(textHandler);
