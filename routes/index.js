const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});
router.use('/worldCupChampions', require('./worldCupChampions'));

module.exports = router;
