import {LecturesRepositoryInterface} from "../../../domain/repositories/lectures-repository.interface";
import {mapToGetLectureResponse} from "./get-all-lectures.mapper";

export default class GetAllLecturesUseCase {
    constructor(private lecturesRepository: LecturesRepositoryInterface) {}

    execute() {
        return mapToGetLectureResponse(this.lecturesRepository.getAll());
    }
}
