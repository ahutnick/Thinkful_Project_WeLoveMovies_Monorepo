const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at",
});

function list(is_showing = false) {
    if (is_showing) {
        return knex('movies')
            .innerJoin('movies_theaters', 'movies.movie_id', '=', 'movies_theaters.movie_id')
            .where('movies_theaters.is_showing', true)
            .distinct('movies.movie_id as id', 'movies.title', 'movies.runtime_in_minutes', 'movies.rating', 'movies.description', 'movies.image_url'); 
    }
    return knex('movies').select('movie_id as id', 'title', 'runtime_in_minutes', 'rating', 'description', 'image_url');
}

function read(movie_id) {
    return knex('movies').where("movie_id", movie_id).select('*').first();
}

function listMovieReviews(movieId) {
    return knex('reviews')
        .innerJoin('critics', 'reviews.critic_id', '=', 'critics.critic_id')
        .select(['reviews.*', 'critics.*'])
        .where('reviews.movie_id', movieId)
        .then((results) => results.map((result) => addCritic(result)));
}

module.exports = {
    list,
    read,
    listMovieReviews,
}
