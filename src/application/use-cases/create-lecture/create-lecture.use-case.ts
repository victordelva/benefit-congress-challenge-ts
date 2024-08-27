import {LecturesRepositoryInterface} from "../../../domain/repositories/lectures-repository.interface";
import {CreateLectureRequest} from "./create-lecture.request";
import {mapToCreateLectureResponse, mapToLecture} from "./create-lecture.mapper";
import {RoomAndTimeAssignerService} from "../../../domain/services/room-and-time-assigner.service";
import {CreateLectureResponse} from "./create-lecture.response";

export default class CreateLectureUseCase {
    constructor(
      private lecturesRepository: LecturesRepositoryInterface,
      private roomAssigner: RoomAndTimeAssignerService,
    ) {}

    execute(lectureRequest: CreateLectureRequest): CreateLectureResponse {
        let lecture = mapToLecture(lectureRequest);

        const dayLectures = this.lecturesRepository.findBy({
            day: lecture.day.value
        });
        lecture = this.roomAssigner.execute(dayLectures, lecture);

        this.lecturesRepository.create(lecture)

        return mapToCreateLectureResponse(lecture);
    }
}
