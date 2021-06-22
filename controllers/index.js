const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const singlePostRoutes = require('./single-post');
const dashboardRoutes = require('./dashboard-routes');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
router.use('/post', singlePostRoutes);

module.exports = router;