import {LecturesRepositoryInterface} from "../../../domain/repositories/LecturesRepository.interface";
import {CreateLectureRequest} from "./createLecture.request";
import {mapToCreateLectureResponse, mapToLecture} from "./createLecture.mapper";
import {RoomAndTimeAssignerService} from "../../../domain/services/RoomAndTimeAssigner.service";
import {CreateLectureResponse} from "./createLecture.response";

export default class CreateLectureUseCase {
    constructor(
      private lecturesRepository: LecturesRepositoryInterface,
      private roomAssigner: RoomAndTimeAssignerService,
    ) {}

    execute(lectureRequest: CreateLectureRequest): CreateLectureResponse {
        let lecture = mapToLecture(lectureRequest);

        const currentDayLectures = this.lecturesRepository.findBy({
            day: lecture.day.value
        });
        lecture = this.roomAssigner.execute(currentDayLectures, lecture);

        this.lecturesRepository.create(lecture)

        return mapToCreateLectureResponse(lecture);
    }
}
