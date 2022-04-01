const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS
    ]
});

Client.on("ready", () => {
    console.log("bot operationnel");
});


const prefix = "!l";

Client.on("messageCreate", message => {
    if (message.author.bot) return;
//Music
    if(message.content.startsWith(prefix + "Play")){
        if(message.member.voice.channel){
            message.member.voice.channel.join().then(connection => {
                let args = message.content.split(" ");

                let dispatcher = connection.play(ytdl(args[1], {quality: "highestaudio"}));

                dispatcher.on("finish", () => {
                    dispatcher.destroy();
                    connection.disconnect();
                });
                dispatcher.on("error", err => {
                    console.log("erreur de dispatcheur : " + err);
                });
            }).catch(err => {
                message.reply("Eurreur lors de la connection : " + err);
            });
        }
        else{
            message.reply("Vous n'êtes pas connecté en vocal");
        }
    }
});



















Client.login("OTUzNjI5NDQ1MTAzNjg1NjYz.YjHWoQ.1XhugAgjfOxbyliBy68FzhpT0pk");