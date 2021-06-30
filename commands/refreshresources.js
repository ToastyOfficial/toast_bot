const { RichEmbed } = require("discord.js");
const config = require('../config.json');
module.exports.run = async(client, message, args) => {
    const num = ExecuteCommand(`refresh`)
    if (num > 0) {
        let e2 = new RichEmbed()
            .setDescription(`successfully refreshed!`)
            .setColor(config.embed.color)
        message.channel.send(e2)
    } else {
        let e3 = new RichEmbed()
            .setDescription(`I was not able to refresh the resources because I do not have proper permission to refresh resources`)
            .setColor(config.embed.color)
        message.channel.send(e3)
    }
}

module.exports.help = {
    name: "refreshresources"
}