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

router.get("/movies/:movieId", (req, res) => {
    const selectedMovies = movies.filter(movie => movie.title === req.params.movieId)
    res.render("movies", { listOfMovies: selectedMovies })
})

router.get("/genre/:genre", (req, res) => {
    const filteredMovies = movies.filter(movie => movie.genre === req.params.genre)
    res.render("movies", { listOfMovies: filteredMovies })
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
