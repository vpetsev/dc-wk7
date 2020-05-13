const express = require('express')
const app = express()

const moviesRouter = require("./routes/movies")

const mustacheExpress = require('mustache-express')

// setting up Express to use Mustache Express as template pages 
app.engine('mustache', mustacheExpress())
// the pages are located in views directory
app.set('views', './views')
// extension will be .mustache
app.set('view engine', 'mustache')


// Creating a globally accessible variable
global.movies = []

app.use(express.urlencoded()) // for parsing form submitted data 

app.use("/movies", moviesRouter)

app.listen(3001, () => {
    console.log("server has started on http://localhost:3001")
})