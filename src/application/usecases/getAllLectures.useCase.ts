import {LecturesRepositoryInterface} from "../../domain/repositories/LecturesRepository.interface";

export default class GetAllLecturesUseCase {
    constructor(private lecturesRepository: LecturesRepositoryInterface) {}

    execute() {
        return this.lecturesRepository.getAll()
    }
}
