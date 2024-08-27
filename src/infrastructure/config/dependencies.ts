import {LecturesRepositoryImpl} from "../persistance/lectures-repository.impl";
import {RoomAndTimeAssignerService} from "../../domain/services/room-and-time-assigner.service";
import CreateLectureUseCase from "../../application/usecases/createLecture/create-lecture.useCase";
import GetAllLecturesUseCase from "../../application/usecases/getAllLectures/get-all-lectures.useCase";
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