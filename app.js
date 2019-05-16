const express = require('express')

const app = express();

const router = require('./router/webRouter')

const reqLog = require('./middlewares/req_time_logs')

app.use(reqLog)

app.use('/a', router)

if (!module.parent) {
    app.listen(3003, function () {
        console.log('123')
    });
}

module.exports = app;
