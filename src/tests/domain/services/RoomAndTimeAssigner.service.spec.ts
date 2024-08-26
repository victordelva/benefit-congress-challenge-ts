import {RoomAndTimeAssignerService} from "../../../domain/services/RoomAndTimeAssigner.service";
import {LectureStub} from "../models/LectureStub";
import {ConferenceDayFactory} from "../../../domain/models/ConferenceDay/ConferenceDay.factory";
import {ConferenceDayStartTimeEnum} from "../../../domain/models/ConferenceDay/ConferenceDay.enum";
import exp = require("node:constants");

describe('AssignRoomAndTimeService ', () => {
	let roomAssignerService: RoomAndTimeAssignerService;

	beforeAll(() => {
		roomAssignerService = new RoomAndTimeAssignerService();
	});

	it("should assign the first room to the first lecture", () => {
		const lecture = roomAssignerService.execute([], LectureStub.random({
			day: ConferenceDayFactory.firstDay(),
		}));

		expect(lecture.room).toBe(1);
		expect(lecture.startAt.toString()).toBe(ConferenceDayStartTimeEnum.FIRST_DAY);
	});

	it("should assign room 2 to the second lecture", () => {
		const lecture = roomAssignerService.execute([
			LectureStub.random({
				startAt: ConferenceDayFactory.firstDay().startTime,
				day: ConferenceDayFactory.firstDay(),
				room: 1,
				duration: 480, // complete day of first day
			})
		], LectureStub.random({
			day: ConferenceDayFactory.firstDay(),
			room: undefined,
		}));

		expect(lecture.room).toBe(2);
	});

	it("Should assign room 1 to the third lecture", () => {
		const lecture1 = LectureStub.random({
			startAt: ConferenceDayFactory.firstDay().startTime,
			day: ConferenceDayFactory.firstDay(),
			duration: 300,
			room: 1,
		});

		const lecture2 = roomAssignerService.execute([
			lecture1,
		], LectureStub.random({
			duration: 300,
			day: ConferenceDayFactory.firstDay(),
		}));

		expect(lecture2.room).toBe(2);

		const lecture3 = roomAssignerService.execute([
			lecture1,
			lecture2,
		], LectureStub.random({
			duration: 30,
			day: ConferenceDayFactory.firstDay(),
		}));
		expect(lecture3.room).toBe(1);
	});

	it('Should create the second lecture in the same room for the first day', () => {
		const lecture1 = roomAssignerService.execute([],LectureStub.random({
			day: ConferenceDayFactory.firstDay(),
			duration: 60,
		}));

		expect(lecture1.room).toBe(1);
		expect(lecture1.startAt.toString()).toBe("10:00");

		const lecture2 = roomAssignerService.execute([lecture1],LectureStub.random({
			day: ConferenceDayFactory.firstDay(),
			duration: 120,
		}));
		expect(lecture2.room).toBe(1);
		expect(lecture2.startAt.toString()).toBe("11:00");
	});
});