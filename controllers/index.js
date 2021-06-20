const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const singlePostRoutes = require('./single-post');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/post', singlePostRoutes);

module.exports = router;