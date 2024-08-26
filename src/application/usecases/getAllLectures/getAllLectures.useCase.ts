import {LecturesRepositoryInterface} from "../../../domain/repositories/LecturesRepository.interface";
import {mapToGetLectureResponse} from "./getAllLectures.mapper";

export default class GetAllLecturesUseCase {
    constructor(private lecturesRepository: LecturesRepositoryInterface) {}

    execute() {
        return mapToGetLectureResponse(this.lecturesRepository.getAll());
    }
}
