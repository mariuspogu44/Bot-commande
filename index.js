const Discord = require("discord.js");
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
const Canvas = require("canvas"); 


const prefix = "!l";

Client.on('guildMemberAdd', async member => {
    console.log("Un joueurs vien darriver");
    Client.channels.cache.get("88016073s8679869483").send("**Dite Bonjour a** <@" + member.id + "> **il vien d'arriver a Lille RP**");

    var canvas = Canvas.createCanvas(1100, 500);

    ctx = canvas.getContext("2d");

    var background = await Canvas.loadImage("./background.png");
    ctx.drawImage(background, 0, 0, 1100, 500);

    ctx.font = "42px MADE Future X";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "Center";
    ctx.fillText(member.user.tag.toUpperCase(), 320, 410);

    ctx.beginPath();
    ctx.arc(528, 185, 80, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    var avatar = await Canvas.loadImage(member.user.displayAvatarURL({
        format: "png",
        size: 1024
    }));

    ctx.drawImage(avatar, 435, 80, 210, 210);

    var attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png");

    Client.channels.cache.get("880160738679869483").send({files: [attachment]});
});

Client.on("guildMemberRemove", member => {
    console.log("Un joueurs vien de quitter");
    Client.channels.cache.get("880161258215714816").send(member.displayName + "Vien de quitter le serveur ");
});

Client.on("messageCreate", message => {
    if (message.author.bot) return;
    //!lHelp
    if (message.content === prefix + "Help"){
        const embed = new Discord.MessageEmbed()
        .setColor("#38C0FF")
        .setTitle("COMMANDES DU BOT")
        .setAuthor("mariuspogu44", "https://cdn.discordapp.com/attachments/880163759681855528/957412578894696468/logo.png")
        .setDescription("`Prefix : !l`\n\n`Help : commandes du bot`\n\n`LilleRP : pour avoir des info sur le serveur`\n\n`Clear (number) : pour suprimer des message (que pour les staff)`\n\n`Play (lien de la musique YTB): pour metre de la musique en vocal`\n\n`RP : pour lancer une session RP (que pour les staff)`")
        .setThumbnail("https://cdn.discordapp.com/attachments/880163759681855528/958696462114521088/logo.png")
        .setTimestamp()
        .setFooter("Ce bot appartient a sont createur", "https://cdn.discordapp.com/attachments/880163759681855528/956230731225509908/logolilli.png");
        

        message.channel.send({ embeds: [embed]});
    }
    
    //!lLilleRP
    if (message.content === prefix + "LilleRP"){
        const embed = new Discord.MessageEmbed()
        .setColor("#38C0FF")
        .setTitle("LILLE RP")
        .setAuthor("mariuspogu44", "https://cdn.discordapp.com/attachments/880163759681855528/957412578894696468/logo.png")
        .addField("__Lien de la chaine YTB__", "*https://www.youtube.com/channel/UClIiWSWxqKSSeRDzTfrrPtA*")
        .addField("__Lien du site web du serveur__", "*https://pogumarius.wixsite.com/lille-rp-fr*")
        .addField("__voici le lien de jeux roblox__", "*https://www.roblox.com/games/4825232399/LILLE-RP-FR*")
        .addField("__Description du serveur__", "**Ce serveur est toujours en train d'être développé pour une V.4**\n**le créateur est mariuspogu44#6433**")
        .setThumbnail("https://cdn.discordapp.com/attachments/880163759681855528/958696462114521088/logo.png")
        .setDescription("cette commande serre a savoir les infos sur le serveur")
        .setTimestamp()
        .setFooter("Ce bot appartient a sont createur", "https://cdn.discordapp.com/attachments/880163759681855528/956230731225509908/logolilli.png");
        

        message.channel.send({ embeds: [embed]});
    }
 //!lClear
 if (message.member.permissions.has("ADMINISTRATOR")){
    if (message.content.startsWith(prefix + "Clear")){
        let args = message.content.split(" ");
        
        let number = parseInt(args[1]);
        if(number >= 1 && number <= 100 ){
            message.channel.bulkDelete(number);
            message.reply({content: number + " message correctement supprimé(s)", ephemeral: true}).then(message => setTimeout(() => message.delete(), 10000))
        }
        else{
            message.reply({content: "!!!Erreur!!! le nombre de message doit être comprit entre 1 et 100 !!!", ephemeral: true}).then(message => setTimeout(() => message.delete(), 10000));
        }
    }
}

});

Client.login(process.env.TOKEN);