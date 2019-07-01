var express = require('express');
var router = express.Router();
var mysql = require('mysql');
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

function sendTokenEmail(recipientEmail, token){
    //send a token to the user
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mprlunchgroup@gmail.com',
            pass: '320king22314'
        }
    });

    var mailOptions = {
        from: 'MPR Lunch Group <mprlunchgroup@gmail.com>',
        to: recipientEmail,
        subject: 'Security Token',
        text: "Please use the following token to reset your password on the MPR lunch group website." 
        + "\n\n" + token + "\n\n" + "Regards\nMPR Lunch Group Assistant"
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
    //create a token for the user and save it to the database
    const connection = getConnection()
    connection.connect()

    const checkEmailQueryString = "SELECT emailUsers FROM users WHERE emailUsers = ?"
    connection.query(checkEmailQueryString, [req.body.emailAddress.toLowerCase().trim()], (err, rows) => {
        if(err){
            console.log("failed to query info from the database")
            res.sendStatus(500)
            connection.end();
            return
        }
        //if email found in the users table, update the token
        if(rows.length > 0){
            const userToken =  Math.floor(100000 + Math.random() * 900000)
            sendTokenEmail(req.body.emailAddress.trim(), userToken)
            const updateTokenQueryString = "UPDATE users SET tokenUsers = ? WHERE emailUsers = ?"
            connection.query(updateTokenQueryString, [userToken, req.body.emailAddress.toLowerCase().trim()], (err, rows) =>{
                if(err){
                    console.log("failed to query info from the database")
                    res.sendStatus(500)
                    return
                }
            })
            connection.end();
        }else{
            connection.end();
        }

        //if email was found in the users table, send back a message
        if(rows.length > 0){
            res.send("found")
            return
        }

        //if email was not found the users table, send back a not found message
        res.send("notFound")
    })
});

module.exports = router;