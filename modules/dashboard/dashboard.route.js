const router = require('express').Router();


router.use(function(req, res){
    res.send("Dashboard");
});

module.exports = router;