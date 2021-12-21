const express = require('express')
const cors = require('cors');
// DB Connection
require('./config/databaseConfig')

const ssoRoute = require("./route/ssoRoute");

// Express Start
const app = express();

// Middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors());


// Routes
app.use("/", ssoRoute);

// App Start
const port = 3010;
app.listen(port, () => {
    console.log('Server Started')
});
