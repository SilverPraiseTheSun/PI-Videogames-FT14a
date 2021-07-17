const { Router } = require('express');
const videogamesRouter = require('./videogames.js');
const videogameRouter = require('./videogame.js');
const genresRouter = require('./genres.js');
const router = Router();

router.use('/videogames', videogamesRouter);
router.use('/videogame', videogameRouter);
router.use('/genres', genresRouter);

module.exports = router;
