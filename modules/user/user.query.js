const mysql = require('mysql');

const conn = mysql.createConnection(
    require('./../../configs/db.config'), 
);
conn.connect( (err) => {
    if(err) throw err;
    console.log('Database connected');
});

const insert = (data) => {
    console.log(conn);
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO user(firstName, lastName, address, contact, email, password, image, role) VALUES('${data.firstName}', '${data.lastName}', '${data.address}', '${data.contact}', '${data.email}', '${data.password}', '${data.image}', '${data.role}')`, 
        (err, rows, fields) => {
            // console.log("here");
            if(err) reject(err);
            resolve(rows);
        })
    })
}

const selectByEmail = (email) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM user WHERE email = '${email}'`, (err, rows, fields) => {
            if (err) reject(err);
            if (rows.length < 1) reject("Wrong Username or Password!");
            resolve(rows);
        });
    })
}

const selectById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM user WHERE id = '${id}'`, (err, rows, fields) => {
            if (err) reject(err);
            if (rows.length < 1) reject("Error no user!");
            resolve(rows);
        });
    })
}


const selectAll = () => {
    return new Promise((resolve, reject) => {
        console.log(id);
        conn.query(`SELECT * FROM user WHERE 1`, (err, rows, fields) => {
            if (err) reject(err);
            if (rows.length < 1) reject("Error! No user found!");
            resolve(rows);
        });
    })
}

const update = (id, updateString) => {
    return new Promise((resolve, reject) => {
        conn.query(`UPDATE user SET ${updateString} WHERE id = ${id}`, (err, rows, fields) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else resolve(rows);
        })
    })
}

module.exports = {
    insert,
    selectByEmail,
    selectById,
    selectAll,
    update,
}