import TelegramBot, { Message } from 'node-telegram-bot-api';
import { auth } from '../bot/auth';

export class LibBot {
  private bot: TelegramBot;

  constructor(token: string) {
    this.bot = new TelegramBot(token, { polling: { autoStart: true } });
  }
}
