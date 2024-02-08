/*
Below cod demostrate usage of Express pacakage with Node Js
features are like, creating server and Routing of 4 methods, GET, POST, PATCH and DELETE
Created on 6th Feb 2024 and by Madhu Kumar K S
*/
const fs = require('fs');
const express = require('express');
let app = express();

// cusotm middle wear 
const logger = function(req,res,next){
    console.log("Custom middlewear called");
    next();
}

// Below is the one of the middlewaer, it will modify the  
// incoming reqeust
app.use(express.json()) // this express.json() is not middlewear but it returns middlewear function
app.use(logger);

const movies = JSON.parse(fs.readFileSync('./data/movies.json'));

// Express Route = HTTP Method + URL
// app.get('/',(req,res)=>{
//     // we can send text or html format response with send method.
//     // Note: we can't send JSON data with send method, to send JSON response
//     // we should use .json() method.
//     res.status(200).send('Hello From Express Get method');
// })

// this is GET method which perform read operation of data from server
// For demo purpose, i am reading data from local json file
app.get('/api',(req,res)=>{
       res.status(200).json({
        status: "success",
        count: movies.length,
        data:{
            movies: movies
        }
       })
})

// This is GET method which perform fetch the movie of specific ID
// ID parameter submitted via URL as Route Parameter
// All Route Parameters are property of params object
app.get('/:id',(req,res)=>{
     
    // coverting from string to int
     const id = +req.params.id;
     const movie = movies.find((item)=>{
         item.id === id;
     })
     if(movie){
        res.status(200).json({
            status: 'success',
            data: {
                movies: movie
            }
         })
     }else{
        res.status(404).json({
            status: 'Failure',
            data: {
                message: `Movie with ID ${id} not found`            }
         })
     }
     
})

// PUT Method Demonstarte
// Need to send complete object body to update the data.
app.put("/:id",(req,res)=>{
   

   
})

// Patch Method Demonstarte
// Need to send partial data which to be updated.
app.patch("/:id",(req,res)=>{
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
   }else{
    res.status(404).json({
        status: "Fail",
        data:{
            message: `Movie with ID ${id} not found` 
        }
       })
   }
   
})


// this is POST method which perform write operation to the server / database
// For demo purpose, i am adding new data via postman to writing to local json file
app.post('/', (req,res)=>{

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
  // res.send("Data Created");
})



// Creating server with port number 3000
const port = 3000;
app.listen(port, ()=>{
    console.log("Server has started");
})