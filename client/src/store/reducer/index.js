import {
    GET_SEARCH,
    GET_VIDEOGAME,
    GET_GENRES,
    POST_VIDEOGAME
} from "../actions/index.js"

const initialState = {
    search: null,
    videogames: [],
    genres: [],
    platforms: [
        "Sega", "Sega Genesis","Nintendo", "Game Boy", "Game Boy Advance",
        "Xbox", "Xbox 360", "Xbox One", "Playstation", "Playstation 2",
        "Playstation 3", "Playstation 4", "Nintendo 64", "Nintendo GameCube",
        "Nintendo Wii", "Nintendo Wii U", "Nintendo Switch", "PC", "Android", "IOS"
    ],
    detail: {}
};

const reducer = (state = initialState, action) => {
    switch(action.type)
    {
        case GET_SEARCH : return {
            ...state,
            videogames: action.payload.result || [],
            search: action.payload.search
        }
        case GET_VIDEOGAME : return {
            ...state,
            detail: action.payload
        }
        case GET_GENRES : return {
            ...state,
            genres: action.payload
        }
        case POST_VIDEOGAME : return state
        default : return state
    }
}

export default reducer;
