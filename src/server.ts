import LecturesController from './infrastructure/controllers/lectures.controller'
import CreateLectureUseCase from './application/usecases/createLecture/createLecture.useCase'
import * as express from 'express'
import bodyParser = require('body-parser');
import {LecturesRepositoryImpl} from "./infrastructure/persistance/LecturesRepository.impl";
import GetAllLecturesUseCase from "./application/usecases/getAllLectures/getAllLectures.useCase";
import {RoomAndTimeAssignerService} from "./domain/services/RoomAndTimeAssigner.service";

export function createServer(done) {
    console.info(`Starting API on 5050...`)

    const app = express()
    const lecturesRepository = new LecturesRepositoryImpl([]);

    const roomAssigner = new RoomAndTimeAssignerService();
    const createLectureUseCase = new CreateLectureUseCase(
      lecturesRepository,
      roomAssigner,
    );

    const getAllLecturesUseCase = new GetAllLecturesUseCase(lecturesRepository)

    const lecturesController = new LecturesController(createLectureUseCase, getAllLecturesUseCase);

    app.use(bodyParser.json());
    app.get("/lectures", lecturesController.findAll())
    app.post('/lectures', lecturesController.create())

    const server = app.listen(5050, () => {
        done()
    })

    return {app, server}
}
