import { config } from "../config";
const Telegram = require("telegraf/telegram");
import { telegraph } from "../utils/telegraph";
import { md } from "../utils/markdown";
let sendto = config.TG_SENDID;
export async function reply(feed, item) {
  const telegram = new Telegram(config.TG_TOKEN);
  await telegram.sendMessage(
    sendto,
    `*${md(feed.title)}*\n${md(item.title)}\n${
      feed.telegraph
        ? item.content
          ? `[telegraph](${await telegraph(item)})`
          : ""
        : ""
    }  ${item.link ? `[查看原文](${item.link})` : ""}`,
    { parse_mode: "MARKDOWN" }
  );
}
export async function replyWhenError(feed) {
  const telegram = new Telegram(config.TG_TOKEN);
  await telegram.sendMessage(
    sendto,
    `*${md(feed.title)}*\n 连续多次失败，将暂停更新，请检查订阅源是否正常。`,
    { parse_mode: "MARKDOWN" }
  );
}
