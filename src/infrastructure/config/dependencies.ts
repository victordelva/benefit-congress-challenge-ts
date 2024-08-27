import {LecturesRepositoryImpl} from "../persistance/lectures-repository.impl";
import {RoomAndTimeAssignerService} from "../../domain/services/room-and-time-assigner.service";
import CreateLectureUseCase from "../../application/usecases/create-lecture/create-lecture.use-case";
import GetAllLecturesUseCase from "../../application/usecases/get-all-lectures/get-all-lectures.use-case";
import LecturesController from "../controllers/lectures.controller";

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