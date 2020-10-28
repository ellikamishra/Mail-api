require('dotenv').config();  //using .env content 

const express=require('express');       //variables of dependencies stored
const bodyParser=require('body-parser');
const nodemailer=require('nodemailer');
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;


const PORT=process.env.PORT||4000;   

const app=express();            //app an express instance 
app.use(bodyParser.urlencoded({  //using body parser to capture get request
    extended:false
}));

app.use(bodyParser.json());       //using json format

app.get('/',(req,res)=>{
res.send('Request message')
});

const oauth2Client=new OAuth2(     //oauth2Client created to set credentials  and use in nodemailer

    process.env.GMAIL_OAUTH_CLIENT_ID,   //client_id
    process.env.GMAIL_OAUTH_CLIENT_SECRET,  //client_secret
    "https://developers.google.com/oauthplayground"  //redirect url

);

oauth2Client.setCredentials({                     //setting credentials 
    refresh_token:process.env.GMAIL_OAUTH_REFRESH_TOKEN
});

const accessToken=oauth2Client.getAccessToken();    //access token acquired in variable as it refreshes

const transport=nodemailer.createTransport({             //create transport using nodemailer 
service:"gmail",

auth:{
    type: 'OAuth2',
	
      user: process.env.GMAIL_ADDRESS,
	
      clientId: process.env.GMAIL_OAUTH_CLIENT_ID,
	
      clientSecret: process.env.GMAIL_OAUTH_CLIENT_SECRET,
	
      refreshToken: process.env.GMAIL_OAUTH_REFRESH_TOKEN,
	
      accessToken: accessToken,
	
      expires: Number.parseInt(process.env.GMAIL_OAUTH_TOKEN_EXPIRE, 10),

}

});

app.post('/sendmail',(req,res)=>{             //post method linked to sendmail along with mailOptions specified
    


    const mailOptions={
        from:process.env.GMAIL_ADDRESS,
        to:req.body.toAddress,
        subject:req.body.subject,
        generateTextFromHTML:true,
        html:req.body.html
    };

    transport.sendMail(mailOptions,(err,res)=>{          //sendMail using transport, throw error if error occurs  
                                                            
        if(err){
            console.log(err);
        }
        else{transporter.close();
            
        }
               
    });

    res.send('Process complete');
});

app.listen(PORT,(req,res)=>{                          //app listening to port (localhost),using postman app to get and post requests
    console.log(`listening to port ${PORT}`);
})