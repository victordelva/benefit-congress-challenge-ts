import {LecturesRepositoryInterface} from "../../../domain/repositories/LecturesRepository.interface";
import {CreateLectureRequest} from "./createLecture.request";
import {mapToCreateLectureResponse, mapToLecture} from "./createLecture.mapper";
import {RoomAssignerService} from "../../../domain/services/RoomAssigner.service";
import {CreateLectureResponse} from "./createLecture.response";
import {TimeAssignerService} from "../../../domain/services/TimeAssigner.service";

export default class CreateLectureUseCase {
    constructor(
      private lecturesRepository: LecturesRepositoryInterface,
      private roomAssigner: RoomAssignerService,
      private timeAssigner: TimeAssignerService,
    ) {}

    execute(lectureRequest: CreateLectureRequest): CreateLectureResponse {
        let lecture = mapToLecture(lectureRequest);

        const currentDayLectures = this.lecturesRepository.findBy({
            day: lecture.day.value
        });
        lecture = this.roomAssigner.execute(currentDayLectures, lecture);
        lecture = this.timeAssigner.execute(currentDayLectures, lecture);

        this.lecturesRepository.create(lecture)

        return mapToCreateLectureResponse(lecture);
    }
}

function fillZeros(num) {
    if (num < 10) {
        return "0" + num
    }
    return num
}
