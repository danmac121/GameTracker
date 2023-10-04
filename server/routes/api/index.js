const router = require('express').Router();
const userRoutes = require('./user-routes');
const {gameSearch} = require('./gameSearch.js');

router.use('/users', userRoutes);
router.use('/api/search', gameSearch )

module.exports = router;
