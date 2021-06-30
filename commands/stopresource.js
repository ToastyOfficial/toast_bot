const { RichEmbed } = require("discord.js");
const config = require('../config.json');
module.exports.run = async(client, message, args) => {
    let resourcename = args.join(` `);
    if (!resourcename) {
        let e1 = new RichEmbed()
            .setDescription(`Please ensure to provide a resource!`)
            .setColor(config.embed.color)
        message.channel.send(e1).then(msg => msg.delete(25000));
    } else {
        const resourcestate = GetResourceState(resourcename)
        if (resourcestate == 'stopped') {
            let e2 = new RichEmbed()
                .setDescription(`You cannot stop this resource as it's already stoped!`)
                .setColor(config.embed.color)
            message.channel.send(e2)
        } else {
            const resourcetest = StopResource(resourcename)
            if (!resourcetest) {
                let e3 = new RichEmbed()
                    .setDescription(`\`${resourcename}\` was not found within the resource foldar or you cannot stop the resource!`)
                    .setColor(config.embed.color)
                message.channel.send(e3)
            } else {
                let e4 = new RichEmbed()
                    .setDescription(`successfully stoped \`${resourcename}\``)
                    .setColor(config.embed.color)
                message.channel.send(e4)
            }
        }
    }
}


module.exports.help = {
    name: "stopresource"
}