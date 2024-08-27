import CreateLectureUseCase from "../../application/usecases/createLecture/create-lecture.useCase";
import GetAllLecturesUseCase from "../../application/usecases/getAllLectures/get-all-lectures.useCase";

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
