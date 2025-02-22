const config = require('../config')
const os = require('os')
const buttons = require('../nonbutton')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
    pattern: "alive",
    react: "👋",
    alias: ["online", "test", "bot"],
    desc: "එය බොට් ඔන්ලයින්ද පරීක්ශා කරයි",
    category: "main",
    use: '.alive',
    filename: __filename
},
async (conn, mek, m, { from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let hostname;
        if (os.hostname().length === 12) {
            hostname = 'replit';
        } else if (os.hostname().length === 36) {
            hostname = 'heroku';
        } else if (os.hostname().length === 8) {
            hostname = 'koyeb';
        } else {
            hostname = os.hostname();
        }

        const monspace = '```';

        const buttons = [
            { buttonId: `${prefix}menu`, buttonText: { displayText: 'COMMANDS MENU' }, type: 1 },
            { buttonId: `${prefix}ping`, buttonText: { displayText: "BOT'S SPEED" }, type: 1 }
        ];

        let buttonMessage;
        if (config.ALIVE === "default") {
            buttonMessage = {
                image: { url: config.LOGO },
                caption: `${monspace}👋 Hello ${pushname} I'm alive now${monspace}

*_DMX-MD WHTSAPP BOT..._*
    
> 🚀 *Version:* ${require("../package.json").version}
> 📟 *Memory:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
> ⌛ *Runtime:* ${runtime(process.uptime())}
> 🧬 *Platform:* ${hostname}
    
*This is made to be simple and easy for you to deploy. All the things here are made by kavishanOFC & ruwa'h*

> follow us: *https://whatsapp.com/channel/0029Vb05h8uK5cDEg7BNtR1i*`,
                footer: config.FOOTER,
                buttons: buttons,
                headerType: 4
            };
        } else {
            buttonMessage = {
                image: { url: config.LOGO },
                caption: config.ALIVE,
                footer: config.FOOTER,
                buttons: buttons,
                headerType: 4
            };
        }        
        await conn.sendMessage(from, { audio: { url: `https://github.com/DARKMATTER-X-TM/DATABASE/blob/main/alive.mp3?raw=true` }, ptt: true, mimetype: 'audio/mpeg' }, { quoted: mek });

        await conn.buttonMessage2(from, buttonMessage);
    } catch (e) {
        reply('*Error !!*');
        l(e);
    }
});

            
cmd({
    pattern: "ping",
    react: "📌",
    alias: ["speed"],
    desc: "එය බොට්ගේ ping එක පෙන්වයි",
    category: "main",
    use: '.ping',
    filename: __filename
},
async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const initial = new Date().getTime();
        const ping = await conn.sendMessage(from, { text: '`Pinging To kavishan.js!!!`' }, { quoted: mek });
        const final = new Date().getTime();
        await conn.edite(ping, '*Pong*\n *' + (final - initial) + ' ms*');
    } catch (e) {
        reply('*Error !!*');
        l(e);
    }
});

cmd({
    pattern: "menu",
    react: "📂",
    alias: ["panel", "list", "commands"],
    desc: "එය බොට්ගේ command list එක පෙන්වයි.",
    category: "main",
    use: '.menu',
    filename: __filename
},
async (conn, mek, m, { from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let hostname;
        if (os.hostname().length === 12) {
            hostname = 'replit';
        } else if (os.hostname().length === 36) {
            hostname = 'heroku';
        } else if (os.hostname().length === 8) {
            hostname = 'koyeb';
        } else {
            hostname = os.hostname();
        }

        const monspace = '```';

        const buttons = [
            { buttonId: `${prefix}downmenu`, buttonText: { displayText: 'DOWNLOAD MENU' }, type: 1 },
            { buttonId: `${prefix}searchmenu`, buttonText: { displayText: 'SEARCH MENU' }, type: 1 },
            { buttonId: `${prefix}convertmenu`, buttonText: { displayText: 'CONVERT MENU' }, type: 1 },
            { buttonId: `${prefix}mainmenu`, buttonText: { displayText: 'MAIN MENU' }, type: 1 },
            { buttonId: `${prefix}othermenu`, buttonText: { displayText: 'OTHER MENU' }, type: 1 },
            { buttonId: `${prefix}ownermenu`, buttonText: { displayText: 'OWNER MENU' }, type: 1 },
            { buttonId: `${prefix}animemenu`, buttonText: { displayText: 'ANIME MENU' }, type: 1 },
            { buttonId: `${prefix}groupmenu`, buttonText: { displayText: 'GROUP MENU' }, type: 1 },
            { buttonId: `${prefix}moviemenu`, buttonText: { displayText: 'MOVIE MENU' }, type: 1 },
            { buttonId: `${prefix}bugmenu`, buttonText: { displayText: 'BUG MENU' }, type: 1 }
        ];
    

        const buttonMessage = {
            image: { url: config.LOGO },
            caption: `${monspace}👋 Hello ${pushname}${monspace}

*_DMX-MD COMMANDS LIST..._*
  
> 🚀 *Version:* ${require("../package.json").version}
> 📟 *Memory:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
> ⌛ *Runtime:* ${runtime(process.uptime())}
> 🧬 *Platform:* ${hostname}`,
            footer: config.FOOTER,
            buttons: buttons,
            headerType: 4
        };
        await conn.sendMessage(from, { audio: { url: `https://github.com/DARKMATTER-X-TM/DATABASE/blob/main/menu.mp3?raw=true` }, ptt: true, mimetype: 'audio/mpeg' }, { quoted: mek });
        await conn.buttonMessage2(from, buttonMessage, mek);
    } catch (e) {
        reply('*Error !!*');
        l(e);
    }
});


cmd({
    pattern: "script",
    alias: ["sc","repo"],
    react: '📊',
    desc: "එය bot link එක ලබා දෙයි.",
    category: "main",
    use: '.script',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const result = `👨‍💻 *DMX-MD REPOSTORY* 👨‍💻\n\n*This is made to be simple and easy for you to deploy. All the things here are made by kavishanOFC &ruwa'h 🎉*\n\n*GITHUB:* https://github.com/DARKMATTER-X-TM/DMX-MD\n\n*CREDS JSON:* https://interim-wilone-kavishanofc-10b50e01.koyeb.app/\n\n*SUPORT GROUP* :https://chat.whatsapp.com/DPZOsVCvsljJiVagfilmFN`
await conn.sendMessage(from, { 
            image: { url: `https://i.ibb.co/QHPG3d8/temp-image.jpg`},  // Image URL
            caption: result,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363376339574797@newsletter',
                    newsletterName: 'ＤＭＸ ＣＨＡＮＮＥＬ',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in sc command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});


cmd({
    pattern: "system",
    alias: ["status", "runtime", "uptime"],
    desc: "Check uptime and system status",
    category: "main",
    react: "📟",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let hostname;
        if (os.hostname().length === 12) {
            hostname = 'replit';
        } else if (os.hostname().length === 36) {
            hostname = 'heroku';
        } else if (os.hostname().length === 8) {
            hostname = 'koyeb';
        } else {
            hostname = os.hostname();
        }
        // Generate system status message
        const status = `
> *Uptime:-* ${runtime(process.uptime())} 
> *Ram usage:-* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
> *Platform:-* ${hostname}
> *Owners:-* kavishanOFC & Ruwa'h
> *Version:-* ${require("../package.json").version}`;

        // Send the status message with an image
        await conn.sendMessage(from, { 
            image: { url: `https://i.ibb.co/QHPG3d8/temp-image.jpg` },  // Image URL
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363376339574797@newsletter',
                    newsletterName: 'ＤＭＸ ＣＨＡＮＮＥＬ',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in system command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
cmd({
    pattern: "restart",
    react: "🔄",
    desc: "එය බොට්ව නැවත ආරම්බ කරයි.",
    category: "owner",
    use: '.restart',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!isOwner) return
const {exec} = require("child_process")
reply("*`restarting bot`*")
await sleep(1500)
exec("pm2 restart all")
}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "downmenu",
    react: "⬇️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `

   *DOWNLOAD COMMANDS MENU*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'download'){
  if(!commands[i].dontAddCommandList){
menuc += `*📍➣Command :* ${commands[i].pattern}
*💭➣Desc :* ${commands[i].desc}
*👨‍💻➣Use :* ${commands[i].use}\n\n`
}}};

let generatebutton = [{
    buttonId: `${prefix}sc`,
    buttonText: {
        displayText: 'GET BOT\'S SCRIPT'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
  let buttonMessaged = {
    image: { url: config.LOGO },
    caption: menuc,
    footer: config.FOOTER,
    headerType: 4,
    buttons: generatebutton
  };
  return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})

cmd({
    pattern: "searchmenu",
    react: "🕵🏻",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `

   *SEARCH COMMANDS MENU*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'search'){
  if(!commands[i].dontAddCommandList){
menuc += `*📍➣Command :* ${commands[i].pattern}
*💭➣Desc :* ${commands[i].desc}
*👨‍💻➣Use:* ${commands[i].use}\n\n`
}}};
let generatebutton = [{
    buttonId: `${prefix}sc`,
    buttonText: {
        displayText: 'GET BOT\'S SCRIPT'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
  let buttonMessaged = {
    image: { url: config.LOGO },
    caption: menuc,
    footer: config.FOOTER,
    headerType: 4,
    buttons: generatebutton
  };
  return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})

cmd({
    pattern: "convertmenu",
    react: "🔄",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `

   *CONVERT COMMANDS MENU*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'convert'){
  if(!commands[i].dontAddCommandList){
menuc += `*📍➣Command :* ${commands[i].pattern}
*💭➣Desc :* ${commands[i].desc}
*👨‍💻➣Use:* ${commands[i].use}\n\n`
}}};
let generatebutton = [{
    buttonId: `${prefix}sc`,
    buttonText: {
        displayText: 'GET BOT\'S SCRIPT'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
  let buttonMessaged = {
    image: { url: config.LOGO },
    caption: menuc,
    footer: config.FOOTER,
    headerType: 4,
    buttons: generatebutton
  };
  return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})
cmd({
    pattern: "bugmenu",
    react: "🤬",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `

   *BUG COMMANDS MENU*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'bugs'){
  if(!commands[i].dontAddCommandList){
menuc += `*📍➣Command :* ${commands[i].pattern}
*💭➣Desc :* ${commands[i].desc}
*👨‍💻➣Use:* ${commands[i].use}\n\n`
}}};
let generatebutton = [{
    buttonId: `${prefix}sc`,
    buttonText: {
        displayText: 'GET BOT\'S SCRIPT'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
  let buttonMessaged = {
    image: { url: config.LOGO },
    caption: menuc,
    footer: config.FOOTER,
    headerType: 4,
    buttons: generatebutton
  };
  return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})


cmd({
    pattern: "othermenu",
    react: "💁‍♂️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `

 *OTHER COMMANDS MENU*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'other'){
if(!commands[i].dontAddCommandList){
menuc += `*📍➣Command :* ${commands[i].pattern}
*💭➣Desc :* ${commands[i].desc}
*👨‍💻➣Use:* ${commands[i].use}\n\n`
}}};
let generatebutton = [{
    buttonId: `${prefix}sc`,
    buttonText: {
        displayText: 'GET BOT\'S SCRIPT'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
  let buttonMessaged = {
    image: { url: config.LOGO },
    caption: menuc,
    footer: config.FOOTER,
    headerType: 4,
    buttons: generatebutton
  };
  return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})

cmd({
  pattern: "ownermenu",
  react: "💼",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `

   *OWNER COMMANDS MENU*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'owner'){
if(!commands[i].dontAddCommandList){
menuc += `*📍➣Command :* ${commands[i].pattern}
*💭➣Desc :* ${commands[i].desc}
*👨‍💻Use:* ${commands[i].use}\n\n`
}}};
let generatebutton = [{
    buttonId: `${prefix}sc`,
    buttonText: {
        displayText: 'GET BOT\'S SCRIPT'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
let buttonMessaged = {
  image: { url: config.LOGO },
  caption: menuc,
  footer: config.FOOTER,
  headerType: 4,
  buttons: generatebutton
};
return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
reply('*ERROR !!*')
l(e)
}
})

cmd({
  pattern: "animemenu",
  react: "🧩",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `

   *ANIME COMMANDS MENU*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'anime'){
if(!commands[i].dontAddCommandList){
menuc += `*📍➣Command :* ${commands[i].pattern}
*💭➣Desc :* ${commands[i].desc}
*👨‍💻Use:* ${commands[i].use}\n\n`
}}};
let generatebutton = [{
    buttonId: `${prefix}sc`,
    buttonText: {
        displayText: 'GET BOT\'S SCRIPT'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
let buttonMessaged = {
  image: { url: config.LOGO },
  caption: menuc,
  footer: config.FOOTER,
  headerType: 4,
  buttons: generatebutton
};
return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
reply('*ERROR !!*')
l(e)
}
})

cmd({
    pattern: "groupmenu",
    react: "👥",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `

   *GROUP COMMANDS MENU*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'group'){
  if(!commands[i].dontAddCommandList){
menuc += `*📍➣Command :* ${commands[i].pattern}
*💭➣Desc :* ${commands[i].desc}
*👨‍💻➣Use:* ${commands[i].use}\n\n`
}}};
let generatebutton = [{
    buttonId: `${prefix}sc`,
    buttonText: {
        displayText: 'GET BOT\'S SCRIPT'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
  let buttonMessaged = {
    image: { url: config.LOGO },
    caption: menuc,
    footer: config.FOOTER,
    headerType: 4,
    buttons: generatebutton
  };
  return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})

cmd({
  pattern: "mainmenu",
  react: "🌅",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `

   *MAIN COMMANDS MENU*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'main'){
if(!commands[i].dontAddCommandList){
menuc += `*📍➣Command :* ${commands[i].pattern}
*💭➣Desc :* ${commands[i].desc}
*👨‍💻Use:* ${commands[i].use}\n\n`
}}};
let generatebutton = [{
    buttonId: `${prefix}sc`,
    buttonText: {
        displayText: 'GET BOT\'S SCRIPT'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
let buttonMessaged = {
  image: { url: config.LOGO },
  caption: menuc,
  footer: config.FOOTER,
  headerType: 4,
  buttons: generatebutton
};
return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
reply('*ERROR !!*')
l(e)
}
})

cmd({
  pattern: "moviemenu",
  react: "〽️",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `

   *MOVIE COMMANDS MENU*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'movie'){
if(!commands[i].dontAddCommandList){
menuc += `*📍➣Command :* ${commands[i].pattern}
*💭➣Desc :* ${commands[i].desc}
*👨‍💻Use:* ${commands[i].use}\n\n`
}}};
let generatebutton = [{
    buttonId: `${prefix}sc`,
    buttonText: {
        displayText: 'GET BOT\'S SCRIPT'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
let buttonMessaged = {
  image: { url: config.LOGO },
  caption: menuc,
  footer: config.FOOTER,
  headerType: 4,
  buttons: generatebutton
};
return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
reply('*ERROR !!*')
l(e)
}
})

