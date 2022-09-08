const express = require('express');
const route = require('./Router/SalonRouter');
const app = express();

const cors = require('cors');
const cookieParser = require('cookie-parser')
const bodyparser = require('body-parser')
//const User = require('./Models/SalonModel')
//const {auth} = require('./Middleware/auth')
require('dotenv').config()

app.use(express.json());

app.get("/", (req, res)=>{
  res.send("Hello from index.js");
})
app.use(cors());

app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cookieParser());
app.use('/', route);

app.listen(3000, (console.log("Listening Server at 3000")))