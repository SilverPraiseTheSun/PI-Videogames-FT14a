import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postVideogame, getGenres } from "../store/actions/index";
import CheckBox from "../components/CheckBox";

export default function Create(){
    const dispatch = useDispatch();
    const [post, setPost] = useState({
        name: "",
        description: "",
        date: "",
        rating: "",
        genres: [],
        platforms: []
    })
    const [arrGenres, setGenres] = useState([])
    const [arrPlatforms, setPlatforms] = useState([
        {id: 1, value: "Sega", isCheked: false}, {id: 2, value:"Sega Genesis", isCheked: false},{id: 3, value:"Nintendo", isCheked: false}, 
        {id: 4, value:"Game Boy", isCheked: false}, {id: 5, value:"Game Boy Advance", isCheked: false},
        {id: 6, value:"Xbox", isCheked: false}, {id: 7, value:"Xbox 360", isCheked: false}, {id: 8, value:"Xbox One", isCheked: false}, 
        {id: 9, value:"Playstation", isCheked: false}, {id: 10, value:"Playstation 2", isCheked: false},
        {id: 11, value:"Playstation 3", isCheked: false},{id: 12, value: "Playstation 4", isCheked: false}, 
        {id: 13, value:"Nintendo 64", isCheked: false}, {id: 14, value:"Nintendo GameCube", isCheked: false},
        {id: 15, value:"Nintendo Wii", isCheked: false}, {id: 16, value:"Nintendo Wii U", isCheked: false}, 
        {id: 17, value:"Nintendo Switch", isCheked: false}, {id: 18, value:"PC", isCheked: false}, 
        {id: 19, value:"Android", isCheked: false}, {id: 20, value:"IOS", isCheked: false}
    ])
    const genres = useSelector(state => state.genres)

    useEffect(() => {
        getGenres(dispatch)
    },[])

    useEffect(() => {
        setGenres(genres.map(e => {
            return {id: e.id, value: e.name, isCheked: false}
        }))
    },[genres])

    const handleGenresClick = (e) => {
        let arr = arrGenres
        arr = arr.map(genre => (genre.value == e.target.value) ? {...genre, isCheked: e.target.checked} : genre)

        setGenres(arr)
    }

    const handleChange = (e) => {
        let obj = post;
        obj[e.target.name] = e.target.value
        setPost(obj)
    }
    
    const handlePlatformsClick = (e) => {
        let arr = arrPlatforms
        
        arr = arr.map(platform => (platform.value == e.target.value) ? {...platform, isCheked: e.target.checked} : platform)

        setPlatforms(arr)
    } 

    return (
        <div>
            <h1>Add New Videogame</h1>
            <form>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" onChange={handleChange}/>
                </div> 
                <div>
                    <label>Description</label>
                    <input type="text" name="description" onChange={handleChange}/>
                </div>
                <div>
                    <label>Rating</label>
                    <input type="number" name="rating" onChange={handleChange}/>
                </div>
                <div>
                    <label>Genres</label>
                    <ul>
                        {arrGenres.map(genre => (
                            <CheckBox key={genre.id} handleCheck={handleGenresClick} {...genre}/>
                        ))}
                    </ul>
                </div>
                <div>
                    <label>Platforms</label>
                    <ul>
                        {arrPlatforms.map(platform => (
                            <CheckBox key={platform.id} handleCheck={handlePlatformsClick} {...platform}/>
                        ))}
                    </ul>
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}