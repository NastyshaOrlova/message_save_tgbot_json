import TelegramBot, { Message } from 'node-telegram-bot-api';
import { auth } from '../bot/auth';

export class MyBot {
  private bot: TelegramBot;

  constructor(token: string) {
    this.bot = new TelegramBot(token, { polling: { autoStart: true } });
  }

  beforeAll(handler: Function) {
    this.bot.on('message', async msg => {
      await handler(this.bot, msg);
    });
  }

  private async authMiddleware(msg: Message, handler: Function) {
    const isAuthenticated = await auth(msg.chat.id);
    handler(msg, isAuthenticated);
  }

  public onCmd(command: string, handler: Function): void {
    const regexp = new RegExp(`^${command}`);
    this.bot.onText(regexp, msg => {
      this.authMiddleware(msg, handler);
    });
  }

  public onText(handler: Function) {
    this.bot.on('message', async msg => {
      this.authMiddleware(msg, handler);
    });
  }

  public async sendMessage(chatId: number, text: string): Promise<TelegramBot.Message> {
    return this.bot.sendMessage(chatId, text);
  }
}
