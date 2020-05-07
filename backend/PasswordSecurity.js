const bcrypt = require("bcrypt");
const router = express.Router
const saltRounds = 10;
const mongoose = require('mongoose');

//
// const express = require('express')
// const app = express()
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

//var user = require('./models/User')

//test get api
app.get('/api/users', (req, res) => {

 // let res = await user.find()
 let res = users
  res = await res.json()
});

app.get('/api/elefant', (req,res) => res.json({elefant: true}))

//api för registrering
app.post("/auth/register", (req, res, next) => {
  console.log('backend')
  bcrypt.hash(req.body.password, req.body.salt, function (err, hash) {
    console.log("hash ", hash)
    // Store hash in database
  });

  });

  // bcrypt.compare(req.body.password, hash, function (err, res) {
  //   if (res) {
  //     console.log("passwords match")
  //     // Passwords match
  //   } else {
  //     console.log("passwords don't match")
  //     // Passwords don't match
  //   }
  // });


module.exports = app; 
