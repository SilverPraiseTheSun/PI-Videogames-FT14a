const { Router } = require('express');
const router = Router();
const { Videogame, videogames_genres, Genre } = require('../db.js');
const { Op } = require("sequelize");
const api = require("../api_source")

router.get("/:id", (req, res) => {
    api.SEARCH_GAME_ID(req.params.id, (source) => {
        if(source.hasOwnProperty("detail"))
        {
            if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(req.params.id))
                res.status(200).json("Error: Id invalido")
            else
                Videogame.findAll({
                    where: {
                        id: req.params.id
                    }
                })
                .then(game => {
                    if(game.length > 0)
                    {
                        videogames_genres.findAll({
                            where: {
                                id: req.params.id
                            }
                        })
                        .then((source) => {
                            let ids = [];
                            source.forEach(e => {
                                ids.push(source.genreid)
                            })
                            Genre.findAll({
                                where: {
                                    id: {
                                        [Op.in]: ids
                                    }
                                }
                            }).then((genres) => {
                                res.status(200).json({...source, genres: genres})
                            })
                            .catch(error => {
                                res.status(400).send(error)
                            })
                        })
                        .catch(error => {
                            res.status(400).send(error)
                        }) 
                    }
                    else
                        res.status(200).json("No se encontro ningun resultado")
                })
                .catch(error => {
                    res.status(400).send(error)
                })
        }
        else
            res.status(200).send(api.objCreator(source))
    })
    .catch(error => {
        res.status(400).send(error)
    })
})

router.post("/", (req, res) => {
    const obj = api.objCreator(req.body);
    Videogame.create(obj)
    .then((game) => {
        req.body.genres.forEach(g => {
            videogames_genres.create({videogameId: game.id, genreId: g.id})
        })
    }).then(() => {
        res.status(200).send()
    })
    .catch(error => {
        console.log(error)
        res.status(400).json(error)
    })
})

module.exports = router;