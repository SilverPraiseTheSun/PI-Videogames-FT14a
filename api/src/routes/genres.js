const { Router } = require('express');
const { Genre } = require('../db.js');
const api = require("../endpoints")
const router = Router();

router.get("/", (req, res) => {
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

module.exports = router;