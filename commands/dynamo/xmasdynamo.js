const Discord = require('discord.js');
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min+1)+min);
}

module.exports = {
    name: "xmasdynamo",
    description: "XMas Mode on Discord",
    category: "dynamo",
    timeout: 0,
    enabled: true,
    restrictions: [""],
    aliases: ["christmasdynamo", "noeldynamo"],
    run: async (bot, message, args, botEmojis) => {
        if(message.author.id != bot.config.OWNER_ID){
            var replyEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.COLORS.DENY)
                .setFooter(`Message auto-supprimΓ© dans 5 secondes`)
                .setDescription(`<@${message.author.id}> **vous n'avez pas la permission de faire ca**`)
            let msg = await message.channel.send(replyEmbed);
            setTimeout(() => {msg.delete()}, 5 * 1000)
            return;
        }

        message.guild.setBanner("./resources/xmas/splife-banner-xmas.png");

        message.guild.members.cache.forEach(m => {
            if (!m.roles.cache.find(r => r.name === "Staff")) return;
            let xmasEmojis = ["π","π","β","π","π","β", "π"];
            let lastXmasEmojis = ["π","π","βοΈ","π","β"];
            let rdmEmoji = xmasEmojis[randomNumber(0, xmasEmojis.length - 1)];
            if(m.user.id == "403234325715353613") rdmEmoji = "π";
            let name = m.nickname ? m.nickname : m.user.username;
            lastXmasEmojis.forEach(le => {
                name = name.startsWith(le + " ") || name.startsWith("6 ") ? name.slice((le + " ").length) : name;
            });
            m.edit({
                nick: `${rdmEmoji} ${name}`
            }, "XMas Deco");
        });
    }
}