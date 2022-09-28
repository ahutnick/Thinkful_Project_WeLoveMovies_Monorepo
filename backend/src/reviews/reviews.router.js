const router = require("express").Router()
const reviewsController = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/:review_id")
    .put(reviewsController.update)
    .delete(reviewsController.delete)
    .all(methodNotAllowed);

module.exports = router;
