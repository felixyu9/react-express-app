var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
const nodemailer = require('nodemailer');

function getConnection(){
    //create a connection to the database
    const connection = mysql.createConnection({
        host: '',
        user: '',
        password: '',
        database: ''
    });

    return connection
}

function sendConfirmationEmail(recipientName, recipientEmail){
    //send a confirmation email to the user after registration is complete
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mprlunchgroup@gmail.com',
            pass: '320king22314'
        }
    });

    const link = "http://mprlunchgroupweb.s3-website.us-east-2.amazonaws.com"

    var mailOptions = {
        from: 'MPR Lunch Group <mprlunchgroup@gmail.com>',
        to: recipientEmail,
        subject: 'MPR Lunch Group Account Created',
        text: "Hi " + recipientName + ",\n\n" + "You just created an account on the MPR lunch group website. Please use the link below to sign in and vote. If you did not sign up on the website, please contact Felix." 
        + "\n\n" + link + "\n\n" + "Regards\nMPR Lunch Group Assistant"
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

router.post('/', (req, res, next) => {
    //create a new acount if the user is a member and he/she doesnt have an account already
    const connection = getConnection()
    connection.connect()

    const checkSignupTokenQueryString = "SELECT tokenMembers FROM members WHERE emailMembers = ?"
        connection.query(checkSignupTokenQueryString, [req.body.emailAddress.toLowerCase().trim()], (err, rows) =>{
            if(err){
                console.log("failed to query info from the database")
                res.sendStatus(500)
                connection.end()
                return
            }
    
            //if token matched, send a matched message and return
            if(rows[0].tokenMembers.toString(10) !== req.body.token.trim()){
                res.send("message1")
                connection.end()
                return
            }
            
            const insertQueryString = "INSERT INTO users(uidUsers, emailUsers, pwdUsers, usernameshownUsers, tokenUsers) VALUES(?, ?, ?, ?, ?)"
            const hashedPWD = bcrypt.hashSync(req.body.password.trim());
            const userToken =  Math.floor(100000 + Math.random() * 900000)
            connection.query(insertQueryString, [req.body.username.toLowerCase().trim(), req.body.emailAddress.toLowerCase().trim(), hashedPWD, req.body.username.trim(), userToken], (err, results) =>{
                if(err){
                    console.log("failed to query info from the database")
                    res.sendStatus(500)
                    res.send("message0")
                    return
                }
                //new user was created
                sendConfirmationEmail(req.body.username.trim(), req.body.emailAddress.toLowerCase().trim())
                res.send("message2")
    
            })
            connection.end()

        })
});

module.exports = router;