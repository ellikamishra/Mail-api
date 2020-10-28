/*
token.js used to get refresh,access tokens using the client_id,client_secret along with redirect_url
and code.
Running this outputs token details on terminal.
*/

require('dotenv').config();
	
const { google } = require('googleapis');
  


  
const code = '4/0AfDhmrhysycvF0sINgaZT3zv09eSZAS88O_f3Eue0zCjiGd9GeZKlrlmddddddddw'; //replace with code generated on url by running auth.js
  

  
const oauth2Client = new google.auth.OAuth2(
  
  process.env.GMAIL_OAUTH_CLIENT_ID,
  
  process.env.GMAIL_OAUTH_CLIENT_SECRET,
  
  process.env.GMAIL_OAUTH_REDIRECT_URL,
  
);
  

  
const getToken = async () => {
  
  const { tokens } = await oauth2Client.getToken(code);
  
  console.info(tokens);
  
};
  

  
getToken();