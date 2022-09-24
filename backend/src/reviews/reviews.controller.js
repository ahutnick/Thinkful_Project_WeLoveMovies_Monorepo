const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_PROPERTIES = ["score", "content"]

const hasOnlyValidProperties = (req, res, next) => {
    const data = req.body.data;
    const properties = Object.keys(data);
    const invalid = properties.filter((property) => !VALID_PROPERTIES.includes(property));
    if (invalid.length) {
        next({status: 400, message: `Invalid fields: ${invalid.join(", ")}`});
    } else {
        next();
    }
}

async function reviewExists(req, res, next) {
    const review = await reviewsService.read(req.params.review_id);
    if (review) {
        res.locals.review = review;
        next();
    } else {
        next({ status: 404, message: "Review cannot be found" });
    }
}

async function destroy(req, res, next) {
    await reviewsService.delete(res.locals.review.review_id);
    res.sendStatus(204);

}

async function update(req, res) {
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data
    }
    await reviewsService.update(updatedReview);
    const data = await reviewsService.readWithCritic(updatedReview.review_id);
    res.json({ data });
}

module.exports = {
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    update: [asyncErrorBoundary(reviewExists), hasOnlyValidProperties, asyncErrorBoundary(update)],
}
