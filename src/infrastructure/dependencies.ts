import {LecturesRepositoryImpl} from "./persistance/LecturesRepository.impl";
import {RoomAndTimeAssignerService} from "../domain/services/RoomAndTimeAssigner.service";
import CreateLectureUseCase from "../application/usecases/createLecture/createLecture.useCase";
import GetAllLecturesUseCase from "../application/usecases/getAllLectures/getAllLectures.useCase";
import LecturesController from "./controllers/lectures.controller";

export const configureDependencies = () => {
	const lecturesRepository = new LecturesRepositoryImpl([]);
	const roomAssigner = new RoomAndTimeAssignerService();

	const createLectureUseCase = new CreateLectureUseCase(lecturesRepository, roomAssigner);
	const getAllLecturesUseCase = new GetAllLecturesUseCase(lecturesRepository);

	const lecturesController = new LecturesController(createLectureUseCase, getAllLecturesUseCase);

	return {
		lecturesController,
	};
};