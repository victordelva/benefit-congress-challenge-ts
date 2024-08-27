import {ConferenceDayEnum} from "../models/conference-day/conference-day.enum";
import {Lecture} from "../models/lecture";

export interface LecturesRepositoryInterface {
		getAll(): Lecture[];

		findBy({
			day
		}: {
			day: ConferenceDayEnum
		}): Lecture[];

		create(lecture: Lecture): Lecture;
}