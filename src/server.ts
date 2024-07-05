import CongressController from './controllers/congress.controller'
import CongressService from './service/congress.service'
import * as express from 'express'
import bodyParser = require('body-parser');

export function createServer(done) {
    console.info(`Starting API on 5050...`)

    const app = express()
    const congressService = new CongressService()

    const congressController = new CongressController(congressService);

    app.use(bodyParser.json());
    app.get("/lectures", congressController.findAll())
    app.post('/lectures', congressController.create())

    const server = app.listen(5050, () => {
        done()
    })

    return {app, server}
}
