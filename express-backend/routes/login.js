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
    //check login info
    const connection = getConnection()
    connection.connect()

    const userQueryString = "SELECT uidUsers, emailUsers, pwdUsers, usernameshownUsers FROM users WHERE uidUsers = ? OR emailUsers = ?"
    connection.query(userQueryString, [req.body.usernameOrEmail.toLowerCase().trim(), req.body.usernameOrEmail.toLowerCase().trim()], (err, rows) => {
        if(err){
            console.log("failed to query info from the database")
            res.sendStatus(500)
            res.send("message0")
            return
        }
        //username or email entered is not registered
        if(rows.length === 0){
            res.send("message1")
            return
        }
        

        for(let i = 0; i < rows.length; i++){
            if(bcrypt.compareSync(req.body.password.trim(), rows[i].pwdUsers)) {
                //password matched
                res.send(rows[i])
                return
            }
        }
        //password not matched. log in failed
        res.send("message3")
    })

    connection.end();
});

module.exports = router;
