/*
Entry point of node application
 File created on 08th Feb 2024 By Madhu Kumar K S
*/
const app = require('./app');

const port = 3000;
app.listen(port, ()=>{
    console.log("Server Started");
})