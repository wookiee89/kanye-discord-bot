require('dotenv').config();
const axios = require('axios');
const fetch = require('node-fetch');
const Discord = require('discord.js');
const { message } = require('discordjs-logger');
const bot = new Discord.Client({intents:["GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILDS"]});
const logger = require("discordjs-logger");
const TOKEN = process.env.TOKEN;

// logger.all(bot);

bot.on('ready', () => {
  console.log('Connecteed and ready.');
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('messageCreate', async msg => {
    if (msg.content === 'kayne') {
      try{
        const quote = await getQuote();
        msg.reply(quote);
      } catch (err){
        next(err)
      }
    }
  }
  );

const getQuote =  async() => {
  try {
    const response = await axios.get('https://api.kanye.rest/');
    console.log(response.data.quote);
    return JSON.parse(JSON.stringify(response.data.quote))
  } catch (error) {
    console.error(error);
  }
}

bot.login(TOKEN);