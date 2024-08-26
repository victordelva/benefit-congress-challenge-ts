import * as express from 'express'
import bodyParser = require('body-parser');
import {configureRoutes} from "./infrastructure/routes";

export function createServer(dependencies, done) {
    console.info(`Starting API on 5050...`)
    const app = express()
    app.use(bodyParser.json());

    configureRoutes(app, dependencies);

    const server = app.listen(5050, () => {
        done()
    })

    return {app, server}
}
