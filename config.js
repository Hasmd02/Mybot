/**


██╗  ██╗     █████╗     ██╗   ██╗    ██╗    ███████╗    ██╗  ██╗     █████╗     ███╗   ██╗        ███╗   ███╗    ██████╗ 
██║ ██╔╝    ██╔══██╗    ██║   ██║    ██║    ██╔════╝    ██║  ██║    ██╔══██╗    ████╗  ██║        ████╗ ████║    ██╔══██╗
█████╔╝     ███████║    ██║   ██║    ██║    ███████╗    ███████║    ███████║    ██╔██╗ ██║        ██╔████╔██║    ██║  ██║
██╔═██╗     ██╔══██║    ╚██╗ ██╔╝    ██║    ╚════██║    ██╔══██║    ██╔══██║    ██║╚██╗██║        ██║╚██╔╝██║    ██║  ██║
██║  ██╗    ██║  ██║     ╚████╔╝     ██║    ███████║    ██║  ██║    ██║  ██║    ██║ ╚████║        ██║ ╚═╝ ██║    ██████╔╝
╚═╝  ╚═╝    ╚═╝  ╚═╝      ╚═══╝      ╚═╝    ╚══════╝    ╚═╝  ╚═╝    ╚═╝  ╚═╝    ╚═╝  ╚═══╝        ╚═╝     ╚═╝    ╚═════╝ 
                                                                                                                         
                                                                                                                         
                                                                                                                         


© Project name - KAVISHAN MD
© Author - kavishanOFV*/



const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
//            ☉ Enter your GitHub account details correctly ☉
    
GITHUB_TOKEN: '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',
GITHUB_USER_NAME: 'kavishanofc',


//   ☉ Enter your session ID and mobile number to deploy the bot ☉

SESSION_ID: 'Put your session id here',
OWNER_NUMBER: '94788917991',
    ANTI_VV: "true", // ViewOnce Message retrival feature (true or false)
    // අනෙකුත් settings

};
