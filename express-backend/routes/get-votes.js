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
    //get last Sunday's date
    let lastSunday = new Date();
    lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay() - 1);
    return lastSunday;
}

function getTwoSundaysAgo() {
    //get the date for two Sundays ago
    let twoSundaysAgo = new Date();
    twoSundaysAgo.setDate(twoSundaysAgo.getDate() - twoSundaysAgo.getDay() - 8);
    return twoSundaysAgo;
}

router.get('/', (req, res) => {
    //if this week has votes, return this weeks results. otherwise, return last week's results
    const connection = getConnection()
    connection.connect()

    const queryString = "SELECT idVotes, choiceVotes, voterVotes FROM votes WHERE datetimeVotes > ?"
    const lastSunday = getLastSunday()
    connection.query(queryString, [lastSunday], (err, rows, fields) => {
        if(err){
            connection.end();
            console.log("failed to query info from the database")
            res.sendStatus(500)
            connection.end();
            return
        }
        if(rows.length > 0){
            //return this week's result
            res.json(rows)
            connection.end();
        }else{
            const twoSundaysAgo = getTwoSundaysAgo()
            connection.query(queryString, [twoSundaysAgo], (err, rows, fields) =>{
                //return last week's result
                if(err){
                    console.log("failed to query info from the database")
                    res.sendStatus(500)
                    return
                }

                res.json(rows)
            })
            connection.end();
        }
        
    })

});

module.exports = router;
