var express = require('express');
var PORT = require('./../configs/index').port;

app = express();


module.exports = {
    listen : (port) => {
        app.listen(port || PORT, function () {
            console.log("Server listening at port ", port || PORT);
        })
    },
    use : ( parm) => {
        app.use( parm)
    }
};