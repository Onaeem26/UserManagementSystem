const express = require("express")
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mysql = require('mysql')

require('dotenv').config();

const app = express(); 
const port = process.env.PORT || 8080

//Parsing middleware
app.use(bodyParser.urlencoded({extended: false}))

//parsing application json 
app.use(bodyParser.json())

//static files 
app.use(express.static('public'))

//Templating Engine 
app.engine('hbs', exphbs.engine( {extname: '.hbs'} ));
app.set('view engine', 'hbs')

//Connection pool
const pool = mysql.createPool({
    connectionLimit     : 100,
    host                : 'localhost', 
    user                : 'root',
    database            : '',
    password            : ''        
});

//connect to DB
pool.getConnection((err, connection) => {
    if (err) throw err; // not connected 
    console.log(`Connected as ID ` + connection.threadId)
})
//Router


const routes = require('./server/routes/user')
app.use('/',routes)


app.listen(port, () => console.log(`Listening on port ${port}`));