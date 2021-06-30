const { RichEmbed } = require("discord.js");
const config = require('../config.json');
module.exports.run = async(client, message, args) => {
    let userid = args[0];
    let chan = message.channel.id;
    if (!userid) {
        let e1 = new RichEmbed()
            .setDescription(`Please ensure to input an ID`)
            .setColor(config.embed.color)
        message.channel.send(e1)
    } else {
        if (isNaN(userid)) {
            let e2 = new RichEmbed()
                .setDescription(`The Id must be a number`)
                .setColor(config.embed.color)
            message.channel.send(e2)
        } else {
            let reason = args.slice(1).join(` `);
            if (!reason) reason = 'No reason provided'
            emit('HRP:KICKREQUEST', userid, reason, chan)
        }
    }
}

module.exports.help = {
    name: "kick"
}