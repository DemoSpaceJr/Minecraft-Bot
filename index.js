const fs = require("fs");
const mineflayer = require("mineflayer");

const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

const bot = mineflayer.createBot({
  host: config.serverIP,
  port: config.serverPort,
  username: config.username
});

// Otomatik register/login
bot.on("messagestr", (message) => {
  console.log(`[Sunucu Mesajı] ${message}`);

  const password = config.password;

  if (message.toLowerCase().includes("register")) {
    bot.chat(`/register ${password} ${password}`);
    console.log("[BOT] Register komutu gönderildi.");
  }

  if (message.toLowerCase().includes("login")) {
    bot.chat(`/login ${password}`);
    console.log("[BOT] Login komutu gönderildi.");
  }
});

// Oturum açıldığında bilgi ver ve zıplamaya başla
bot.on("login", () => {
  console.log(`[✓] ${config.username} sunucuya giriş yaptı: ${config.serverIP}:${config.serverPort}`);
  
  setInterval(() => {
    if (bot.entity && bot.entity.onGround) {
      bot.setControlState("jump", true);
      setTimeout(() => bot.setControlState("jump", false), 200);
    }
  }, 10000); // 10 saniyede bir zıpla
});

// Hata yakala
bot.on("error", (err) => {
  console.log("[!] Bot hatası:", err);
});