const root = GetResourcePath(GetCurrentResourceName());
const { Client, Collection, RichEmbed } = require('discord.js');
const client = new Client({ disableEveryone: true });
const config = require('./config.json');
const fs = require("fs");
client.commands = new Collection();
fs.readdir(`${root}/commands/`, (err, files) => {
    if (err || err && config.debug) return console.log(`No files were found within the command folder! If you are still having issues. Contact Toasty#0100 on discord`);
    let file = files.filter(f => f.split(".").pop() === "js")
    if (file.length <= 0) {
        if (config.debug) return console.log(`No files were found within the command folder! If you are still having issues. Contact Toasty#0100 on discord`);
    } else {
        file.forEach((files) => {
            let commandfiles = require(`./commands/${files}`);
            client.commands.set(commandfiles.help.name, commandfiles);
        });
        console.log(`^5 - Commands Loaded!^0`)
    }
});
client.once('ready', () => {
    console.log(`^1[${client.user.tag}] Is now online!^0`)
    if (config.server_count.presence_enabled) {
        setInterval(() => {
            let users = GetNumPlayerIndices();
            client.user.setActivity(`${users} players!`, { type: "WATCHING" })
        }, 10000)
    }
    if (config.server_count.server_stats) {
        let channel = client.channels.get(config.server_count.channel_id);
        if (!channel) {
            if (config.debug) return console.log(`^1[DEBUG | ERROR]^0 You have an invalid channel within the config`)
        } else {
            console.log(`started loop!`)
            setInterval(() => {
                let players = GetNumPlayerIndices();
                let name = config.server_count.set_name;
                if (!name) name = 'Players online:'
                channel.setName(`${name} ${players}`)
            }, 150000);
        }
    }
})

client.on('message', async(message) => {
    let prefix = config.prefix;
    if (message.author.bot) return;
    if (message.channel.id !== config.whitelist_channel) return;
    if (message.channel.type === "dm") return;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    if (!message.content.startsWith(prefix)) return;
    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(client, message, args);
});


/* CHAT MESSAGE */
on('HRP:SENTMESSAGE', (user, MainMsg, chan) => {
    let channel = client.channels.get(chan);
    let e2 = new RichEmbed()
        .setDescription(`**Message Sent!**\n\`${user}: ${MainMsg}\``)
        .setColor(config.embed.color)
    channel.send(e2)
})

/* KICKS FUNCTION */
on('HRP:SENDKICK', (userid, reason, notfound, username, chan) => {
    let channel = client.channels.get(chan);
    if (notfound == 'Not Found') {
        let e1 = new RichEmbed()
            .setDescription(`No players were found with the ID ${userid}`)
            .setColor(config.embed.color)
        channel.send(e1)
    } else {
        DropPlayer(`${userid}`, `${reason}`)
        let e2 = new RichEmbed()
            .setDescription(`I have kicked \`Name: ${username} ID: ${userid}\` for \`${reason}\``)
            .setColor(config.embed.color)
        channel.send(e2)
    }
})

/* PLAYERS FUNCTION */
on('HRP:SENDPLAYERS', (playeramount, num, channel) => {
    let chan = client.channels.get(channel);
    let playersonline = GetNumPlayerIndices();
    let e1 = new RichEmbed()
        .setTitle(`There are ${playersonline} players online!`)
        .setDescription(`\n${playeramount}`)
        .setColor(config.embed.color)
    chan.send(e1)
})

/* UPTIME FUNCTION */
let UptimeMinute = 0;
let seconds = 0;
let UptimeHour = 0;
setInterval(() => {
    seconds = seconds + 1;
    if (seconds == 60) {
        UptimeMinute = UptimeMinute + 1
        seconds = 0;
    }
    if (UptimeMinute == 60) {
        UptimeHour = UptimeHour + 1;
        UptimeMinute = 0;
    }
}, 1000);

on("HRP:UPTIMEREQUEST", (channel) => {
    let chan = client.channels.get(channel);
    let e1 = new RichEmbed()
        .setDescription(`The server has been up for \`${UptimeHour} Hours\` \`${UptimeMinute} Minutes\` and \`${seconds} Seconds\``)
        .setColor(config.embed.color)
    chan.send(e1)
})

client.login(config.token).catch(e => {
    if (e && config.debug) {
        console.log(`[^1Debug | Error] You have an invalid token within config.json^0`)
    }
})