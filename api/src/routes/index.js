const { Router } = require('express');
const { Videogame, videogames_genres, Genre } = require('../db.js');
const videogamesRouter = require('./videogames.js');
const videogameRouter = require('./videogame.js');
const genresRouter = require('./genres.js');
const { Op } = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const api = require("../endpoints")
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', videogamesRouter);
router.use('/videogames', videogameRouter);
router.use('/videogames', genresRouter);

module.exports = router;
