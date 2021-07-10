const { Router } = require('express');
const { Videogame } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const api = require("../endpoints")
const router = Router();

router.get("/", (req, res) => {
    if(req.query.hasOwnProperty("name"))
        api.SEARCH_GAME_NAME(req.query.name, (source) => {
            var all = {results: []};

            for(let i = 0; i < 15 && i < source.results.length; i++)
                all.results.push(api.objCreator(source.results[i]))
            
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
                all.results.push(api.objCreator(source.results[i]))
            
                res.status(200).json(all)
        })
})

module.exports = router;