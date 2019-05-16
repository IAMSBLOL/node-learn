const express = require('express')
const path = require('path')

const app = express();

const router = require('./router/webRouter')

const reqLog = require('./middlewares/req_time_logs')

// 静态文件目录
const staticDir = path.join(__dirname, 'public');

app.use('/public', express.static(staticDir));

app.use(reqLog)

app.use('/a', router)

if (!module.parent) {
    app.listen(3003, function () {
        console.log('123')
    });
}

module.exports = app;
