const fetch = require('node-fetch');
const axios = require('axios');
const config = require('../config')

// Replace these with your GitHub credentials
const userName = config.GITHUB_USER_NAME;
const token = config.GITHUB_TOKEN;
const repoName = "DMX-MD-DATABASE";
// Function to fetch data from GitHub API
async function githubApiRequest(url, method = 'GET', data = {}) {
  try {
    const options = {
      method,
      headers: {
        Authorization: `Basic ${Buffer.from(`${userName}:${token}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    };

    if (method === 'GET' || method === 'HEAD') {
      // Remove the body property for GET and HEAD requests
      delete options.body;
    } else {
      // For other methods (POST, PUT, DELETE, etc.), add the JSON.stringify data to the request body
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    return await response.json();
  } catch (error) {
    throw new Error(`GitHub API request failed: ${error.message}`);
  }
}


async function checkRepoAvailability() {
  try {
    const apiUrl = `https://api.github.com/repos/${userName}/${repoName}`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(apiUrl, { headers });

    if (response.status === 200) {
      return true
    } else {
      return false
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return false
    } else {
      console.error('Error:', error.message);
    }
  }
}


// 1. Function to search GitHub file
async function githubSearchFile(filePath, fileName) {
  const url = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}?ref=main`;
  const data = await githubApiRequest(url);
  return data.find((file) => file.name === fileName);
}

// 2. Function to create a new GitHub file
async function githubCreateNewFile(filePath, fileName, content) {
  const url = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}/${fileName}`;
  const data = {
    message: `Create new file: ${fileName}`,
    content: Buffer.from(content).toString('base64'),
  };
  return await githubApiRequest(url, 'PUT', data);
}

// 3. Function to delete a GitHub file
async function githubDeleteFile(filePath, fileName) {
  const file = await githubSearchFile(filePath, fileName);
  if (!file) throw new Error('File not found on GitHub.');

  const url = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}/${fileName}`;
  const data = {
    message: `Delete file: ${fileName}`,
    sha: file.sha,
  };
  await githubApiRequest(url, 'DELETE', data);
}

// 4. Function to get GitHub file content
async function githubGetFileContent(filePath, fileName) {
  const file = await githubSearchFile(filePath, fileName);
  if (!file) throw new Error('File not found on GitHub.');

  const url = file.download_url;
  const response = await fetch(url);
  return await response.text();
}

// 5. Function to clear GitHub file content and add new content
async function githubClearAndWriteFile(filePath, fileName, content) {
  const file = await githubSearchFile(filePath, fileName);
  if (!file) {
    await githubCreateNewFile(filePath, fileName, content);
  } else {
    const url = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}/${fileName}`;
    const data = {
      message: `Modify file: ${fileName}`,
      content: Buffer.from(content).toString('base64'),
      sha: file.sha,
    };
    return await githubApiRequest(url, 'PUT', data);
  }
}

// 6. Function to delete an existing GitHub file and upload a new one
async function githubDeleteAndUploadFile(filePath, fileName, newContent) {
  await githubDeleteFile(filePath, fileName);
  await githubCreateNewFile(filePath, fileName, newContent);
}

//========================================
async function updateCMDStore(MsgID, CmdID) {
  try {
    let olds = JSON.parse(await githubGetFileContent("Non-Btn", 'data.json'))
    olds.push({ [MsgID]: CmdID })
    var add = await githubClearAndWriteFile('Non-Btn', 'data.json', JSON.stringify(olds, null, 2))
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

async function createFileIfNotFound(filePath, fileName, content) {
  try {
    let file;
    try {
      file = await githubSearchFile(filePath, fileName);
    } catch (e) {
    }
    if (!file) {
      await githubCreateNewFile(filePath, fileName, content);
    }
  } catch (error) {
    console.log(error);

  }
}

async function isbtnID(MsgID) {
  try {
    let olds = JSON.parse(await githubGetFileContent("Non-Btn", 'data.json'))
    let foundData = null;
    for (const item of olds) {
      if (item[MsgID]) {
        foundData = item[MsgID];
        break;
      }
    }
    if (foundData) return true
    else return false
  } catch (e) {
    return false
  }
}

async function getCMDStore(MsgID) {
  try {
    let olds = JSON.parse(await githubGetFileContent("Non-Btn", 'data.json'))
    let foundData = null;
    for (const item of olds) {
      if (item[MsgID]) {
        foundData = item[MsgID];
        break;
      }
    }
    return foundData
  } catch (e) {
    return false
  }
}

function getCmdForCmdId(CMD_ID_MAP, cmdId) {
  const result = CMD_ID_MAP.find((entry) => entry.cmdId === cmdId);
  return result ? result.cmd : null;
}

const connectdb = async () => {
  let availabilityrepo = await checkRepoAvailability()
  if (!availabilityrepo) {
    const response = await axios.post(
      'https://api.github.com/user/repos',
      {
        name: repoName,
        private: true, // Set to true for a private repo
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let get = {
      MAX_SIZE: 100,
      PREFIX: '.',
      ALIVE: `default`,
      FOOTER: '©powerd by DarkMatte x ᵀᴹ',
      LOGO: `https://github.com/DARKMATTER-X-TM/DATABASE/blob/main/64lr8y68.jpg?raw=true`,
      STATUS_VIEW: false,
      AUTO_STATUS_REPLY: false,
      ALWAYS_ONLINE: false,
      AUTO_TYPING: false,
      AUTO_RECORDING: false,
      ANTI_DELETE: false,
      AUTO_BLOCK: false,
      ANTI_CALL: false,
      AUTO_BIO: false,
      AUTO_REACT: false,
      OWNER_REACT: false,
      AUTO_READ_CMD: false,
      AUTO_READ: false,
      ONLY_GROUP: false,
      ONLY_ME: false,
      ANTI_BAD: [],
      AUTO_VOICE: false,
      AUTO_MESSAGE: false,
      AUTO_MESSAGE: false,
      ANTI_LINK: [],
      ANTI_BOT: []
    }
    await githubCreateNewFile("settings", "settings.json", JSON.stringify(get))
    await githubCreateNewFile("Non-Btn", 'data.json', JSON.stringify([]))
    console.log(`Database "${repoName}" created successfully ✓`);
  }
  else console.log("DATABASE CONNECTED ✓")
};
//=====================================================================
async function input(setting, data) {
  let get = JSON.parse(await githubGetFileContent("settings", "settings.json"))

  if (setting == "MAX_SIZE") {
    get.MAX_SIZE = data
    config.MAX_SIZE = data
    return await githubClearAndWriteFile("settings", "settings.json", JSON.stringify(get))
  } else if (setting == "PREFIX") {
    get.PREFIX = data
    config.PREFIX = data
    return await githubClearAndWriteFile("settings", "settings.json", JSON.stringify(get))
  } else if (setting == "ALIVE") {
    get.ALIVE = data
    config.ALIVE = data
    return await githubClearAndWriteFile("settings", "settings.json", JSON.stringify(get))
  } else if (setting == "FOOTER") {
    get.FOOTER = data
    config.FOOTER = data
    return await githubClearAndWriteFile("settings", "settings.json", JSON.stringify(get))
  } else if (setting == "LOGO") {
    get.LOGO = data
    config.LOGO = data
    return await githubClearAndWriteFile("settings", "settings.json", JSON.stringify(get))
  } else if (setting == "STATUS_VIEW") {
    get.STATUS_VIEW = data
    config.STATUS_VIEW = data
    return await githubClearAndWriteFile("settings", "settings.json", JSON.stringify(get))
  } else if (setting == "AUTO_STATUS_REPLY") {
    get.AUTO_STATUS_REPLY = data
    config.AUTO_STATUS_REPLY = data
    return await githubClearAndWriteFile("settings", "settings.json", JSON.stringify(get))
  } else if (setting == "ALWAYS_ONLINE") {
    get.ALWAYS_ONLINE = data
    config.ALWAYS_ONLINE = data
    return await githubClearAndWriteFile("settings", "settings.json", JSON.stringify(get))
  } else if (setting == "AUTO_TYPING") {
    get.AUTO_TYPING = data
    config.AUTO_TYPING = data
    return await githubClearAndWriteFile("settings", "settings.json", JSON.stringify(get))
  } else if (setting == "AUTO_RECORDING") {
    get.AUTO_RECORDING = data
    config.AUTO_RECORDING = data
    return await githubClearAndWriteFile("settings", "settings.json", JSON.stringify(get))
  } else if (setting == "ANTI_DELETE") {
    get.ANTI_DELETE = data
    config.ANTI_DELETE = data
    return await githubClearAndWriteFile("settings", "settings.json", JSON.stringify(get))
  } else if (setting == "AUTO_BLOCK") {
    get.AUTO_BLOCK = data
    config.AUTO_BLOCK= data
  return await githubClearAndWriteFile("settings", "settings.json", JSON.stringify(get))
  } else if (setting == "ANTI_CALL") {
    get.ANTI_CALL = data
    config.ANTI_CALL = data
    return await githubClearAndWriteFile("settings", "settings.json", JSON.stringify(get))
  } else if (setting == "AUTO_BIO") {
    get.AUTO_BIO = data
    config.AUTO_BIO = data
    return await githubClearAndWriteFile("settings", "settings.json", JSON.stringify(get))
    } else if (setting == "AUTO_REACT") {
    get.AUTO_REACT = data
    config.AUTO_REACT = data
    return await githubClearAndWriteFile("settings", "settings.json", JSON.stringify(get))
    } else if (setting == "OWNER_REACT") {
    get.OWNER_REACT = data
    config.OWNER_REACT = data
    return await githubClearAndWriteFile("settings", "settings.json", JSON.stringify(get))
  } else if (setting == "AUTO_READ_CMD") {
    get.AUTO_READ_CMD = data
    config.AUTO_READ_CMD = data
    return await githubClearAndWriteFile("settings", "settings.json", JSON.stringify(get))
  } else if (setting == "AUTO_READ") {
    get.AUTO_READ = data
    config.AUTO_READ = data
    return await githubClearAndWriteFile("settings", "settings.json", JSON.stringify(get))
  } else if (setting == "ONLY_GROUP") {
    get.ONLY_GROUP = data
    config.ONLY_GROUP = data
  return await githubClearAndWriteFile("settings", "settings.json", JSON.stringify(get))
  } else if (setting == "ONLY_ME") {
    get.ONLY_ME = data
    config.ONLY_ME = data
    return await githubClearAndWriteFile("settings", "settings.json", JSON.stringify(get))
  } else if (setting == "ANTI_BAD") {
    get.ANTI_BAD = data
    config.ANTI_BAD = data
    return await githubClearAndWriteFile("settings", "settings.json", JSON.stringify(get))
  } else if (setting == "AUTO_VOICE") {
    get.AUTO_VOICE = data
    config.AUTO_VOICE = data
  return await githubClearAndWriteFile("settings", "settings.json", JSON.stringify(get))
  } else if (setting == "AUTO_MESSAGE") {
    get.AUTO_MESSAGE = data
    config.AUTO_MESSAGE = data
    return await githubClearAndWriteFile("settings", "settings.json", JSON.stringify(get))
  } else if (setting == "ANTI_LINK") {
    get.ANTI_LINK = data
    config.ANTI_LINK = data
    return await githubClearAndWriteFile("settings", "settings.json", JSON.stringify(get))
  } else if (setting == "ANTI_BOT") {
    get.ANTI_BOT = data
    config.ANTI_BOT = data
    return await githubClearAndWriteFile("settings", "settings.json", JSON.stringify(get))
  }

}

async function get(setting) {
  let get = JSON.parse(await githubGetFileContent("settings", "settings.json"))

  if (setting == "MAX_SIZE") {
    return get.MAX_SIZE
  } else if (setting == "PREFIX") {
    return get.PREFIX
  } else if (setting == "ALIVE") {
    return get.ALIVE
  } else if (setting == "FOOTER") {
    return get.FOOTER
  } else if (setting == "LOGO") {
    return get.LOGO
  } else if (setting == "STATUS_VIEW") {
    return get.STATUS_VIEW
  } else if (setting == "AUTO_STATUS_REPLY") {
    return get.AUTO_STATUS_REPLY
  } else if (setting == "ALWAYS_ONLINE") {
    return get.ALWAYS_ONLINE
  } else if (setting == "AUTO_TYPING") {
    return get.AUTO_TYPING
  } else if (setting == "AUTO_RECORDING") {
    return get.AUTO_RECORDING
  } else if (setting == "ANTI_DELETE") {
    return get.ANTI_DELETE
  } else if (setting == "AUTO_BLOCK") {
    return get.AUTO_BLOCK
  } else if (setting == "ANTI_CALL") {
    return get.ANTI_CALL
  } else if (setting == "AUTO_BIO") {
    return get.AUTO_BIO
  } else if (setting == "AUTO_REACT") {
    return get.AUTO_REACT
  } else if (setting == "AUTO_REACT") {
    return get.AUTO_REACT
  } else if (setting == "OWNER_REACT") {
    return get.OWNER_REACT
  } else if (setting == "AUTO_READ_CMD") {
    return get.AUTO_READ_CMD
  } else if (setting == "AUTO_READ") {
    return get.AUTO_READ
  } else if (setting == "ONLY_GROUP") {
    return get.ONLY_GROUP
    } else if (setting == "ONLY_ME") {
    return get.ONLY_ME
  } else if (setting == "ANTI_BAD") {
    return get.ANTI_BAD
  } else if (setting == "AUTO_VOICE") {
    return get.AUTO_VOICE
  } else if (setting == "AUTO_MESSAGE") {
    return get.AUTO_MESSAGE
  } else if (setting == "ANTI_LINK") {
    return get.ANTI_LINK
  } else if (setting == "ANTI_BOT") {
    return get.ANTI_BOT
  }

}

async function updb() {
  let get = JSON.parse(await githubGetFileContent("settings", "settings.json"))

  config.MAX_SIZE = Number(get.MAX_SIZE)
  config.PREFIX = get.PREFIX
  config.ALIVE = get.ALIVE
  config.FOOTER = get.FOOTER
  config.LOGO = get.LOGO
  config.STATUS_VIEW = get.STATUS_VIEW
  config.AUTO_STATUS_REPLY = get.AUTO_STATUS_REPLY
  config.ALWAYS_ONLINE = get.ALWAYS_ONLINE
  config.AUTO_TYPING = get.AUTO_TYPING
  config.AUTO_RECORDING = get.AUTO_RECORDING
  config.ANTI_DELETE = get.ANTI_DELETE
  config.AUTO_BLOCK = get.AUTO_BLOCK
  config.ANTI_CALL = get.ANTI_CALL
  config.AUTO_BIO = get.AUTO_BIO
  config.AUTO_REACT = get.AUTO_REACT
  config.OWNER_REACT = get.OWNER_REACT
  config.AUTO_READ_CMD = get.AUTO_READ_CMD
  config.AUTO_READ = get.AUTO_READ
  config.ONLY_GROUP = get.ONLY_GROUP
  config.ONLY_ME = get.ONLY_ME
  config.ANTI_BAD = get.ANTI_BAD
  config.AUTO_VOICE = get.AUTO_VOICE
  config.AUTO_MESSAGE = get.AUTO_MESSAGE
  config.ANTI_LINK = get.ANTI_LINK
  config.ANTI_BOT = get.ANTI_BOT
  console.log("Database writed ✅")
}

async function updfb() {
  let get = {
    MAX_SIZE: 100,
    PREFIX: '.',
    ALIVE: `default`,
    FOOTER: '©powerd by DarkMatte x ᵀᴹ',
    LOGO: `https://github.com/DARKMATTER-X-TM/DATABASE/blob/main/64lr8y68.jpg?raw=true`,
    STATUS_VIEW: false,
    AUTO_STATUS_REPLY: false,
    ALWAYS_ONLINE: false,
    AUTO_TYPING: false,
    AUTO_RECORDING: false,
    ANTI_DELETE: false,
    AUTO_BLOCK: false,
    ANTI_CALL: false,
    AUTO_BIO: false,
    AUTO_REACT: false,
    OWNER_REACT: false,
    AUTO_READ_CMD: false,
    AUTO_READ: false,
    ONLY_GROUP: false,
    ONLY_ME: false,
    ANTI_BAD: [],
    AUTO_VOICE: false,
    AUTO_MESSAGE: false,
    ANTI_LINK: [],
    ANTI_BOT: []
  }
  await githubClearAndWriteFile("settings", "settings.json", JSON.stringify(get))
  config.MAX_SIZE = 100
  config.PREFIX = '.'
  config.ALIVE = `default`
  config.FOOTER = '©powerd by DarkMatte x ᵀᴹ'
  config.LOGO = `https://github.com/DARKMATTER-X-TM/DATABASE/blob/main/64lr8y68.jpg?raw=true`
  config.ANTI_BAD = []
  config.STATUS_VIEW = false
  config.AUTO_STATUS_REPLY = false
  config.ALWAYS_ONLINE = false
  config.AUTO_TYPING = false
  config.AUTO_RECORDING = false
  config.ANTI_DELETE = false
  config.AUTO_BLOCK = false
  config.ANTI_CALL = false
  config.AUTO_BIO = false
  config.AUTO_REACT = false
  config.OWNER_REACT = false
  config.AUTO_READ_CMD = false
  config.AUTO_READ = false
  config.ONLY_GROUP = false
  config.ONLY_ME = false
  config.AUTO_VOICE = false
  config.AUTO_MESSAGE = false
  config.ANTI_LINK = []
  config.ANTI_BOT = []
  console.log("Database writed ✅")
}

module.exports = { updateCMDStore, isbtnID, getCMDStore, getCmdForCmdId, connectdb, input, get, updb, updfb }
