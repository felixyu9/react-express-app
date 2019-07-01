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

function sendConfirmationEmail(recipientName, recipientEmail, token){
    //send a confirmation email to the user after registration is complete
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
        subject: 'MPR Lunch Group Registration Code',
        text: "Hi " + recipientName + ",\n\n" + "Please use the following security code to complete the registration. If you did not sign up on the website, please contact Alec." 
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
    //create a new acount if the user is a member and he/she doesnt have an account already
    const connection = getConnection()
    connection.connect()

    const memberQueryString = "SELECT emailMembers FROM members WHERE emailMembers = ?"
    connection.query(memberQueryString, [req.body.emailAddress.toLowerCase().trim()], (err, rows) => {
        if(err){
            console.log("failed to query info from the database")
            res.sendStatus(500)
            res.send("message0")
            connection.end();
            return
        }

        //not a member
        if(rows.length === 0){
            res.send("message1")
            connection.end();
            return
        }

        const existingUsernameQueryString = "SELECT uidUsers from users WHERE uidUsers = ?"
        connection.query(existingUsernameQueryString, [req.body.username.toLowerCase().trim()], (err, rows) =>{
            if(err){
                console.log("failed to query info from the database")
                res.sendStatus(500)
                res.send("message0")
                connection.end();
                return
            }
            //username is already taken
            if(rows.length > 0){
                res.send("message2")
                connection.end();
                return
            }

            const existingEmailQueryString = "SELECT emailUsers from users WHERE emailUsers = ?"
            connection.query(existingEmailQueryString, [req.body.emailAddress.toLowerCase().trim()], (err, rows) =>{
                if(err){
                    console.log("failed to query info from the database")
                    res.sendStatus(500)
                    res.send("message0")
                    connection.end();
                    return
                }
                //email is already registered
                if(rows.length > 0){
                    res.send("message3")
                    connection.end();
                    return
                }

                const insertQueryString = "UPDATE members SET tokenMembers = ? WHERE emailMembers = ?"
                const memberToken =  Math.floor(100000 + Math.random() * 900000)
                connection.query(insertQueryString, [memberToken, req.body.emailAddress.toLowerCase().trim()], (err, results) =>{
                    if(err){
                        console.log("failed to query info from the database")
                        res.sendStatus(500)
                        res.send("message0")
                        return
                    }
                    
                    sendConfirmationEmail(req.body.username.trim(), req.body.emailAddress.toLowerCase().trim(), memberToken)
                    res.send("message4")
                })
                connection.end();   
            })
        })
    })
});

module.exports = router;
