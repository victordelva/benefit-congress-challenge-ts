import {Lecture} from "../models/Lecture";

export class TimeAssignerService {
	execute(previousLectures: Lecture[], newLecture: Lecture): Lecture {
		if (!previousLectures.length) {
			newLecture.assignTime(newLecture.day.startTime);
			return newLecture;
		}

		return newLecture;
	}
}