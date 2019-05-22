const express = require('express')
const path = require('path')

const app = express();

const router = require('./router/webRouter')

const reqLog = require('./middlewares/req_time_logs')

const netEsasy = require('./netEsay')

// 静态文件目录
const staticDir = path.join(__dirname, 'public');

// CORS
app.use((req, res, next) => {
    if (req.path !== '/' && !req.path.includes('.')) {
        res.header({
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': req.headers.origin || '*',
            'Access-Control-Allow-Headers': 'X-Requested-With',
            'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
            'Content-Type': 'application/json; charset=utf-8'
        })
    }
    next()
})

// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root123456',
//     database: 'world',
//     insecureAuth: true
// });

// connection.connect(function (err) {
//     if (err) {
//         console.error('error connecting: ' + err.stack);
//         return;
//     }

//     console.log('connected as id ' + connection.threadId);
// });

const Sequelize = require('sequelize');
const sequelize = new Sequelize('world', 'root', 'root123456', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    // 仅限 SQLite
    storage: 'path/to/database.sqlite',

    // 请参考 Querying - 查询 操作符 章节
    operatorsAliases: false
});

const User = sequelize.define('user', {
    username: Sequelize.STRING,
    birthday: Sequelize.DATE
});

sequelize.sync()
    .then(() => User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
    }))
    .then(jane => {
        console.log(jane.toJSON());
    });

app.use('/public', express.static(staticDir));

app.use(reqLog)

app.use('/a', router)

app.use('/music', netEsasy.Hot)

if (!module.parent) {
    app.listen(3003, function () {
        console.log('123')
    });
}

module.exports = app;
