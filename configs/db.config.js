module.exports = {
    host: '85.10.205.173:3306',
    user: process.env.dbUser || 'root',
    password: process.env.dbPw || '',
    database: 'messageall'
}