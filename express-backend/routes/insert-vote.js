var express = require('express');
var router = express.Router();
var mysql = require('mysql');


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
    //insert the votes to the database
    const connection = getConnection()
    connection.connect()

    const insertVoteQueryString = "INSERT INTO votes(voterVotes, voteremailVotes, choiceVotes, datetimeVotes) VALUES(?, ?, ?, ?)"
    connection.query(insertVoteQueryString, [req.body.theVoter, req.body.theEmail.toLowerCase().trim(), req.body.theChoice.trim(), new Date()], (err, rows) => {
        if(err){
            console.log("failed to query info from the database")
            res.sendStatus(500)
            return
        }

        res.send("insertion done")
        
    })

    connection.end();
});

module.exports = router;