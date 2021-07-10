const fetch = require("node-fetch")
const API_KEY = "7f6a0fa5813e4efbaed93a7c8f592874";

objCreator = (source) => {
    let genres = []
    source.genres && source.genres.forEach(e => {
        genres.push({
            id: e.id,
            name: e.name
        })
    })
    
    return {
        id: source.id,
        name: source.name || "no entry",
        description: source.description || "no entry",
        date: source.released,
        rating: source.rating || 0,
        genres : genres,
        platforms: source.platforms || ["no entry"]
    }
}

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
    SEARCH_GENRES,
    objCreator
}