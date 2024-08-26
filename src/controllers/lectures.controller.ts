import LecturesUseCase from "../application/usecases/lectures.useCase";

export default class LecturesController {
  constructor(private lecturesUseCase: LecturesUseCase) {}

  findAll() {
    return (req, res) => {
      const lectures = this.lecturesUseCase.getLectures()
      res.status(200).json(lectures)
    }
  }

  create() {
    return (req, res) => {
      const lecture = this.lecturesUseCase.createLecture(req.body)
      res.status(201).json(lecture)
    }
  }
}
