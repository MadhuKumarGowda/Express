/*
Below code demonstrate speration of concern theory.
Separatng the routes from app.js and exporting route to other moduules
Enable express routing using Router middlewear
File cretaed on 08th Feb 2024 by Madhu Kumar KS
*/

const express = require('express');
const movieController = require('../controllers/movieController')
const router = express.Router();


// param is another middlewear 
// which only runs on routing with parameter with request
// Value is stored the param valud of ID which sent by user
router.param('id',movieController.checkID)

router.route('/')
    .get(movieController.getAllMovies)
    .post(movieController.validateBody, movieController.createMovie)


router.route('/:id')
    .get(movieController.getMovie)
    .patch(movieController.updateMovie)
  //  .delete(deleteMovie)

module.exports = router;