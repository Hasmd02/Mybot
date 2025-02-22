const config = require('../config');
const { cmd, commands } = require('../command');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions');
var { updateCMDStore, isbtnID, getCMDStore, getCmdForCmdId, connectdb, input, get, updb, updfb } = require("../lib/database");

cmd({
    pattern: "group",
    alias: ["gsetting", "gs"],
    desc: "එය groups settings features යාවත්කාලීන කරයි.",
    category: "owner",
    use: '.group',
    filename: __filename
}, async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return await reply('*මෙය group එකක් නොවේ !*');
        if (!isAdmins) return await reply('*ඔබ admin නොවේ !*');
        if (!isBotAdmins) return await reply('*මම admin නොවේ !*');
        
        const sections1 = [{
                title: "ANTI LINK",
                rows: [{
                        title: 'ON ♻️',
                        rowId: '.antilink on'
                    },
                    {
                        title: 'OFF ⛔',
                        rowId: '.antilink off'
                    }
                ]
            },
            {
                title: "ANTI BAD WORDS",
                rows: [{
                        title: 'ON ♻️',
                        rowId: '.antibad on'
                    },
                    {
                        title: 'OFF ⛔',
                        rowId: '.antibad off'
                    }
                ]
            },
            {
                title: "ANTI BOT",
                rows: [{
                        title: 'ON ♻️',
                        rowId: '.antibot on'
                    },
                    {
                        title: 'OFF ⛔',
                        rowId: '.antibot off'
                    }
                ]
            },
        ];

        const listMessage = {
            text: `*GROUP SETTINGS*\n\n☉ Select setting what you want to On or Off ☉`,
            footer: config.FOOTER,
            title: '',
            buttonText: "▰▰▰▰▰▰▰▰▰▰▰▰ \n┃ *𝚁𝙴𝙿𝙻𝚈 𝙱𝙴𝙻𝙾𝚆 𝙽𝚄𝙼𝙱𝙴𝚁*\n▰▰▰▰▰▰▰▰▰▰▰▰",
            sections: sections1
        };

        await conn.listMessage(from, listMessage, mek);
     m.react: "👥",
    } catch (e) {
        reply('*Error !!*');
        l(e);
    }
});

cmd({
    pattern: "settings",
    alias: ["setting", "bs"],
    desc: "එය bot's settings features යාවත්කාලීන කරයි.",
    category: "owner",
    use: '.settings',
    filename: __filename
}, async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isMe) return await reply('*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ !*');

        const sections2 = [{
                title: "AUTO REPLY VOICE",
                rows: [{
                        title: 'ON ♻️',
                        rowId: '.voice on'
                    },
                    {
                        title: 'OFF ⛔',
                        rowId: '.voice off'
                    }
                ]
            },
            {
                title: "AUTO REPLY MASSAGE",
                rows: [{
                        title: 'ON ♻️',
                        rowId: '.reply on'
                    },
                    {
                        title: 'OFF ⛔',
                        rowId: '.reply off'
                    }
                ]
            },
            {
                title: "AUTO SEEN STATUS",
                rows: [{
                        title: 'ON ♻️',
                        rowId: '.vi on'
                    },
                    {
                        title: 'OFF ⛔',
                        rowId: '.vi off'
                    }
                ]
            },   
            {
                title: "AUTO STATUS REPLY",
                rows: [{
                        title: 'ON ♻️',
                        rowId: '.sr on'
                    },
                    {
                        title: 'OFF ⛔',
                        rowId: '.sr off'
                    }
                ]
            },
            {
                title: "ONLY READ CMD",
                rows: [{
                        title: 'ON ♻️',
                        rowId: '.readcmd on',
                    },
                    {
                        title: 'OFF ⛔',
                        rowId: '.readcmd off'
                    }
                ]
            },
            {
                title: "AUTO READ All MASSAGE",
                rows: [{
                        title: 'ON ♻️',
                        rowId: '.rr on'
                    },
                    {
                        title: 'OFF ⛔',
                        rowId: '.rr off'
                    }
                ]
            },
            {
                title: "AUTO TYPING",
                rows: [{
                        title: 'ON ♻️',
                        rowId: '.typing on'
                    },
                    {
                        title: 'OFF ⛔',
                        rowId: '.typing off'
                    }
                ]
            },
            {
                title: "AUTO RECORDING",
                rows: [{
                        title: 'ON ♻️',
                        rowId: '.recoding on'
                    },
                    {
                        title: 'OFF ⛔',
                        rowId: '.recoding off'
                    }
                ]
            },
            {
                title: "ONLY ME",
                rows: [{
                        title: 'ON ♻️',
                        rowId: '.me on'
                    },
                    {
                        title: 'OFF ⛔',
                        rowId: '.me off'
                    }
                ]
            },
            {
                title: "ONLY GROUP",
                rows: [{
                        title: 'ON ♻️',
                        rowId: '.onlygroup on'
                    },
                    {
                        title: 'OFF ⛔',
                        rowId: '.onlygroup off'
                    }
                ]
            },
            {
                title: "ALWAYS ONLINE",
                rows: [{
                        title: 'ON ♻️',
                        rowId: '.online on'
                    },
                    {
                        title: 'OFF ⛔',
                        rowId: '.online off'
                    }
                ]
            },
            {
                title: "AUTO REACT",
                rows: [{
                        title: 'ON ♻️',
                        rowId: '.react on'
                    },
                    {
                        title: 'OFF ⛔',
                        rowId: '.react off'
                    }
                ]
            },
            {
                title: "OWNER REACT",
                rows: [{
                        title: 'ON ♻️',
                        rowId: '.ownerreact on'
                    },
                    {
                        title: 'OFF ⛔',
                        rowId: '.ownerreact off'
                    }
                ]
            },
            {
                title: "AUTO BIO",
                rows: [{
                        title: 'ON ♻️',
                        rowId: '.bio on'
                    },
                    {
                        title: 'OFF ⛔',
                        rowId: '.bio off'
                    }
                ]
            },
            {
                title: "AUTO BLOCK",
                rows: [{
                        title: 'ON ♻️',
                        rowId: '.ab on'
                    },
                    {
                        title: 'OFF ⛔',
                        rowId: '.ab off'
                    }
                ]
            },
            {
                title: "ANTI CALL",
                rows: [{
                        title: 'ON ♻️',
                        rowId: '.call on'
                    },
                    {
                        title: 'OFF ⛔',
                        rowId: '.call off'
                    }
                ]
            },
            {
                title: "ANTI DELETE",
                rows: [{
                        title: 'ON ♻️',
                        rowId: '.dele on'
                    },
                    {
                        title: 'OFF ⛔',
                        rowId: '.dele off'
                    }
                ]
            },
        ];

        const listMessage = {
            text: `*BOT'S SETTINGS*\n\n☉ Select setting what you want to On or Off ☉`,
            footer: config.FOOTER,
            title: '',
            buttonText: '▰▰▰▰▰▰▰▰▰▰▰▰\n┃ *𝚁𝙴𝙿𝙻𝚈 𝙱𝙴𝙻𝙾𝚆 𝙽𝚄𝙼𝙱𝙴𝚁*\n▰▰▰▰▰▰▰▰▰▰▰▰',
            sections:  sections2
        };

        await conn.listMessage(from, listMessage, mek);
        m.react: "⚙️",
    } catch (e) {
        reply('*Error !!*');
        l(e);
    }
});

cmd({
    pattern: "apply",
    alias: ["set", "input"],
    desc: "එය bot's configs යාවත්කාලීන කරයි.",
    category: "owner",
    use: '.apply <data>',
    filename: __filename
}, async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isMe) return await reply('*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ*');
        if (!q) return await reply('*මට settings update කිරීමට text එකක් දෙන්න. !*');

        const sections3 = [{
                title: "MAX UPLOAD SIZE",
                rows: [{
                        title: 'DEFAULT ⛔',
                        rowId: '.uploadsz 100'
                    },
                    {
                        title: 'NEW ♻️',
                        rowId: '.uploadsz ' + q
                    }
                ]
            },
            {
                title: "ALIVE MESSAGE",
                rows: [{
                        title: 'DEFAULT ⛔',
                        rowId: '.alivemg default'
                    },
                    {
                        title: 'NEW ♻️',
                        rowId: '.alivemg ' + q
                    }
                ]
            },
            {
                title: "FOOTER TEXT/CAPTION",
                rows: [{
                        title: 'DEFAULT ⛔',
                        rowId: '.footertxt ©powered by kavishan_OFC'
                    },
                    {
                        title: 'NEW ♻️',
                        rowId: '.footertxt ' + q
                    }
                ]
            },
            {
                title: "LOGO",
                rows: [{
                        title: 'DEFAULT ⛔',
                        rowId: '.setlogo https://pomf2.lain.la/f/sxqtyzmu.jpg'
                    },
                    {
                        title: 'NEW ♻️',
                        rowId: '.setlogo ' + q
                    }
                ]
            },
            {
                title: "PREFIX",
                rows: [{
                        title: 'DEFAULT ⛔',
                        rowId: '.prefix .'
                    },
                    {
                        title: 'NEW ♻️',
                        rowId: '.prefix ' + q
                    }
                ]
            },
        ];

        const listMessage = {
            image: 'https://raw.githubusercontent.com/kavishanofc/DATABASE/main/IMG-20250113-WA0005.jpg',
            text: `*BOT'S CONFIG*\n\n☉ Select setting what you want to Update ☉`,
            footer: config.FOOTER,
            title: '',
            buttonText: '▰▰▰▰▰▰▰▰▰▰▰▰\n┃ *𝚁𝙴𝙿𝙻𝚈 𝙱𝙴𝙻𝙾𝚆 𝙽𝚄𝙼𝙱𝙴𝚁*\n▰▰▰▰▰▰▰▰▰▰▰▰',
            sections: sections3
        };

        await conn.listMessage(from, listMessage, mek);
    m.react:"🦯",
    } catch (e) {
        reply('*Error !!*');
        l(e);
    }
});


cmd({
    pattern: "kavishanofc",
    react: "🥷",
    alias: ["kalana","kavishan"],
    desc: "හිමි කරු සම්බන්ද කර ගන්න",
    category: "main",
    use:".kavishanofc",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let vcard = 'BEGIN:VCARD\n' 
            + 'VERSION:3.0\n' 
            + `FN: kavishanOFC\n` 
            + `ORG: Web Developer;\n` 
            + `TEL;type=CELL;type=VOICE;waid=94788017991:+94788017991\n` 
            + 'END:VCARD'

await conn.sendMessage(from, { 
    contacts: { 
        displayName: 'kavishanOFC', 
        contacts: [{ vcard }] 
    },  quoted: mek})
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/JawadYTX/KHAN-DATA/raw/refs/heads/main/autovoice/contact.m4a' }, mimetype: 'audio/mp4',ptt: true}, { quoted: mek });
}catch(e){
console.log(e)
reply(`${e}`)
}
});


cmd({
    pattern: "ruwah",
    react: "👨‍💻",
    alias: ["sachintha","nirmal"],
    desc: "හිමි කරු සම්බන්ද කර ගන්න",
    category: "main",
    use:".ruwah",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let vcard = 'BEGIN:VCARD\n' 
            + 'VERSION:3.0\n' 
            + `FN: RUWAH\n` 
            + `ORG: Web Developer;\n` 
            + `TEL;type=CELL;type=VOICE;waid=94763562850:+94763562850\n` 
            + 'END:VCARD'

await conn.sendMessage(from, { 
    contacts: { 
        displayName: `RUWAH`, 
        contacts: [{ vcard }] 
    },  quoted: mek})
}catch(e){
console.log(e)
reply(`${e}`)
}
});

cmd({
    pattern: "ruwah",
    react: "👨‍💻",
    alias: ["sachintha", "nirmal"],
    desc: "හිමි කරු සම්බන්ද කර ගන්න",
    category: "main",
    use: ".ruwah",
    filename: __filename
},
async(conn, mek, m, {from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try {
    let vcard1 = 'BEGIN:VCARD\n'
               + 'VERSION:3.0\n'
               + `FN: RUWAH\n`
               + `ORG: Web Developer;\n`
               + `TEL;type=CELL;type=VOICE;waid=94763562850:+94763562850\n`
               + 'END:VCARD';

    let vcard2 = 'BEGIN:VCARD\n'
               + 'VERSION:3.0\n'
               + `FN: RUWAH (Backup)\n`
               + `ORG: Web Developer;\n`
               + `TEL;type=CELL;type=VOICE;waid=94788017991:+94788017991\n`
               + 'END:VCARD';

    await conn.sendMessage(from, { 
        contacts: { 
            displayName: `RUWAH`, 
            contacts: [{ vcard: vcard1 }, { vcard: vcard2 }] 
        }, quoted: mek });
} catch (e) {
    console.log(e);
    reply(`${e}`);
}
});

//============================================================================================================
cmd({
    pattern: "antilink",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isGroup) return await reply('*මෙය group එකක් නොවේ !*')
if (!isAdmins) return await reply('*ඔබ admin නොවේ !*')
if (!isBotAdmins) return await reply('*මම admin නොවේ !*')

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}
if(q === "on"){
if(await isAnti("ANTI_LINK")) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
let olddata = await get("ANTI_LINK")
olddata.push(from)
await input("ANTI_LINK", olddata)
await reply("*Anti link: " + q + "*")
} else {
if(!await isAnti("ANTI_LINK")) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
const array = await get("ANTI_LINK")
const itemToRemove = from
const indexToRemove = array.indexOf(itemToRemove);
if (indexToRemove !== -1) {
  array.splice(indexToRemove, 1);
}
await input("ANTI_LINK", array)
await reply("*Anti link: " + q + "*")
}
} catch (e) {
reply('*Error !!*')
l(e)
}
})
//====================================================================================================================
cmd({
    pattern: "antibot",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isGroup) return await reply('*මෙය group එකක් නොවේ !*')
if (!isAdmins) return await reply('*ඔබ admin නොවේ !*')
if (!isBotAdmins) return await reply('*මම admin නොවේ !*')

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}

if(q === "on"){
if(await isAnti("ANTI_BOT")) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
let olddata = await get("ANTI_BOT")
olddata.push(from)
await input("ANTI_BOT", olddata)
await reply("*Anti bots: " + q + "*")
} else {
if(!await isAnti("ANTI_BOT")) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
const array = await get("ANTI_BOT")
const itemToRemove = from
const indexToRemove = array.indexOf(itemToRemove);
if (indexToRemove !== -1) {
  array.splice(indexToRemove, 1);
}
await input("ANTI_BOT", array)
await reply("*Anti bots: " + q + "*")
}
} catch (e) {
reply('*Error !!*')
l(e)
}
})
//====================================================================================================================
cmd({
    pattern: "antibad",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isGroup) return await reply('*මෙය group එකක් නොවේ !*')
if (!isAdmins) return await reply('*ඔබ admin නොවේ !*')
if (!isBotAdmins) return await reply('*මම admin නොවේ !*')
const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}
if(q === "on"){
if(await isAnti("ANTI_BAD")) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
let olddata = await get("ANTI_BAD")
olddata.push(from)
await input("ANTI_BAD", olddata)
await reply("*Anti bad words: " + q + "*")
} else {
if(!await isAnti("ANTI_BAD")) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
const array = await get("ANTI_BAD")
const itemToRemove = from
const indexToRemove = array.indexOf(itemToRemove);
if (indexToRemove !== -1) {
  array.splice(indexToRemove, 1);
}
await input("ANTI_BAD", array)
await reply("*Anti bad words: " + q + "*")
}
} catch (e) {
reply('*Error !!*')
l(e)
}
})
//====================================================================================================================
cmd({
    pattern: "onlygroup",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply('*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ*')

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}
if(q === "on"){
let gett = await get("ONLY_GROUP")
if(gett === true) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("ONLY_GROUP", true)
await reply("*Only group: " + q + "*")
} else{
let gett = await get("ONLY_GROUP")
if(gett === false) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("ONLY_GROUP", false)
await reply("*Only group: " + q + "*")
}
} catch (e) {
reply('*Error !!*')
l(e)
}
})
//====================================================================================================================
cmd({
    pattern: "me",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply('*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ*' )

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}
if(q === "on"){
let gett = await get("ONLY_ME")
if(gett === true) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("ONLY_ME", true)
await reply("*Only me: " + q + "*")
} else{
let gett = await get("ONLY_ME")
if(gett === false) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("ONLY_ME", false)
await reply("*Only me: " + q + "*")
}
} catch (e) {
reply('*Error !!*')
l(e)
}
})
//====================================================================================================================

cmd({
    pattern: "call",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply('*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ*' )

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}
if(q === "on"){
let gett = await get("ANTI_CALL")
if(gett === true) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("ANTI_CALL", true)
await reply("*anti call: " + q + "*")
} else{
let gett = await get("ANTI_CALL")
if(gett === false) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("ANTI_CALL", false)
await reply("*anti call: " + q + "*")
}
} catch (e) {
reply('*Error !!*')
l(e)
}
})
//====================================================================================================================
cmd({
    pattern: "ab",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply('*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ*' )

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}
if(q === "on"){
let gett = await get("AUTO_BLOCK")
if(gett === true) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("AUTO_BLOCK", true)
await reply("*auto block: " + q + "*")
} else{
let gett = await get("AUTO_BLOCK")
if(gett === false) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("AUTO_BLOCK", false)
await reply("*auto block: " + q + "*")
}
} catch (e) {
reply('*Error !!*')
l(e)
}
})
//====================================================================================================================
cmd({
    pattern: "bio",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply('*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ*')

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}
if(q === "on"){
let gett = await get("AUTO_BIO")
if(gett === true) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("AUTO_BIO", true)
await reply("*auto bio: " + q + "*")
} else{
let gett = await get("AUTO_BIO")
if(gett === false) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("AUTO_BIO", false)
await reply("*auto bio: " + q + "*")
}
} catch (e) {
reply('*Error !!*')
l(e)
}
})
//====================================================================================================================
cmd({
    pattern: "dele",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply('*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ*')

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}
if(q === "on"){
let gett = await get("ANTI_DELETE")
if(gett === true) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("ANTI_DELETE", true)
await reply("*anti delete: " + q + "*")
} else{
let gett = await get("ANTI_DELETE")
if(gett === false) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("ANTI_DELETE", false)
await reply("*anti delete: " + q + "*")
}
} catch (e) {
reply('*Error !!*')
l(e)
}
})
//====================================================================================================================
cmd({
    pattern: "voice",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply('*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ*')

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}
if(q === "on"){
let gett = await get("AUTO_VOICE")
if(gett === true) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("AUTO_VOICE", true)
await reply("*auto reply voice: " + q + "*")
} else{
let gett = await get("AUTO_VOICE")
if(gett === false) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("AUTO_VOICE", false)
await reply("*auto reply voice: " + q + "*")
}
} catch (e) {
reply('*Error !!*')
l(e)
}
})

//====================================================================================================================
cmd({
    pattern: "reply",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply('*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ*')

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}
if(q === "on"){
let gett = await get("AUTO_MESSAGE")
if(gett === true) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("AUTO_MESSAGE", true)
await reply("*auto reply massage: " + q + "*")
} else{
let gett = await get("AUTO_MESSAGE")
if(gett === false) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("AUTO_MESSAGE", false)
await reply("*auto reply massage: " + q + "*")
}
} catch (e) {
reply('*Error !!*')
l(e)
}
})
//====================================================================================================================

cmd({
    pattern: "vi",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply('*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ*')

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}
if(q === "on"){
let gett = await get("STATUS_VIEW")
if(gett === true) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("STATUS_VIEW", true)
await reply("*status view: " + q + "*")
} else{
let gett = await get("STATUS_VIEW")
if(gett === false) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("STATUS_VIEW", false)
await reply("*status view: " + q + "*")
}
} catch (e) {
reply('*Error !!*')
l(e)
}
})
//========================================================================================================================
cmd({
    pattern: "sr",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply('*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ*')

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}
if(q === "on"){
let gett = await get("AUTO_STATUS_REPLY")
if(gett === true) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("AUTO_STATUS_REPLY", true)
await reply("*auto status reply: " + q + "*")
} else{
let gett = await get("AUTO_STATUS_REPLY")
if(gett === false) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("AUTO_STATUS_REPLY", false)
await reply("*auto status reply: " + q + "*")
}
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "rr",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply('*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ*')

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}
if(q === "on"){
let gett = await get("AUTO_READ")
if(gett === true) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("AUTO_READ", true)
await reply("*read massage: " + q + "*")
} else{
let gett = await get("AUTI_READ")
if(gett === false) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("AUTO_READ", false)
await reply("*read massage: " + q + "*")
}
} catch (e) {
reply('*Error !!*')
l(e)
}
})
//========================================================================================================================

cmd({
    pattern: "online",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply('*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ*')

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}
if(q === "on"){
let gett = await get("ALWAYS_ONLINE")
if(gett === true) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("ALWAYS_ONLINE", true)
await reply("*always online: " + q + "*")
} else{
let gett = await get("ALWAYS_ONLINE")
if(gett === false) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("ALWAYS_ONLINE", false)
await reply("*always online: " + q + "*")
}
} catch (e) {
reply('*Error !!*')
l(e)
}
})
//====================================================================================================================
cmd({
    pattern: "typing",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply('*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ*')

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}
if(q === "on"){
let gett = await get("AUTO_TYPING")
if(gett === true) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("AUTO_TYPING", true)
await reply("*auto typing: " + q + "*")
} else{
let gett = await get("AUTO_TYPING")
if(gett === false) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("AUTO_TYPING", false)
await reply("*auto typing: " + q + "*")
}
} catch (e) {
reply('*Error !!*')
l(e)
}
})
//=======================================================================================================================
cmd({
    pattern: "recoding",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply('*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ*')

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}
if(q === "on"){
let gett = await get("AUTO_RECORDING")
if(gett === true) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("AUTO_RECORDING", true)
await reply("*auto recoding: " + q + "*")
} else{
let gett = await get("AUTO_RECORDING")
if(gett === false) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("AUTO_RECORDING", false)
await reply("*auto recoding: " + q + "*")
}
} catch (e) {
reply('*Error !!*')
l(e)
}
})
//================================================================================================
cmd({
    pattern: "react",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply('*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ*')

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}
if(q === "on"){
let gett = await get("AUTO_REACT")
if(gett === true) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("AUTO_REACT", true)
await reply("*auto react: " + q + "*")
} else{
let gett = await get("AUTO_REACT")
if(gett === false) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("AUTO_REACT", false)
await reply("*auto react: " + q + "*")
}
} catch (e) {
reply('*Error !!*')
l(e)
}
})
//================================================================================================
cmd({
    pattern: "ownerreact",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply('*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ*')

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}
if(q === "on"){
let gett = await get("OWNER_REACT")
if(gett === true) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("OWNER_REACT", true)
await reply("*owner react: " + q + "*")
} else{
let gett = await get("OWNER_REACT")
if(gett === false) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("OWNER_REACT", false)
await reply("*owner react: " + q + "*")
}
} catch (e) {
reply('*Error !!*')
l(e)
}
})
//================================================================================================
cmd({
    pattern: "readcmd",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply('*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ*')

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}
if(q === "on"){
let gett = await get("AUTO_READ_CMD")
if(gett === true) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("AUTO_READ_CMD", true)
await reply("*auto read cmd: " + q + "*")
} else{
let gett = await get("AUTO_READ_CMD")
if(gett === false) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("AUTO_READ_CMD", false)
await reply("*auto read cmd: " + q + "*")
}
} catch (e) {
reply('*Error !!*')
l(e)
}
})
//====================================================================================================================

cmd({
    pattern: "uploadsz",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply('*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ*')
let gett = await get("MAX_SIZE")
if(gett === Number(q)) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("MAX_SIZE", Number(q))

await reply("*Max upload size updated: " + q + "*")

} catch (e) {
reply('*Error !!*')
l(e)
}
})
//====================================================================================================================
cmd({
    pattern: "prefix",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply('*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ*')
let gett = await get("PREFIX")
if(gett === q) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("PREFIX", q)

await reply("*prefix updated:* " + q )

} catch (e) {
reply('*Error !!*')
l(e)
}
})
//====================================================================================================================

cmd({
    pattern: "alivemg",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply('*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ*')
let gett = await get("ALIVE")
if(gett === q) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("ALIVE", q)

await reply("*Alive massage updated:* " + q )

} catch (e) {
reply('*Error !!*')
l(e)
}
})
//====================================================================================================================
cmd({
    pattern: "footertxt",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply('*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ*')
let gett = await get("FOOTER")
if(gett === q) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("FOOTER", q)

await reply("*Footer updated:* " + q)

} catch (e) {
reply('*Error !!*')
l(e)
}
})
//====================================================================================================================
cmd({
    pattern: "setlogo",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply('*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ*')
let gett = await get("LOGO")
if(gett === q) return await reply('*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*')
await input("LOGO", q)

await reply("*Logo updated: " + q + "*")

} catch (e) {
reply('*Error !!*')
l(e)
}
})
//====================================================================================================================
cmd({
    pattern: "resetdb",
    desc: "එය දත්ත සමුදාය නැවත සකසයි",
    category: "owner",
    use: '.resetdb',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isMe) return await reply('*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ*')
   await updfb()
return reply("Database reseted !!")
} catch (e) {
reply('*Error !!*')
l(e)
}
})
