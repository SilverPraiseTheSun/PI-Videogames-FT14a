const { Router } = require('express');
const router = Router();
const { Videogame } = require('../db.js');
const { Op } = require("sequelize");
const api = require("../api_source")

router.get("/", (req, res) => {
    if(req.query.hasOwnProperty("name"))
        api.SEARCH_GAME_NAME(1, req.query.name, source => {
            return api.SEARCH_GAME_NAME(2, req.query.name, source2 => {
                return api.SEARCH_GAME_NAME(3, req.query.name, source3 => {
                    return {
                        ...source, 
                        results: [...source.results, ...source2.results, ...source3.results] 
                    }
                })    
            })
        })
        .then((source) => {
            var all = {results: []};

            for(let i = 0; i < source.results.length; i++)
                all.results.push(api.objCreator(source.results[i]))
            
            if(all.results.length < 120)
                Videogame.findAll({
                    where:{
                        name: {
                            [Op.iLike]: `%${req.query.name}%` 
                        }
                    },
                    limit: 100
                })
                .then((games)=>{
                    for(let i = 0; i < games.length; i++)
                        all.results.push(games[i]);

                    if(all.results.length > 0)
                        res.status(200).send(all)
                    else
                        res.status(200).send("No se encotro ningun resultado para '" + req.query.name + "'")
                })
                .catch(error => {
                    res.status(400).send(error)
                })
            else
                res.status(200).send(all)
        })
        .catch(error => {
            res.status(400).send(error)
        })
    else
        api.SEARCH_ALL(1, source => {
            return api.SEARCH_ALL(2, source2 => {
                return api.SEARCH_ALL(3, source3 => {
                    return {
                        ...source, 
                        results: [...source.results, ...source2.results, ...source3.results] 
                    }
                })    
            })
        })
        .then((source) => {
            var all = {results: []};

            for(let i = 0; i < source.results.length; i++)
                all.results.push(api.objCreator(source.results[i]))
            
            console.log()
            res.status(200).send(all)
        })
})

module.exports = router;