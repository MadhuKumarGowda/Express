/*
Below code demonstrate handling routes in separate files and export them for consuming from other modules
Created on 08th Feb 2024 by Madhu Kumar K S
*/
const fs = require('fs');
const movies = JSON.parse(fs.readFileSync('./data/movies.json'));
let movie;


// Middlewear to validate the reqeusted id is valid or not
exports.checkID = (req,res,next,value)=>{
    console.log("movie ID", value);
    movie = movies.find((item)=>{
        item.id === value * 1;
    })
    if(!movie){
        return res.status(404).json({
            status: 'Failure',
            data: {
                message: `Movie with ID ${value} not found`            }
         })
     }
    next();
}

exports.getAllMovies = (req,res)=>{
    res.status(200).json({
        status:'success',
        requestedAt: req.requestedAt,
        count: movies.length,
        data:{
            movies: movies
        }
    });
}

exports.getMovie = (req,res)=>{
    const id = +req.params.id;
   
    if(movie){
       res.status(200).json({
           status: 'success',
           data: {
               movies: movie
           }
        })
    }
}

exports.updateMovie = (req,res)=>{
    const id = +req.params.id;
    let movieToUpdate = movies.find(item=>item.id == id)
 
    if(movieToUpdate){
     let index = movies.indexOf(movieToUpdate);
     Object.assign(movieToUpdate, req.body);
     movies[index] = movieToUpdate;
     
     fs.writeFile('./data/movies.json', JSON.stringify(movies),()=>{
      res.status(200).json({
          status: "success",
          data:{
              movie: movieToUpdate
          }
         })
     });
    }
}

exports.createMovie = (req,res)=>{
       // getting last id of an object
  const newID = movies[movies.length - 1].id + 1;

  // adding new movie object to update the local json file
  const newMovie = Object.assign({id:newID}, req.body);
  movies.push(newMovie);

  // writing new movie details to jsoon
  fs.writeFile('./data/movies.json', JSON.stringify(movies),(err)=>{
    // status 201 is for created
    res.status(201).json({
        status: "success",
        data: {
            movie: newMovie
        }
    })
  });
}

