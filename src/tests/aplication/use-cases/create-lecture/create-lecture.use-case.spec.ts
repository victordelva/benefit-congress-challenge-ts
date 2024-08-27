import {LecturesRepositoryInterface} from "../../../../domain/repositories/lectures-repository.interface";
import {RoomAndTimeAssignerService} from "../../../../domain/services/room-and-time-assigner.service";
import CreateLectureUseCase from "../../../../application/use-cases/create-lecture/create-lecture.use-case";
import {LecturesRepositoryImpl} from "../../../../infrastructure/persistance/lectures-repository.impl";
import {CreateLectureRequest} from "../../../../application/use-cases/create-lecture/create-lecture.request";

describe('CreateLectureUseCase - Integration Test', () => {
    let lecturesRepository: LecturesRepositoryInterface;
    let roomAndTimeAssignerService: RoomAndTimeAssignerService;
    let createLectureUseCase: CreateLectureUseCase;

    beforeEach(() => {
        lecturesRepository = new LecturesRepositoryImpl([]);
        roomAndTimeAssignerService = new RoomAndTimeAssignerService();

        createLectureUseCase = new CreateLectureUseCase(
          lecturesRepository,
          roomAndTimeAssignerService
        );
    });

    it('should create a lecture and assign the correct room and time', () => {
        const lectureData = {
            title: 'Introduction to Clean Architecture',
            description: 'An overview of Clean Architecture principles.',
            speakers: ['John Doe'],
            day: 'firstDay',
            duration: 60,
        } as CreateLectureRequest;

        const lectureResponse = createLectureUseCase.execute(lectureData);

        expect(lectureResponse).toEqual(expect.objectContaining({
            title: expect.any(String),
            description: expect.any(String),
            speakers: expect.any(Array),
            day: expect.any(String),
            duration: expect.any(Number),
            room: 1,
            startAt: "10:00",
        }));

        const lectures = lecturesRepository.getAll();
        expect(lectures).toHaveLength(1);
        expect(lectures[0].room).toBe(1);
        expect(lectures[0].startAt.toString()).toBe('10:00');
    });
});
