import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearch, getGenres, setPages } from "../store/actions/index";
import { Link } from "react-router-dom"
import Cards from "../components/Cards"
import Select from "../components/Select"

export default function Home({match}) {
    const [state, setState] = useState("")
    const [page, setPage] = useState(1)
    const [genre, setGenre] = useState("")
    const [games, setGames] = useState("")
    const [rating, setRating] = useState(false)
    const search = useSelector(state => state.search)
    const maxPages = useSelector(state => state.pages)
    const videogames = useSelector(state => state.videogames)
    const genres = useSelector(state => state.genres)
    const dispatch = useDispatch()
    
    useEffect(() =>{
        match.params.search ?
            setState(match.params.search)
        : setState("")
        
        getSearch(match.params.search, dispatch)
        getGenres(dispatch)
    },[match.params.search])

    useEffect(() =>{
        setPage(1)
    }, [maxPages])

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
        e.target.value === "1-5" ?
            setRating(true)
        :
            setRating(false)
    }

    const handlePage = (e) => {
        e.target.name == "sig" ? setPage(page + 1) : setPage(page - 1)
    }

    return (
        <div>
            <div>
                <Link to={(state == "") ?"/home":"/home/" + state}><button>Search</button></Link>
                <input onChange={handleSearchChange} name="search" value={state}/>
            </div>
            <div>
                <Select key="genre" name="Genre" body={["", ...genres.map(e=>e.name)]} onChange={handleGenreChange}/>
            </div>
            <div>
                <Select key="games" name="Games" body={["", "added", "api"]} onChange={handleGameChange}/>
            </div>
            <div>
                <Select key="raiting" name="Rating" body={["5-1","1-5"]} onChange={handleRatingChange}/>
            </div>
            <div>
                {(page > 1) && <button onClick={handlePage} name="ant">anterior</button>}
                -{page}-
                {(page < maxPages) && <button onClick={handlePage} name="sig">siguiente</button>}
            </div>
            <div>
                {(match.params.search) ?
                    (match.params.search == search) ?
                        <Cards key="searchName" page={page} genre={genre} games={games} rating={rating}/>
                        : (<div>Cargando...</div>)
                :
                (search == "") ?
                    <Cards key="searchAll" page={page} genre={genre} games={games} rating={rating}/>
                    : (<div>Cargando...</div>)}
            </div>
        </div>
    )   
}