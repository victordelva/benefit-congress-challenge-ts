import {Lecture} from "../models/Lecture";

export class RoomAssignerService {
	execute(previousLectures: Lecture[], newLecture: Lecture): Lecture {
		if (!previousLectures.length) {
			newLecture.assignRoom(1);
			return newLecture;
		}

		const roomLectures = [...new Set(previousLectures.map(lecture => (lecture.room)))]
			.sort((a, b) => a - b);


		roomLectures.forEach(room => {
			const roomLastLecture = previousLectures
				.filter(lecture => lecture.room === room)
				.sort((a, b) => a.startAt.isBiggerThan(b.startAt) ? 1 : -1)
				.pop();
		})

		return newLecture;
	}
}