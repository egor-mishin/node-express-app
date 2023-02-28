import http from 'http'

const host = '127.0.0.1'
const port = '8000'

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-type', 'text/pain')
    res.end('Hello')
})


server.listen(port, host, () => {
    console.log(`Server is running on${host}:${port}`)
})
