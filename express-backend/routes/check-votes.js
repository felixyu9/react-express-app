var express = require('express');
var router = express.Router();
var mysql = require('mysql');


function getConnection(){
    //create connection to the database
    const connection = mysql.createConnection({
        host: '',
        user: '',
        password: '',
        database: ''
    });

    return connection
}

function getLastSunday() {
    //get the date for last Sunday
    let lastSunday = new Date();
    lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay() - 1);
    return lastSunday;
  }

router.post('/', (req, res, next) => {
    //check if the user has voted this week by checking if his/her email in the votes table
    const connection = getConnection()
    connection.connect()

    const checkEmailQueryString = "SELECT voteremailVotes FROM votes WHERE voteremailVotes = ? AND datetimeVotes > ?"
    connection.query(checkEmailQueryString, [req.body.email.toLowerCase().trim(), getLastSunday()], (err, rows) => {
        if(err){
            console.log("failed to query info from the database")
            res.sendStatus(500)
            return
        }
        //if email found in the last week, send true
        if(rows.length > 0){
            res.send(true)
            return
        }

        //if email not found in the last week, send false
        res.send(false)
    })

    connection.end();
});

module.exports = router;