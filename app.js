const express = require('express')

const app = express();

const router = require('./router/webRouter')

app.use('/a', router)

if (!module.parent) {
    app.listen(3003, function () {
        console.log('123')
    });
}

module.exports = app;
