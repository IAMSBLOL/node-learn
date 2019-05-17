// const encrypt = require('./crypto')
const request = require('request')
const queryString = require('querystring')
// const PacProxyAgent = require('pac-proxy-agent')

const createRequest = (method, url, data, options) => {
    return new Promise((resolve, reject) => {
        const answer = { status: 500, body: {}, cookie: [] }
        const settings = {
            method: method,
            url: url,
            // headers: headers,
            body: queryString.stringify(data)
        }

        // if (/\.pac$/i.test(options.proxy)) {
        //     settings.agent = new PacProxyAgent(options.proxy)
        // } else {
        //     settings.proxy = options.proxy
        // }

        request(
            settings,
            (err, res, body) => {
                if (err) {
                    answer.status = 502
                    answer.body = { code: 502, msg: err.stack }
                    reject(answer)
                } else {
                    answer.cookie = (res.headers['set-cookie'] || []).map(x =>
                        x.replace(/\s*Domain=[^(;|$)]+;*/, '')
                    )
                    try {
                        answer.body = JSON.parse(body)
                        answer.status = answer.body.code || res.statusCode
                    } catch (e) {
                        answer.body = body
                        answer.status = res.statusCode
                    }
                    answer.status =
            answer.status > 100 && answer.status < 600 ? answer.status : 400
                    if (answer.status === 200) resolve(answer)
                    else reject(answer)
                }
            }
        )
    })
}

module.exports = createRequest
