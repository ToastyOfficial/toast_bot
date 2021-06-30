module.exports.run = async(client, message, args) => {
    let channel = message.channel.id;
    emit('HRP:GETPLAYERS', channel)
}
module.exports.help = {
    name: "players"
}