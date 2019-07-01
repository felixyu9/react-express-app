var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');

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


router.post('/', (req, res, next) => {
    //if the token entered is correct, update the user's password
    const connection = getConnection()
    connection.connect()

    const checkTokenQueryString = "SELECT tokenUsers FROM users WHERE emailUsers = ?"
    connection.query(checkTokenQueryString, [req.body.emailAddress.toLowerCase().trim()], (err, rows) =>{
        if(err){
            console.log("failed to query info from the database")
            res.sendStatus(500)
            return
        }

        //if token matched, send a matched message and return
        if(rows[0].tokenUsers.toString(10) === req.body.token.trim()){
            res.send("matched")
            return
        }

        res.send("notMatched")
    })

    connection.end();
})

module.exports = router;