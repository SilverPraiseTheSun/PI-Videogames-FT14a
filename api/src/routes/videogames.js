const { Router } = require('express');
const router = Router();
const { Videogame } = require('../db.js');
const { Op } = require("sequelize");
const api = require("../api_source")

router.get("/", (req, res) => {
    if(req.query.hasOwnProperty("name"))
        api.SEARCH_GAME_NAME(req.query.name, req.query.page || 1, (source) => {
            var all = {results: []};

            for(let i = 0; i < 100 && i < source.results.length; i++)
                all.results.push(api.objCreator(source.results[i]))
            
            if(all.results.length < 100)
                Videogame.findAll({
                    where:{
                        name: {
                            [Op.iLike]: `%${req.query.name}%` 
                        }
                    },
                    limit: 100
                })
                .then((games)=>{
                    for(let i = 0; all.results.length < 100 && i < games.length; i++)
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
        api.SEARCH_ALL(req.query.page || 1, (source) => {
            var all = {results: []};

            for(let i = 0; i < 100 && i < source.results.length; i++)
                all.results.push(api.objCreator(source.results[i]))
            
                res.status(200).send(all)
        })
})

module.exports = router;