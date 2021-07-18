const fetch = require("node-fetch")
const { API_KEY } = process.env;

objCreator = (source) => {
    let genres = source.genres ? source.genres.map(e => {
        console.log(source.genres)
        return {
            id: e.id,
            name: e.name
        }
    }) : []

    var platforms = source.platforms ? source.platforms.map(e => {
        return e.name
    }) : ["no entry"]
        
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
    return fetch(`https://api.rawg.io/api/games?key=${API_KEY}&&page=${page}&&page_size=40`)
    .then(r => r.json())
    .then(handler)
}

SEARCH_GAME_NAME = (page, name, handler) => {
    return fetch(`https://api.rawg.io/api/games?search=${name}&&key=${API_KEY}&&page=${page}&&page_size=40`)
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