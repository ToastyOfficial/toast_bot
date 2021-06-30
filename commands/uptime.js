module.exports.run = async(client, message, args) => {
    let channel = message.channel.id;
    emit("HRP:UPTIMEREQUEST", channel)
}
module.exports.help = {
    name: "uptime"
}