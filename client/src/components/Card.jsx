import { Link } from "react-router-dom"
export default function Card({id, name, img, genres}){
    return (
        <ul>
            <li><img src={img} height="120" width="200"/></li>
            <li><Link to={"/videogame/game="+id}>{name}</Link></li>
            <li>{genres.map(e => e.name + " ")}</li>
        </ul>
    )
}