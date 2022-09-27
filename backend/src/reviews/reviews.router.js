const router = require("express").Router()
const reviewsController = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

const corsDelete = cors({methods: "DELETE"});
const corsPut = cors({methods: "PUT"});

router.route("/:review_id")
    .put(corsPut, reviewsController.update)
    .options(corsPut)
    .delete(corsDelete, reviewsController.delete)
    .options(corsDelete)
    .all(methodNotAllowed);

module.exports = router;
