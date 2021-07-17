import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "./Card"

export default function Cards({genre, rating, games}){
    const [sortVideogames, setSortVideogames] = useState([])
    const videogames = useSelector(state => state.videogames)

    useEffect(()=>{
        let aux = videogames

        if(games != "")
        {
            switch(games)
            {
                case "added":
                    aux = aux.filter(game => {
                        if(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(game.id))
                            return game;
                    })
                case "api": 
                    aux = aux.filter(game => {
                        if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(game.id))
                            return game;
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
                        return game;
                }
            })
        aux = aux.sort((g1, g2)=> {
            return rating ? g1.rating - g2.rating : g2.rating - g1.rating
        })

        setSortVideogames(aux)
    }, [videogames, genre, rating, games])

    return (
        sortVideogames && sortVideogames.map(game => 
            <Card
                id={game.id}
                name={game.name}
                img={game.img}
                genres={game.genres}
                key={game.id}
            />)
    )
}