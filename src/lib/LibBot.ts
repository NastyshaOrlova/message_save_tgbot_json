import TelegramBot, { Message as TgMessage } from 'node-telegram-bot-api';

export type CmdMessage = {
  id: number;
  type: 'cmd';
  cmd: string;
  text: string;
  fromId: number;
  timestamp: Date;
};

export type TextMessage = {
  id: number;
  type: 'text';
  text: string;
  fromId: number;
  timestamp: Date;
};

export type VoiceMessage = {
  id: number;
  type: 'voice';
  file_id: string;
  fromId: number;
  timestamp: Date;
};

export type UnknownMessage = {
  id: number;
  type: 'unknown';
  fromId: number;
  timestamp: Date;
};

export type Message = CmdMessage | TextMessage | VoiceMessage | UnknownMessage;

export class LibBot {
  private token: string;
  private bot?: TelegramBot;

  private cmdHandlers: { [cmd: string]: (message: CmdMessage) => void } = {};

  private beforeAllHandler?: (message: Message) => boolean;
  private textHandler?: (message: TextMessage) => void;

  private tgMessageToMessage = (tgMessage: TgMessage): Message => {
    if (!tgMessage.from) throw Error('Unexpected error');

    const sharedAttributes = {
      id: tgMessage.message_id,
      fromId: tgMessage.from.id,
      timestamp: new Date(tgMessage.date * 1000),
    };

    if (tgMessage.voice) {
      return {
        ...sharedAttributes,
        type: 'voice',
        file_id: tgMessage.voice.file_id,
      };
    }

    if (tgMessage.text) {
      if (tgMessage.text.startsWith('/')) {
        const [cmd, ...text] = tgMessage.text.split(' ');
        return {
          ...sharedAttributes,
          type: 'cmd',
          cmd,
          text: text.join(' '),
        };
      }

      return {
        ...sharedAttributes,
        type: 'text',
        text: tgMessage.text,
      };
    }

    return {
      ...sharedAttributes,
      type: 'unknown',
    };
  };

  constructor(token: string) {
    this.token = token;
  }

  beforeAll(handler: (message: Message) => boolean) {
    this.beforeAllHandler = handler;
  }

  sendMessage(chatId: number, text: string) {
    if (!this.bot) throw Error('Bot is not initialized');
    this.bot.sendMessage(chatId, text);
  }

  onCmd(cmd: string, handler: (message: CmdMessage) => void) {
    this.cmdHandlers[cmd] = handler;
  }
  onText(textHandler: (message: TextMessage) => void) {
    this.textHandler = textHandler;
  }

  start() {
    this.bot = new TelegramBot(this.token, { polling: true });

    this.bot.on('message', (tgMessage: TgMessage) => {
      const message = this.tgMessageToMessage(tgMessage);

      if (this.beforeAllHandler && !this.beforeAllHandler(message)) return;

      if (message.type === 'cmd' && this.cmdHandlers[message.cmd]) {
        return this.cmdHandlers[message.cmd](message);
      }

      if (message.type === 'text' && this.textHandler) {
        return this.textHandler(message);
      }

      this.sendMessage(message.fromId, 'Unhandled message type');
    });
  }
}
