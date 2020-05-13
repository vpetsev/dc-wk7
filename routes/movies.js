let express = require('express')
// Router function to initalize routing
let router = express.Router()

// TODO: api is just to print the movies array to api page


// App is now router - because we're routing information
router.post("/add-movie", (req, res)=>{
    let title = req.body.title
    let description = req.body.description
    let genre = req.body.genre
    let posterURL = req.body.posterURL
    
    console.log(title)
    console.log(genre)
    
    let movie = {
        title: title,
        description: description,
        genre: genre,
        posterURL: posterURL
    }

    movies.push(movie)

    res.render("add-movie", {title: title})
})

router.post("/delete-movie", (req, res) => {
    let title = req.body.title
    movies = movies.filter(movie => movie.title != title)
    res.redirect("/movies")
})

router.get("/movies/:movieId", (req, res)=> {
    let movieID = req.params.title
    let movies = movies.filter(movie => movie.title == movieID)
    console.log(movies)
    console.log("fired")
    res.render("movies", { listOfMovies: movies })
})

router.get("/genre/:genre", (req, res)=>{
    let genre = req.params.genre
    let movies = movies.filter(movie => movie.genre == genre)
    console.log(movies)
    console.log("fired")
    res.render("movies", { listOfMovies: movies })
})

router.get("/genre/:genre", (req, res)=>{
    let genre = req.params.genre
    movies = movies.filter(movie => movie.genre === genre)
    res.render("/genre", {listOfMovies: movies})
})

// /movies
router.get("/", (req, res) => {
    res.render('movies', { listOfMovies: movies })
})

// /moves/add-movie
router.get("/add-movie", (req, res) => {
    res.render("add-movie")
})

module.exports = router