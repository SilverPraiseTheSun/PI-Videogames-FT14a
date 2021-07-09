const { Router } = require('express');
const { Videogame, Genre } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const api = require("./endpoints")
const router = Router();

router.get("/videogames", (req, res) => {
    var count = 0;
    console.log("pasamo el router 1 papu")
    const filter = (() => {
        objCreator = function(source) {
            return {
                id: source.id,
                name: source.name,
                description: source.description,
                date: source.released,
                rating: source.rating,
                platforms: source.platforms.map((e) => {
                    return e.platform.name;
                })
            }
        }
        
        if(req.query.hasOwnProperty("name"))
            return function (source) {
                if(source.name.search(req.query.name) >= 0)
                    return objCreator(source);
            }
        else
            return function (source) {
                return objCreator(source);
            }
    })()
    console.log("pasamo el router 2 papu")

    const all = fetch(`https://api.rawg.io/api/games?key=${API_KEY}`)
    .then(r => r.json())
    .then((source) => {
        count++;
        console.log("pasamo el fetch papu")
        if(count <= 15)
            return filter(source);
    })

    return res.status(200).json(all);
})

module.exports = router;