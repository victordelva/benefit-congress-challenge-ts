import LecturesController from './controllers/lectures.controller'
import LecturesUseCase from './application/usecases/lectures.useCase'
import * as express from 'express'
import bodyParser = require('body-parser');

export function createServer(done) {
    console.info(`Starting API on 5050...`)

    const app = express()
    const createLectureUseCase = new LecturesUseCase()

    const lecturesController = new LecturesController(createLectureUseCase);

    app.use(bodyParser.json());
    app.get("/lectures", lecturesController.findAll())
    app.post('/lectures', lecturesController.create())

    const server = app.listen(5050, () => {
        done()
    })

    return {app, server}
}
