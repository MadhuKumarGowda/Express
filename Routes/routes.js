/*
Below code demonstrate speration of concern theory.
Separatng the routes from app.js and exporting route to other moduules
Enable express routing using Router middlewear
File cretaed on 08th Feb 2024 by Madhu Kumar KS
*/

const express = require('express');
const router = express.Router();
const movieController = require('./controllers/movieController')

router.route('/')
    .get(movieController.getAllMovies)
    .post(movieController.createMovie)


router.route('/:id')
    .get(movieController.getMovie)
    .patch(movieController.updateMovie)
  //  .delete(deleteMovie)

module.exports = router;