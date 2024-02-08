/*
 This program demostrate implementation of 3rd Party middlewear
 i have taken morgan package to demonstrate
 File created on 08th Feb 2024 By Madhu Kumar K S
*/

const express = require('express');
const app = express();
// HTTP reqeust logger for nodeJS
const morgan = require('morgan');
const fs = require('fs');

app.use(express.json());
app.use(morgan('combined'));


// Creating server with port number 3000
const port = 3000;
app.listen(port, ()=>{
    console.log("Server has started");
})

