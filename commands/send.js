const { RichEmbed } = require('discord.js');
module.exports.run = async(client, message, args) => {
    let chan = message.channel.id
    let user = message.author.tag;
    let msg = args.join(` `);
    if (!msg) {
        let e1 = new RichEmbed()
            .setDescription(`Please provide a message to send in game!`)
            .setColor(config.embed.color)
        message.channel.send(e1).then(msg => msg.delete(10000))
    } else {
        let MainMsg = msg;
        emit('HRP:SENDMESSAGE', user, MainMsg, chan);
    }
}

module.exports.help = {
    name: "send"
}