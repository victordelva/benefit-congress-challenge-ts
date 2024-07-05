import CongressService from "../service/congress.service";

export default class CongressController {
  constructor(private congressService: CongressService) {}

  findAll() {
    return (req, res) => {
      const lectures = this.congressService.getLectures()
      res.status(200).json(lectures)
    }
  }

  create() {
    return (req, res) => {
      const lecture = this.congressService.createLecture(req.body)
      res.status(201).json(lecture)
    }
  }
}
