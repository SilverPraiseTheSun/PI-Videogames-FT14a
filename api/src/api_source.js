const fetch = require("node-fetch")
const { API_KEY } = process.env;

objCreator = (source) => {
    let genres = []
    source.genres && source.genres.forEach(e => {
        genres.push({
            id: e.id,
            name: e.name
        })
    })
    var platforms = ["no entry"]
    if(typeof source.platforms[0] == "string")
        platforms = source.platforms[0];
    else
        platforms = source.platforms.map(e => {
            return e.platform.name
        })
    return {
        id: source.id,
        name: source.name || "no entry",
        description: source.description || "no entry",
        date: source.released,
        rating: source.rating || 0,
        genres: genres,
        platforms: platforms,
        img: source.background_image
    }
}

SEARCH_ALL = (page, handler) => {
    return fetch(`https://api.rawg.io/api/games?key=${API_KEY}&&page=${page}`)
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
    SEARCH_GENRES,
    objCreator
}