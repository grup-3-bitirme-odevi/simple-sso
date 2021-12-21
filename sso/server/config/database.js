const mysql = require('mysql');

// MySQL Connection String
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'users',
    multipleStatements: true
});

// MySQL Connection
exports.connect = () => {
    db.connect((err)=> {
        if(!err)
        console.log('Connection Established Successfully');
        else
        console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
    });
}
