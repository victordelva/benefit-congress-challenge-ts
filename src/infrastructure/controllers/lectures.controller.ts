import CreateLectureUseCase from "../../application/usecases/createLecture/createLecture.useCase";
import GetAllLecturesUseCase from "../../application/usecases/getAllLectures/getAllLectures.useCase";

export default class LecturesController {
  constructor(
    private createLectureUseCase: CreateLectureUseCase,
    private getAllLecturesUseCase: GetAllLecturesUseCase,
  ) {}

  findAll() {
    return (req, res) => {
      const lectures = this.getAllLecturesUseCase.execute()
      res.status(200).json(lectures)
    }
  }

  create() {
    return (req, res) => {
      const lecture = this.createLectureUseCase.execute(req.body)
      res.status(201).json(lecture)
    }
  }
}