const express = require('express');
const connect = require('./config/db');
const router = require('./routes/user.route');
const session = require("express-session");
const passport = require('passport');
const { loaclAuth } = require('./helper/local');

const app = express();
app.use(express.json());

// passport js mate
// app.use(session({secret :"secret"}));
app.use(session({secret :"secret"}));
loaclAuth(passport)
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extended : true}));
// ejs mate ui ma print karva
app.set("view engine" ,"ejs");
app.set("views",__dirname+'/views');
app.use(express.static(__dirname+"/public"))

// router connect karva
app.use(router);



app.listen(9000 , ()=>{
    connect()
    console.log("stared listening in 8090");
})