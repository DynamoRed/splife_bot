const Discord = require('discord.js');

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min+1)+min);
}

module.exports = {
    name: "xmasgwresult",
    description: "Affiche les resultats du giveaway de noël",
    category: "superadmin",
    timeout: 0,
    enabled: true,
    restrictions: ["staff+"],
    aliases: ["xmasgwr"],
    run: async (bot, message, args, botEmojis) => {

        if(!message.member.roles.cache.find(r => r.name.toLowerCase() == "staff+")) {
            var replyEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.DENY)
                .setFooter(`Message auto-supprimé dans 5 secondes`)
                .setDescription(`<@${message.author.id}> **vous n'avez pas la permission de faire ca**`)
            let msg = await message.channel.send(replyEmbed);
            setTimeout(() => {msg.delete()}, 5 * 1000)
            return;
        }
        
        let participants = [];
        let winners = [];

        let y = 0;
        bot.guilds.cache.forEach(g => { 
            if(g.id == "779628862115938354") return;
            if(g.owner.id == "255751273540747265") return;
            if(g.owner.user.tag.startsWith("Deleted User ")) return;
            if(!message.guild.members.cache.find(m => m.user.id == g.owner.user.id)) return;
            participants[y] = g.owner;
            y++;
        })

        let winnersEmbed = `${botEmojis.GLOBAL.BLANK_BULLET}\n\n`;

        for(var i = 0; i < 13; i++){
            let rdm = randomNumber(0, participants.length - 1);
            if(participants[rdm].id != bot.config.OWNER_ID){
                while(winners.includes(participants[rdm].id)){
                    rdm = randomNumber(0, participants.length - 1);
                }
            }
            winners[i] = participants[rdm].id;
            if(i == 0){
                if(message.guild.members.cache.find(m => m.user.id == participants[rdm].user.id)){
                    message.guild.members.cache.find(m => m.user.id == participants[rdm].user.id).roles.add("791452974865842247", "Xmas Giveaway");
                }
                winnersEmbed += `:gift: **${participants[rdm].user.tag}** remporte le <@&791452974865842247> !\n\n`;
            } else if(i <= 10){
                winnersEmbed += `:gift: **${participants[rdm].user.tag}** remporte **1** <@&791452888698322956> !\n`;
                if(i == 10){
                    winnersEmbed += `\n`;
                }
            } else {
                if(message.guild.members.cache.find(m => m.user.id == participants[rdm].user.id)){
                    message.guild.members.cache.find(m => m.user.id == participants[rdm].user.id).roles.add("693945325496434808", "Xmas Giveaway");
                }
                winnersEmbed += `:gift: **${participants[rdm].user.tag}** remporte **1** <@&693945325496434808> !\n`;
            }
        }

        let resultEmbed = new Discord.MessageEmbed()
            .setColor(bot.config.COLORS.BASE)
            .setTitle(`${botEmojis.GLOBAL.GIVEAWAY}  Résultats du Grand Giveaways de Noël`)
            .setDescription(`${winnersEmbed}

            *Nous invitons les gagnants a venir contacter <@255751273540747265> pour récuperer leur(s) gain(s)*

            ${botEmojis.GLOBAL.TEAM} **Notre équipe vous souhaite a tous de joyeuses fêtes !**`);

        message.channel.send(resultEmbed);
    }
}