const { BOT_TOKEN, CHES_TG_ID, SHON_TG_ID } = process.env;

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN is not provided!');
}

if (!CHES_TG_ID) {
  throw new Error('CHES_TG_ID is not provided!');
}

if (!SHON_TG_ID) {
  throw new Error('SHON_TG_ID is not provided!');
}

export const config = {
  BOT_TOKEN,
  CHES_TG_ID: +CHES_TG_ID,
  SHON_TG_ID: +SHON_TG_ID,
};
