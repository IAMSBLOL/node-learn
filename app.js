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
