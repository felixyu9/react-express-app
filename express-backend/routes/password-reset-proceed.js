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
    //update the user's password
    const connection = getConnection()
    connection.connect()

    const resetPasswordQueryString = "UPDATE users SET pwdUsers = ? WHERE emailUsers = ?"
    const hashedPWD = bcrypt.hashSync(req.body.password.trim());
    connection.query(resetPasswordQueryString, [hashedPWD, req.body.emailAddress.toLowerCase().trim()], (err, rows) =>{
        if(err){
            console.log("failed to query info from the database")
            res.sendStatus(500)
            return
        }

        //if update is successful, send back a done message
        if(rows.affectedRows === 1){
            res.send("done")
            return
        }

        res.send("error")
    })

    connection.end();
})

module.exports = router;