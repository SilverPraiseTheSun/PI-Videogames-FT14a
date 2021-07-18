import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPages } from "../store/actions";
import Card from "./Card"

export default function Cards({page, genre, rating, games}){
    const indice = page * 15;
    const [sortVideogames, setSortVideogames] = useState([])
    const videogames = useSelector(state => state.videogames)
    const dispatch = useDispatch()
    useEffect(() =>{},[sortVideogames])
    useEffect(()=>{
        let aux = videogames

        if(games != "")
        {
            switch(games)
            {
                case "added":
                    aux = aux.filter(game => {
                        if(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(game.id))
                            return true;
                        return false
                    })
                case "api": 
                    aux = aux.filter(game => {
                        if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(game.id))
                            return true;
                        return false
                    })
                default:
                    break;
            }
        }
        if(genre != "")
            aux = aux.filter(game => {
                for(let i = 0; i < game.genres.length; i++)
                {
                    if(game.genres[i].name == genre)
                        return true;
                }

                return false
            })

        aux = aux.sort((g1, g2)=> {
            return rating ? g1.rating - g2.rating : g2.rating - g1.rating
        })

        setSortVideogames(aux)
    }, [videogames, genre, rating, games])
    
    useEffect(() => {
        setPages(Math.ceil(sortVideogames.length / 15), dispatch)
    }, [sortVideogames])

    const arr = []

    for(let i = indice - 15; i < indice && i < sortVideogames.length; i++)
    {
        arr.push(<Card
            id={sortVideogames[i].id}
            name={sortVideogames[i].name}
            img={sortVideogames[i].img}
            genres={sortVideogames[i].genres}
        />)
    }

    return arr
}