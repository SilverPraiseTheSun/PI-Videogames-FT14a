import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogame } from "../store/actions/index.js";

export default function Detail({match}) {
    const detail = useSelector(state => state.detail)
    const dispatch = useDispatch()

    useEffect(() =>{
        getVideogame(match.params.id, dispatch)
    }, [])

    return (
            detail.id == match.params.id ? (
                <div>
                    <h1>{detail.name}</h1>
                    <h2>{detail.rating}</h2>
                    {detail.img && (<img src={detail.img} height="500" width="1000"/>)}
                    {detail.genres && detail.genres.map(e => (<label>{e.name}</label>))}
                    {detail.platforms && detail.platforms.map(e => (<label>{e}</label>))}
                    <label>Released: {detail.date}</label>
                    <div dangerouslySetInnerHTML={{ __html: detail.description}}/>
                </div>
            )
            : (<div>Cargando...</div>)
    )
}