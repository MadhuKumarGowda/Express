/*
used mulitple middlewears
like express router and morgan to log the HTTP reqeust
File created on 08th Feb 2024 By Madhu Kumar K S
*/
const express = require('express');
const app = express();
const movieRouter = require('./Routes/routes')
const morgan = require('morgan');

app.use(morgan('combined'));
app.use('/', movieRouter)

module.exports = app;