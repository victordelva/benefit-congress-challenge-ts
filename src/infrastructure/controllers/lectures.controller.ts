import CreateLectureUseCase from "../../application/usecases/create-lecture/create-lecture.use-case";
import GetAllLecturesUseCase from "../../application/usecases/get-all-lectures/get-all-lectures.use-case";

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
