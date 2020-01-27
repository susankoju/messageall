const query = require('./user.query');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../../configs/index').jwtSecret;
const {userSigninValid, userSignupValid} = require('../../libs/validator');

module.exports = {
    signup: (req, res, next) => {
        userSignupValid(req.body)
            .then(result => {

                bcrypt.hash(req.body.password, 10)
                    .then((hash) => {
                        const data = {
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            address: req.body.address,
                            contact: req.body.contact,
                            email: req.body.email,
                            password: hash,
                            image: req.body.image,
                            role: 'member'
                        }
                        query.insert(data)
                            .then((result) => {
                                res.send(result);
                            })
                            .catch((err) => {
                                next({
                                    err: err
                                })
                            })
                    })
                    .catch((err) => {
                        next({ err: err })
                    })

            })
            .catch(error => {
                next({
                    err: error
                })
            })

    },
    profile: (req, res, next) => {
        query.selectById(req.params.id)
        .then(result => {
            res.json({
                profile: result[0]
            });
        })
        .catch((err) => {
            next({
                err: err
            });
        })
    },

    signin : (req, res, next) => {
        userSigninValid({'email': req.body.email, 'password': req.body.password})
            .then(result => {
                query.selectByEmail(req.body.email)
                    .then(result => {

                        bcrypt.compare(req.body.password, result[0].password, (err, match) => {

                            if (err) res.send(err);
                            else if (match) {
                                res.json({
                                    'token': jwt.sign({ 'email': req.body.email }, jwtSecret),
                                    'id': result[0].id,
                                    'firstName': result[0].firstName,
                                    'lastName': result[0].lastName,
                                });
                            }
                            else {
                                next({
                                    err: "Wrong Username or Password!"
                                });
                            }
                        })
                    })
                    .catch((err) => {
                        next({
                            err: err
                        });
                    })
            })
            .catch(error => {
                next({
                    err: error
                })
            })


    },

    patch: (req, res, next) => {
        let id = req.body.user.id;
        bcrypt.hash(req.body.data, 10)
            .then(hash => {
                query.update(id, "password = '" + hash + "'")
                    .then(() => {
                        res.json({
                            msg: "Password changed successfully!"
                        })
                    })
                    .catch(err => {
                        next({
                            err: err
                        })
                    })
            })
            .catch(err => {
                next({
                    err: err
                })
            })

    },

    put: (req, res, next) => {
        let id = req.body.user.id;
        console.log(req.body.data);
        query.update(id, `firstName = '${req.body.data.firstName}', lastName= '${req.body.data.lastName}', address= '${req.body.data.address}', email= '${req.body.data.email}' `)
            .then(() => {
                res.json({
                    msg: "profile updated successfully!"
                })
            })
            .catch(err => {
                console.log(err);
                next({
                    err: err
                })
            })
    },
    
}