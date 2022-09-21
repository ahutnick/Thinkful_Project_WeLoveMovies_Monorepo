const moviesServices = require("./movies.services");
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
    const id = req.params.movieId;
    const movie = await moviesServices.read(id);
    if (movie) {
        res.locals.movie = movie;
        next();
    }
    next({status: 404, message: "Movie cannot be found"});
}

async function list(req, res, next) {
    const data = await moviesServices.list(req.query.is_showing);
    res.json({ data });
}

function read(req, res, next) {
    res.json({data: res.locals.movie})
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieExists), read]
}
