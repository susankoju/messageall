const mysql = require('mysql');

const conn = mysql.createConnection(
    require('./../../configs/db.config'), 
);
conn.connect( (err) => {
    if(err) throw err;
    console.log('Database connected');
});


const insert = (data) => {
    console.log(data);
    
    return new Promise((resolve, reject) => {

        conn.query(`INSERT INTO message(senderId, text, receiverId, status) VALUES('${data.user.id}','${data.text}',NULL,'unread')`,
            (err, rows, fields) => {

                if (err) reject(err);
                resolve(rows);
            })
    })
}

const deleteById = (id) => {
    return new Promise((resolve, reject) => {

        conn.query(`DELETE FROM message WHERE id ='${id}'`,
            (err, rows, fields) => {
                if (err) reject(err);
                resolve(rows);
            })
    })
}

const selectById = (id) => {
    return new Promise((resolve, reject) => {
        console.log(id);
        conn.query(`SELECT * FROM message WHERE id = '${id}'`, (err, rows, fields) => {
            if (err) reject(err);
            if (rows.length < 1) reject("Error no message!");
            resolve(rows);
            console.log(rows);
        });
    })
}


const selectAll = () => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT m.* , CONCAT(u.firstName, ' ', u.lastName) as senderName, u.image as senderImage FROM message as m inner join user as u WHERE m.senderId = u.id ORDER BY m.id`, (err, rows, fields) => {
            if (err) reject(err);
            if (rows) {
                
                if (rows.length < 1) reject("Error! No message found!");
                resolve(rows);
            }
            else {
                reject("No data!");
            }
        });
    })
}

module.exports = {
    insert,
    selectById,
    selectAll,
    deleteById
}