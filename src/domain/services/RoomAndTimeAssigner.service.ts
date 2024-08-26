import {Lecture} from "../models/Lecture";

export class RoomAndTimeAssignerService {
	execute(previousLectures: Lecture[], newLecture: Lecture): Lecture {
		const lectureConferenceDay = newLecture.day;
		if (!previousLectures.length) {
			newLecture.assignRoom(1);
			newLecture.assignTime(lectureConferenceDay.startTime);
			return newLecture;
		}

		const roomLectures = [...new Set(previousLectures.map(lecture => (lecture.room)))]
			.sort((a, b) => a - b);

		const lastLectureByRoom: Lecture[] = [];
		roomLectures.forEach(room => {
			const roomLastLecture = previousLectures
				.filter(lecture => lecture.room === room)
				.sort((a, b) => a.startAt.isBiggerThan(b.startAt) ? 1 : -1)
				.pop();
			lastLectureByRoom.push(roomLastLecture);
		});

		for (const lastLecture of lastLectureByRoom) {
			if (lectureConferenceDay.canHaveLectureAtWithDuration(lastLecture.endTime, newLecture.duration)) {
				newLecture.assignRoom(lastLecture.room);
				newLecture.assignTime(lastLecture.endTime);
				break;
			}
		}
		if (!newLecture.room) {
			newLecture.assignRoom(roomLectures[roomLectures.length -1] + 1);
			newLecture.assignTime(lectureConferenceDay.startTime);
		}

		return newLecture;
	}
}