export const GET_SEARCH = "get_search"
export const GET_VIDEOGAME = "get_videogame"
export const POST_VIDEOGAME = "post_videogame"
export const GET_GENRES = "get_genres"

export const getSearch = (name = null, dispatch) => {
    if(name)
        fetch(`http://localhost:3000/videogames?name=${name}`)
        .then(j => j.json())
        .then(source => {
            dispatch({
                type: GET_SEARCH,
                payload: {
                    result: source.results,
                    search: name
                }
            })
        })
    else
        fetch("http://localhost:3000/videogames")
        .then(j => j.json())
        .then(source => {
            dispatch({
                type: GET_SEARCH,
                payload: {
                    result: source.results,
                    search: ""
                }
            })
        })
}

export const getVideogame = (id, dispatch) => {
    fetch(`http://localhost:3000/videogame/` + id)
    .then(j => j.json())
    .then(source => {
        dispatch({
            type: GET_VIDEOGAME,
            payload: source
        })
    })
}

export const getGenres = (dispatch) => {
    fetch("http://localhost:3000/genres")
    .then(j => j.json())
    .then(source => {
        dispatch({
            type: GET_GENRES,
            payload: source.results
        })
    })
}

export const postVideogame = (params, dispatch) => {
    fetch(`http://localhost:3000/videogame`,{
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(params)
    })
    .then(j => j.json())
    .then(source => {
        dispatch({
            type: POST_VIDEOGAME,
            payload: source.results
        })
    })
}