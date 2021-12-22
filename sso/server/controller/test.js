yedek.js
const express = require('express')
const mysql = require('mysql');
const ejs = require('ejs');

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'users',
    multipleStatements: true
});

db.connect((err)=> {
    if(!err)
    console.log('Connection Established Successfully');
    else
    console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
});


const pageController = require('./controllers/pageController')

const port = 3010;
const app = express();

app.set("view engine","ejs")

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', pageController.getHomePage)

// create
app.post('/create', (req, res) => {
    let users = req.body;
    var sql = 'SET @username = ?; '+
    'SET @user_name = ?;'+
    'SET @user_surname = ?;'+
    'SET @user_password = ?;'+
    'SET @user_email = ?;'+
    'SET @user_type = ?;'+
    'CALL createUser(@username,@user_name,@user_surname,@user_password,@user_email,@user_type);';
    
    db.query(sql, [users.username, users.user_name, users.user_surname, users.user_password, users.user_email, users.user_type], (err, rows, fields) => {
        if (err)
            console.log(err);
    })
});

app.post('/delete', (req, res) => {
    let users = req.body;
    var sql = 'SET @id = ?; '+
    'CALL deleteUser(@id);';
    
    db.query(sql, [users.id], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('New Learner ID : '+ element[0].learner_id);
            });
        else
            console.log(err);
    })
});

app.put('/update', (req, res) => {
    let users = req.body;
    var sql = 'SET @id = ?;'+
    'SET @username = ?; '+
    'SET @user_name = ?;'+
    'SET @user_surname = ?;'+
    'SET @user_password = ?;'+
    'SET @user_email = ?;'+
    'SET @user_type = ?;'+
    'CALL updateUser(@id,@username,@user_name,@user_surname,@user_password,@user_email,@user_type);';
    
    db.query(sql, [users.id, users.username, users.user_name, users.user_surname, users.user_password, users.user_email, users.user_type], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('New Learner ID : '+ element[0].learner_id);
            });
        else
            console.log(err);
    })
});


app.listen(port, () => {
    console.log('Server Started')
    
});

