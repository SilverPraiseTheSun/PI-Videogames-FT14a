const { Router } = require('express');
const { Videogame, videogames_genres, Genre } = require('../db.js');
const videogamesRouter = require('./videogames.js');
const { Op } = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const api = require("./endpoints")
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
function objCreator (source) {
    let genres = []
    source.genres.forEach(e => {
        genres.push({
            id: e.id,
            name: e.name
        })
    })
    return {
        id: source.id,
        name: source.name,
        description: source.description,
        date: source.released,
        rating: source.rating,
        genres : genres,
        platforms: source.platforms.map((e) => {
            return e.platform.name;
        })
    }
}

router.get("/videogames", (req, res) => {
    if(req.query.hasOwnProperty("name"))
        api.SEARCH_GAME_NAME(req.query.name, (source) => {
            var all = {results: []};

            for(let i = 0; i < 15 && i < source.results.length; i++)
                all.results.push(objCreator(source.results[i]))
            
            if(all.results.length < 15)
                Videogame.findAll({
                    where:{
                        name: {
                            [Op.iLike]: `%${req.query.name}%` 
                        }
                    }
                })
                .then((source)=>{
                    console.log(source)
                    let final = {...all}
                    for(let i = 0; final.results.length < 15 && i < source.length; i++)
                        final.results.push(source[i]);

                    if(final.results.length > 0)
                        res.status(200).json(final)
                    else
                        res.status(200).json("No se encotro ningun resultado para '" + req.query.name + "'")
                })
                .catch(error => {
                    res.status(400).send(error)
                })
            else
                res.status(200).json(all)
        })
        .catch(error => {
            res.status(400).send(error)
        })
    else
        api.SEARCH_ALL((source) => {
            var all = {results: []};

            for(let i = 0; i < 15 && i < source.results.length; i++)
                all.results.push(objCreator(source.results[i]))
            
                res.status(200).json(all)
        })
})


router.get("/genres", (req, res) => {
    const ressend = {results:[]};
    Genre.findAll()
    .then((source) => {
        if(source.length > 0)
        {
            ressend.results = source;
            res.status(200).json(ressend)
        }
        else
        {
            api.SEARCH_GENRES((source) => {
                source.results.forEach(e => {
                    let obj = {id: e.id, name: e.name}
                    ressend.results.push(obj)
                    Genre.create(obj)
                });
            })
            .then(() => {
                res.status(200).send(ressend)
            })
            .catch(error => {
                res.status(400).send(error)
            })
        }
    })
    .catch(error => {
        res.status(400).send(error)
    })
})

router.get("/videogame/:id", (req, res) => {
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
            res.status(200).send(objCreator(source))
    })
    .catch(error => {
        res.status(400).send(error)
    })
})

// router.post("/videogame", (req, res) => {
    
// })

module.exports = router;
