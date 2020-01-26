const jwt = require('jsonwebtoken');
const jwtSecret = require('../configs/index').jwtSecret;


module.exports = (req, res, next) => {
    let token;


    if (req.headers['x-acces-token']) {
        token = req.headers['x-access-token'];
    }
    if (req.headers['authorization']) {
        token = req.headers['authorization'];
    }
    if (req.headers['token']) {
        token = req.headers['token'];
    }
    if (req.query['token']) {
        token = req.query['token'];
    }

    if (!token && req.body.headers.token) {
        token = req.body.headers.token;
    }

    if (token) {

        jwt.verify(token, jwtSecret, (err, decoded) => {
            if(err) 
            {
                console.log("Invalid token");
                next({
                    msg: "Login expired!"
                });
            } else {
                require('../modules/user/user.query').selectByEmail(decoded.email)
                    .then(user => {
                        req.body.user = user[0];
                        next();
                    })
                    .catch(err => {
                        next({
                            err: "User not active!"
                        })
                    });
            }
        })
        
    } else {
        next({
            msg: "Please login to join!"
        });
    }
}