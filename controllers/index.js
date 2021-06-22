const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const singlePostRoutes = require('./single-post');
const dashbordRoutes = require('./dashboard-routes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/post', singlePostRoutes);
router.use('/dashboard', dashbordRoutes);

module.exports = router;