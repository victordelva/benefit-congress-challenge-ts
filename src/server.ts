import LecturesController from './infrastructure/controllers/lectures.controller'
import CreateLectureUseCase from './application/usecases/createLecture/createLecture.useCase'
import * as express from 'express'
import bodyParser = require('body-parser');
import {LecturesRepositoryImpl} from "./infrastructure/persistance/LecturesRepository.impl";
import GetAllLecturesUseCase from "./application/usecases/getAllLectures/getAllLectures.useCase";
import {RoomAssignerService} from "./domain/services/RoomAssigner.service";
import {TimeAssignerService} from "./domain/services/TimeAssigner.service";

export function createServer(done) {
    console.info(`Starting API on 5050...`)

    const app = express()
    const lecturesRepository = new LecturesRepositoryImpl([]);

    const roomAssigner = new RoomAssignerService();
    const timeAssigner= new TimeAssignerService();
    const createLectureUseCase = new CreateLectureUseCase(
      lecturesRepository,
      roomAssigner,
      timeAssigner
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
