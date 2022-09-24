const moviesServices = require("./movies.services");
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function movieExists(req, res, next) {
    const id = parseInt(req.params.movieId);
    const movie = await moviesServices.read(id);
    if (movie) {
        res.locals.movie = movie;
        next();
    } else {
        next({ status: 404, message: "Movie cannot be found" });
    }
}

async function list(req, res, next) {
    const data = await moviesServices.list(req.query.is_showing);
    res.json({ data });
}

function read(req, res, next) {
    res.json({data: res.locals.movie})
}

async function listMovieReviews(req, res) {
    const data = await moviesServices.listMovieReviews(res.locals.movie.movie_id);
    res.json({ data });
}

async function listMovieTheaters(req, res) {
    const data = await moviesServices.listMovieTheaters(res.locals.movie.movie_id);
    res.json({ data });
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieExists), read],
    listMovieReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listMovieReviews)],
    listMovieTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listMovieTheaters)]
}
