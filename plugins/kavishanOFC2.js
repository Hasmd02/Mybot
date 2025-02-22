const fs = require('fs');
const path = require('path');
const os = require('os');
const { copy } = require('fs-extra');

const axios = require('axios');
const FormData = require('form-data');
const moment = require('moment-timezone');

const config = require('../config');
const { cmd, commands } = require('../command');
const { 
  getBuffer, 
  getGroupAdmins, 
  getRandom, 
  h2k, 
  isUrl, 
  Json, 
  runtime, 
  sleep, 
  fetchJson 
} = require('../lib/functions');

// Function definitions below
function genMsgId() {
  const prefix = "3EB";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomText = prefix;

  for (let i = prefix.length; i < 22; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters.charAt(randomIndex);
  }

  return randomText;
}
var tesadtag = "*මට ටැග් කිරීමට text එකක් ලබා දෙන්න!*"
var descg = "එය කණ්ඩායමේ සියලුම සාමාජිකයින් ටැග් කරයි."
var ONLGROUP = "*මෙය කණ්ඩායමක් නොවේ්!*"
var ADMIN = "ඔබ පරිපාලකයෙක් නොවේ!"
var tmsg = "එය බොට් සබැඳිය ලබා දෙයි"
var imgmsg = "Enter the enable/disable value, For Example ${prefix}ephemeral enable"
var BOTOW = "*ඔබ බොට්ගේ හිමිකරු හෝ උපපරිපාලක කරු නොවේ!*"
var SUCCESS = "✅ සාර්ථකව කණ්ඩායම විස්තරය වෙනස් කරන ලදි."
var ERROR = "දෝෂයක් ඇතිවිය!"

cmd({
    pattern: "savecontact",
    react: "🔖",
    desc: "එය කණ්ඩායම් සම්බන්ධතා සුරැකීම සිදු කරයි",
    category: "group",
    use: '.savecontact',
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isAdmins, reply, participants, groupMetadata }) => {
    try {
        if (!isGroup) return reply('This command can only be used in groups.');
        if (!isAdmins) return reply('Only group admins can use this command.');

        let groupInfo = await conn.groupMetadata(from);
        let contacts = '';
        let noPort = 1;

        // Build the vCard contacts list
        for (let member of participants) {
            let number = member.id.split("@")[0];
            contacts += `BEGIN:VCARD\nVERSION:3.0\nFN:[${noPort++}] +${number}\nTEL;type=CELL;type=VOICE;waid=${number}:+${number}\nEND:VCARD\n`;
        }

        let fileName = './contacts.vcf';
        const fs = require('fs');
        fs.writeFileSync(fileName, contacts.trim());

        reply(`\nPlease wait... Saving ${participants.length} contacts.`);

        // Send the vCard file to the group
        await conn.sendMessage(m.chat, {
            document: fs.readFileSync(fileName),
            mimetype: 'text/vcard',
            fileName: 'Contact.vcf',
            caption: `\n✅ Success!\nGroup: *${groupInfo.subject}*\nContacts: *${participants.length}*`
        }, { quoted: m });

        // Clean up the file after sending
        fs.unlinkSync(fileName);

        // React to the message
        await conn.sendMessage(from, { react: { text: `✅`, key: mek.key } });
    } catch (error) {
        console.error(error);
        reply('*Error!!*');
    }
});




        
	

//=========================================================================================

cmd({
    pattern: "kick",
    react: "🥏",
    alias: ["remove"],
    desc: "එය කණ්ඩායමෙන් සහභාගිවන්නෙකු ඉවත් කරයි",
    category: "group",
    use: '.kick',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isKavishan, isAdmins, reply}) => {
try{
        if (!isGroup) return reply('මෙය කණ්ඩායම් විධානයකි')
		if(!isAdmins) { if ( !isMe) return conn.sendMessage(from,{text:"🚫 *මෙය ඇඩ්මින් විදානයකි*"},{quoted:mek }) }
		if(!isBotAdmins) return reply("❌ *පලමුව ඔබ ඇඩ්මින්  විය යුතුය*  ❗")
		const mention = await mentionByTag
		let users = await (mention) || mek.msg.contextInfo.participant
		if (!users) return reply("🚫 *context තුල කිසිදු පරිශීලකයෙකු සොයා ගැනීමට නොහැකි විය*")
			await conn.groupParticipantsUpdate(from, [users], "remove")
			await conn.sendMessage(from,{text:`*Successfully removed*  ✔️`},{quoted:mek })
	
} catch (e) {
reply('🚫 *Error Accurated !!*\n\n' + e )
console.log(e)
}
})

cmd({
    pattern: "promote",
    react: "🪢",
    alias: ["addadmin"],
    desc: "පරිපාලකයෙකු ලෙස සහභාගිවන්නෙකු එක් කරයි",
    category: "group",
    use: '.promote',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isKavishan, isAdmins, reply}) => {
try{
        if (!isGroup) return reply('මෙය කණ්ඩායම් විධානයකි')
		if(!isAdmins) { if (!isMe) return conn.sendMessage(from,{text:"🚫 *මෙය ඇඩ්මින් විදානයකි*"},{quoted:mek }) }
		if(!isBotAdmins) return reply("❓ *පලමුව බොට් ඇඩ්මින් විය යුතුය*")
		const mention= await mentionByTag
		let users = await (mention) || mek.msg.contextInfo.participant
		if (!users) return reply("🚫 *context තුල කිසිදු පරිශීලකයෙකු සොයා ගැනීමට නොහැකි විය*")
		const groupAdmins = await getGroupAdmins(participants) 
		if  ( groupAdmins.includes(users)) return reply('❗ *User Already an Admin*  ✔️')
		    await conn.groupParticipantsUpdate(from, [users], "promote")
			await conn.sendMessage(from,{text:`*User promoted as an Admin*  ✔️`},{quoted:mek })
	
} catch (e) {
reply('🚫 *Error Accurated !!*\n\n' + e )
console.log(e)
}
})


cmd({
    pattern: "demote",
    react: "🪢",
    alias: ["removeadmin"],
    desc: "ඇඩ්මින්ව සාමාජිකයෙකු ලෙස පහත හෙලයි",
    category: "group",
    use: '.demote',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isKavishan, isAdmins, reply}) => {
try{
        if (!isGroup) return reply('මෙය කණ්ඩායම් විධානයකි')
		if(!isAdmins) { if ( !isMe) return conn.sendMessage(from,{text:"🚫 *This is admin only command*"},{quoted:mek }) }
		if(!isBotAdmins) return reply("❌  *පලමුව බොට් ඇඩ්මින් විය යුතුය*  ❗")
		const mention= await mentionByTag
		let users = await (mention) || mek.msg.contextInfo.participant
		if (!users) return reply("🚫 *context තුල කිසිදු පරිශීලකයෙකු සොයා ගැනීමට නොහැකි විය*")
		const groupAdmins = await getGroupAdmins(participants) 
		if  ( !groupAdmins.includes(users)) return reply('❗ *User Already not an Admin*')
		    await conn.groupParticipantsUpdate(from, [users], "demote")
			await conn.sendMessage(from,{text:`*User No longer an Admin*  ✔️`},{quoted:mek })
	
} catch (e) {
reply('🚫 *Error Accurated !!*\n\n' + e )
console.log(e)
}
})

cmd({
    pattern: "mute",
    react: "🔇",
    alias: ["close","mute_cyber"],
    desc: "එය පරිපාලකයන් සදහා පමණක් පනිවිඩ යැවීමට කලසයි.",
    category: "group",
    use: '.mute',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isKavishan, isAdmins, reply}) => {
try{
if (!isGroup) return reply('🚫 *මෙය කණ්ඩායම් විධානයකි*')
if (!isBotAdmins) return reply('🚫 *පලමුව බොට් ඇඩ්මින් විය යුතුයි*')
if (!isAdmins) { if (!isMe) return reply('🚫 *පලමුව ඔබ ඇඩ්මින්  විය යුතුය*') }
await conn.groupSettingUpdate(from, 'announcement')
 await conn.sendMessage(from , { text: `🔇 *Group Chat closed by Admin ${pushname}*` }, { quoted: mek } )
} catch (e) {
reply('*Error !!*')
console.log(e)
}
})

cmd({
    pattern: "unmute",
    react: "🔈",
    alias: ["open","unmute_cyber"],
    desc: "සියලුම සාමාජිකයන්ට සමූහය වෙත පනිවිඩ යැවීමට සලසයි.",
    category: "group",
    use: '.unmute',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isKavishan, isAdmins, reply}) => {
try{
if (!isGroup) return reply('🚫 *මෙය කණ්ඩායම් විධානයකි*')
if (!isBotAdmins) return reply('🚫 *පලමුව බොට් ඇඩ්මින් විය යුතුයි*')
if (!isAdmins) { if (!isMe) return reply('🚫 *පලමුව ඔබ ඇඩ්මින්  විය යුතුය*') }
await conn.groupSettingUpdate(from, 'not_announcement')
 await conn.sendMessage(from , { text: `🔇 *Group Chat Opened by Admin ${pushname}*` }, { quoted: mek } )
} catch (e) {
reply('*Error !!*')
console.log(e)
}
})
cmd({
    pattern: "leave",
    react: "🚮",
    alias: ["left","kickme"],
    desc: "එය කණ්ඩායමෙන් ඉවත් වීම සිදු වෙයි",
    category: "group",
    use: '.leave',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isKavishan, isAdmins, reply}) => {
try{
if (!isGroup) {return reply('🚫 *මෙය කණ්ඩායම් විධානයකි*')}
if (!isMe) {return reply('🚫 *මෙය කණ්ඩායම් විධානයකි*')}
 await conn.sendMessage(from , { text: `🚮 *Good Bye All*` }, { quoted: mek } )
 await conn.groupLeave(from) 
} catch (e) {
reply('*Error !!*')
console.log(e)
}
})
cmd({
    pattern: "invite",
    react: "🗿",
    alias: ["grouplink","glink"],
    desc: "කණ්ඩායම් ආරාධනා සබැඳිය ලබා දෙයි",
    category: "group",
    use: '.invite',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isKavishan, isAdmins, reply}) => {
try{
if (!isGroup) return reply('🚫 *මෙය කණ්ඩායම් විධානයකි*')
if (!isBotAdmins) return reply('🚫 *පලමුව බොට් ඇඩ්මින් විය යුතුයි*')
if (!isAdmins) { if (!isMe) return reply('🚫 *පලමුව ඔබ ඇඩ්මින්  විය යුතුය*') }
const code = await conn.groupInviteCode(from)
//console.log("group code: " + code)
 await conn.sendMessage(from , { text: `🖇️ *Group Link*\n\nhttps://chat.whatsapp.com/${code}`}, { quoted: mek } )
} catch (e) {
reply('*Error !!*')
console.log(e)
}
})

//await sock.groupRevokeInvite("abcd-xyz@g.us")
cmd({
    pattern: "ginfo",
    react: "🕵️",
    alias: ["groupinfo"],
    desc: "එය කණ්ඩායම් තොරතුරු ලබා දෙයි.",
    category: "group",
    use: '.ginfo',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isKavishan, isAdmins, reply}) => {
    try {
        // Check if the command is being used in a group
        if (!isGroup) {
            return reply('🚫 *මෙය කණ්ඩායම් විධානයකි*');
        }

        // Check if the bot is an admin
        if (!isBotAdmins) {
            return reply('🚫 *පලමුව බොට් ඇඩ්මින් විය යුතුයි*');
        }

        // Check if the user is an admin or the creator
        if (!isAdmins && !isMe) {
            return reply('🚫 *පලමුව ඔබ ඇඩ්මින්  විය යුතුය*');
        }

        // Retrieve group metadata
        const metadata = await conn.groupMetadata(from);
        let ppUrl;

        // Try to get the group profile picture
        try {
            ppUrl = await conn.profilePictureUrl(from, 'image');
        } catch (e) {
            ppUrl = 'https://www.gstatic.com/webp/gallery/1.jpg'; // Default image if there's an error
        }

        // Prepare the group information data
        const gdata = `\n*${metadata.subject}*

🐉 *Group Jid* - ${metadata.id}

📬 *Participant Count* - ${metadata.size}

👤 *Group Creator* - ${metadata.owner}

📃 *Group Description* - ${metadata.desc || 'No description provided'}

`;

        // Send the group information with the profile picture
        await conn.sendMessage(from, {
            image: { url: ppUrl },
            caption: gdata
        }, { quoted: mek });

    } catch (e) {
        // Error handling
        reply('⛔ *Error occurred!!*\n\n' + e);
        console.log(e);
    }
});


cmd({
    pattern: "add",
    desc: "එය කණ්ඩායමට සාමාජිකයෙකු එක් කරයි.",
    category: "group",
    react: "➕",
    use:'.add',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('මෙම විධානය භාවිතා කළ හැක්කේ කණ්ඩායමක් තුළ පමණ.')
        if (!isBotAdmins) return reply('මෙම විධානය භාවිතා කිරීමට බොට් පරිපාලකයෙකු විය යුතුය.')
        if (!isAdmins) return reply('මෙම විධානය භාවිතා කිරීමට ඔබ පරිපාලකයෙකු විය යුතුය.')
        const user = q.split(' ')[0]
        if (!user) return reply('කරුණාකර එකතු කිරීමට දුරකථන අංකයක් සපයන්න.')

        await conn.groupParticipantsUpdate(from, [`${user}@s.whatsapp.net`], 'add')
        await reply(`@${user} has been added to the group.`, { mentions: [`${user}@s.whatsapp.net`] })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})
cmd({
    pattern: "join",
    desc: "එය ලින්ක් එකකින් සමූහයට එකතු කරයි",
    category: "main",
    use: '<group link.>',
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner,isKavishan, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
if(!isOwner && !isMe)return;
try{  if (!q) return reply(`Please give me Query`);
    if (!q.split(" ")[0] && !q.split(" ")[0].includes("whatsapp.com"))
       reply("Link Invalid, Please Send a valid whatsapp Group Link!");
    let result = q.split(" ")[0].split("https://chat.whatsapp.com/")[1];
    await conn.groupAcceptInvite(result)
        .then((res) => reply("✔️Joined Group"))
        .catch((err) => reply("Error in Joining Group"));
} catch (e) {
    reply("🚩 Not Found !")
    console.log(e)

}
})

cmd({
    pattern: "getpic",
    desc: "එය කණ්ඩායම් profile පින්තූරය ලබා දෙයි.",
    category: "group",
    react: "🖼️",
    use: '.getpic',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('මෙම විධානය භාවිතා කළ හැක්කේ කණ්ඩායමක් තුළ පමණි.')

        const groupPic = await conn.profilePictureUrl(from, 'image').catch(e => null) // Catch any error and return null
        if (!groupPic) return reply('කණ්ඩායම් profile පින්තූරය සොයාගත නොහැක.')

        await conn.sendMessage(from, { image: { url: groupPic }, caption: 'Group Profile Picture' })
    } catch (e) {
        console.log(e)
        reply(`දෝෂයක් සිදු විය: ${e}`)
    }
})

cmd({
  pattern: "tourl",
  alias: ["imgtourl", "img2url", "url"],
  react: "🖇",
  desc: "එය පින්තූරයක් url එකක් බවට පරිවර්තනය කරයි",
  category: "convert",
  use: ".tourl",
  filename: __filename,
}, async (bot, message, args, options) => {
  const { from, quoted, reply, sender } = options;

  try {
    // Check if the message contains an image
    const targetMessage = message.quoted ? message.quoted : message;
    const mimetype = (targetMessage.msg || targetMessage).mimetype || "";
    if (!mimetype || !mimetype.startsWith("image")) {
      throw "Please reply to an image.";
    }

    // Download the image
    const imageBuffer = await targetMessage.download();
    const tempFilePath = path.join(os.tmpdir(), "temp_image");

    // Save the image temporarily
    fs.writeFileSync(tempFilePath, imageBuffer);

    // Prepare the image for upload
    const formData = new FormData();
    formData.append("image", fs.createReadStream(tempFilePath));

    // Upload the image to imgbb
    const response = await axios.post(
      "https://api.imgbb.com/1/upload?key=a4886aba4b2ec74eb880750a7ba52744",
      formData,
      { headers: { ...formData.getHeaders() } }
    );

    // Check the response
    if (!response.data || !response.data.data || !response.data.data.url) {
      throw "❌ Failed to upload the file.";
    }

    const uploadedUrl = response.data.data.url;

    // Clean up the temporary file
    fs.unlinkSync(tempFilePath);

    // Send the result
    await bot.sendMessage(from, {
      text: `*Image Uploaded Successfully*\nSize: ${imageBuffer.length} Byte(s)\n*URL:* ${uploadedUrl}\n\n> Uploaded kavishanOFC`,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 1000,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363376339574797@newsletter",
          newsletterName: "ＤＡＲＫＭＡＴＴＥ Ｘ",
          serverMessageId: 143,
        },
      },
    });
  } catch (error) {
    reply("Error: " + error);
    console.error(error);
  }
});
		
