import {LecturesRepositoryInterface} from "../../domain/repositories/lectures-repository.interface";
import {Lecture} from "../../domain/models/lecture";
import {ConferenceDayEnum} from "../../domain/models/conference-day/conference-day.enum";

export class LecturesRepositoryImpl  implements LecturesRepositoryInterface {
	private lectures: Lecture[];

	constructor(lectures = []) {
		this.lectures = lectures;
	}

	getAll() {
		return this.lectures;
	}

	create(lecture: Lecture) {
		this.lectures.push(lecture)
		return lecture;
	}

	findBy({
		day
	}: { day?: ConferenceDayEnum }): Lecture[] {
		let lectures = this.lectures;

		if (day) {
			lectures = lectures.filter(lecture => lecture.day.value === day);
		}

		return lectures
	}
}