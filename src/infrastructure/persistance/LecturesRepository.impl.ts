import {LecturesRepositoryInterface} from "../../domain/repositories/LecturesRepository.interface";

export class LecturesRepositoryImpl  implements LecturesRepositoryInterface {
	private lectures: Record<string, any>[];

	constructor(lectures = []) {
		this.lectures = lectures;
	}

	getAll() {
		return this.lectures;
	}

	create(lecture: Record<string, any>) {
		this.lectures.push(lecture)
		return lecture;
	}
}