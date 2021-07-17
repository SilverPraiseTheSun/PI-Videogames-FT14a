import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearch, getGenres } from "../store/actions/index";
import { Link } from "react-router-dom"
import Cards from "../components/Cards"
import Select from "../components/Select"

export default function Home({match}) {
    const [state, setState] = useState("")
    const [genre, setGenre] = useState("")
    const [games, setGames] = useState("")
    const [rating, setRating] = useState(false)
    const search = useSelector(state => state.search)
    const genres = useSelector(state => state.genres)
    const dispatch = useDispatch()
    
    useEffect(() =>{
        match.params.search ?
            setState(match.params.search)
        : setState("")
        
        getSearch(match.params.search, dispatch)
        getGenres(dispatch)
    },[match.params.search])

    const handleSearchChange = (e) => {
        setState(e.target.value)
    }

    const handleGenreChange = (e) => {
        setGenre(e.target.value)
    }

    const handleGameChange = (e) => {
        setGames(e.target.value)
    }

    const handleRatingChange = (e) => {
        if(e.target.value == "1-5")
            setRating(true)
        else
            setRating(false)
    }

    return (
        <div>
            <div>
                <Link to={(state == "") ?"/home":"/home/" + state}><button>Search</button></Link>
                <input onChange={handleSearchChange} name="search" value={state}/>
            </div>
            <div>
                <Select name="Genre" body={["", ...genres.map(e=>e.name)]} onChange={handleGenreChange}/>
            </div>
            <div>
                <Select name="Games" body={["", "added", "api"]} onChange={handleGameChange}/>
            </div>
            <div>
                <Select name="Rating" body={["5-1","1-5"]} onChange={handleRatingChange}/>
            </div>
            <div>
                {(match.params.search) ?
                    (match.params.search == search) ?
                        <Cards rating="true" genre={genre} games={games} rating={rating}/>
                        : (<div>Cargando...</div>)
                :
                (search == "") ?
                    <Cards rating="true" games="api" genre={genre} games={games} rating={rating}/>
                    : (<div>Cargando...</div>)}
            </div>
        </div>
    )   
}