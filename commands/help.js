const config = require('../config.json');

module.exports.run = async(client, message, args) => {
    let e1 = new RichEmbed()
        .setTitle(`Help Menu for ${client.user.tag}`)
        .setURL(`https://discord.gg/hy5FSMpYJw`)
        .setDescription(`\`${config.prefix}kick (user) (reason)\` kicks a user within the fivem server\n\`${config.prefix}players\` shows all the online players that are on the server\n\`${config.prefix}refreshresources\` refreshs all the resource in the server\n\`${config.prefix}send (message)\` sends a message to the server (in-game)\n\`${config.prefix}startresource (resource-name)\` starts a resource in the server\n\`${config.prefix}stopresource\` stops a resource in the server\n\`${config.prefix}uptime\` tells you how long the server has been up for\n`)
        .setFooter(`Made by Toasty#0100`)
        .setColor(config.embed.color)
        .setTimestamp()
    message.channel.send(e1)
}

module.exports.help = {
    name: "help"
}