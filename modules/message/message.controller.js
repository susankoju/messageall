const query = require('./message.query');


module.exports = {
    send: (req, res, next) => {
        query.insert(req.body)
            .then(result => {
                res.send(result);
            })
            .catch(result => {
                res.send(result);
            })
    },

    delete: (req, res, next) => {
        query.deleteById(req.params.id)
            .then(result => {
                res.send(result);
            })
            .catch(result => {
                res.send(result);
            })
    },

    receive: (req, res, next) => {
        query.selectAll()
            .then(data => {
                res.json ({
                    data: data
                })
            })
            .catch(result => {
                // res.send(result);
                res.json( {
                    data: result
                });
            })
    }
    
}