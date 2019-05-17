const Eventproxy = require('eventproxy');
const request = require('../utils/request')

module.exports = async function (req, res, next) {
    // console.log(req)
    var ep = new Eventproxy();
    ep.fail(next);

    ep.all('hot', 'dynamic', function (hot, dynamic) {
        console.log('????')
        res.status(200).send({
            hot, dynamic
        })
    })

    const hot = await request(
        'GET', `http://127.0.0.1:3000/playlist/hot`,
    )

    console.log(hot)

    const dynamic = await request(
        'GET', `http://127.0.0.1:3000/playlist/hot`,
    )

    console.log(dynamic)

    ep.emit('dynamic', dynamic);

    ep.emit('hot', hot);
}
