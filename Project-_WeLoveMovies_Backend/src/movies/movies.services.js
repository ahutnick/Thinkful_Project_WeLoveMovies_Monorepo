const knex = require("../db/connection");

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
    return knex('movies').where({ movie_id }).select('*').first();
}

module.exports = {
    list,
    read
}
