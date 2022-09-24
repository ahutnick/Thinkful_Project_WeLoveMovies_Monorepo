const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});


function read(reviewId) {
    return knex("reviews").select("*").where("review_id", reviewId).first();
}

function destroy(reviewId) {
    return knex("reviews").where("review_id", reviewId).del();
}

function update(updatedReview) {
    return knex("reviews")
        .select("*")
        .where("review_id", updatedReview.review_id)
        .update(updatedReview, "*");
}

function readWithCritic(reviewId) {
    return knex("reviews")
        .innerJoin("critics", "reviews.critic_id", "=", "critics.critic_id")
        .select("reviews.*", "critics.*")
        .where("reviews.review_id", reviewId)
        .first()
        .then(addCritic);
}

module.exports = {
    read,
    delete: destroy,
    update,
    readWithCritic
}
