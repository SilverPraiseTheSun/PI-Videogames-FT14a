const fetch = require("node-fetch")
const { API_KEY } = process.env;

SEARCH_ALL = (handler) => {
    return fetch(`https://api.rawg.io/api/games?key=${API_KEY}`)
    .then(r => r.json())
    .then(handler)
}

SEARCH_GAME_NAME = (name, handler) => {
    return fetch(`https://api.rawg.io/api/games?search=${name}&&key=${API_KEY}`)
    .then(r => r.json())
    .then(handler)
}

SEARCH_GAME_ID = (id, handler) => {
    return fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    .then(r => r.json())
    .then(handler)
}

SEARCH_GENRES = (handler) => {
    return fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    .then(r => r.json())
    .then(handler)
}

module.exports = {
    SEARCH_ALL,
    SEARCH_GAME_ID,
    SEARCH_GAME_NAME,
    SEARCH_GENRES
}