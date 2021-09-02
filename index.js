require('dotenv').config();
const axios = require('axios');
var express = require('express')
var app = express();
const fetch = require('node-fetch');
const Discord = require('discord.js');
const { message } = require('discordjs-logger');
const bot = new Discord.Client({intents:["GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILDS"]});
const logger = require("discordjs-logger");
const TOKEN = process.env.TOKEN;

// logger.all(bot);

app.set('port', (process.env.PORT || 1337))

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
  var result = 'App is running'
  response.send(result);
}).listen(app.get('port'), function() {
  console.log('App is running, server is listening on port ', app.get('port'));
});

bot.on('ready', () => {
  console.log('Connecteed and ready.');
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('messageCreate', async msg => {
    if (msg.content.includes('kanye')) {
      try{
        const quote = await getQuote();
        msg.reply(quote, { tts: true });
      } catch (err){
        next(err)
      }
      msg.channel.send("Meow! I'm a baby loli kitten!", {
        tts: true
       })
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