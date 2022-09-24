const router = require("express").Router();
const moviesController = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/:movieId/theaters")
    .get(moviesController.listMovieTheaters)
    .all(methodNotAllowed);

router.route("/:movieId/reviews")
    .get(moviesController.listMovieReviews)
    .all(methodNotAllowed);

router.route("/:movieId")
    .get(moviesController.read)
    .all(methodNotAllowed);

router.route("/")
    .get(moviesController.list)
    .all(methodNotAllowed);

module.exports = router;
