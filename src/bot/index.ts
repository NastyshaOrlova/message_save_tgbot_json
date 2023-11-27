import { LibBot } from '../lib/LibBot';
import { BOT_TOKEN } from '../evn';

export const appBot = new LibBot(BOT_TOKEN);

appBot.beforeAll(message => {
  if (message.type !== 'text') {
    appBot.sendMessage('I can only understand text messages');
    return false;
  }

  const user = getUserById(message.fromId);

  return true;
});

// appBot.onCmd('/start', startHandler);
// appBot.onCmd('/show', showHandler);
// appBot.onCmd('/deleteAll', deleteAllHandler);
// appBot.onCmd('/delete', deleteHandler);

// appBot.onText(textHandler);
