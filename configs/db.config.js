module.exports = {
    host: 'https://www.db4free.net:3306',
    user: process.env.dbUser || 'root',
    password: process.env.dbPw || '',
    database: 'messageall'
}