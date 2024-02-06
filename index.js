/*
Below cod demostrate usage of Express pacakage with Node Js
features are like, creating server and Routing of 4 methods, GET, POST, PATCH and DELETE
Created on 6th Feb 2024 and by Madhu Kumar K S
*/
const express = require('express');
let app = express();

// Express Route = HTTP Method + URL
app.get('/',(req,res)=>{
    // we can send text or html format response with send method.
    // Note: we can't send JSON data with send method, to send JSON response
    // we should use .json() method.
    res.status(200).send('Hello From Express Get method');
})
// Creating server with port number 3000
const port = 3000;
app.listen(port, ()=>{
    console.log("Server has started");
})