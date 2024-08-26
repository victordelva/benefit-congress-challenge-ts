import {ConferenceDayEnum} from "../models/ConferenceDay/ConferenceDay.enum";
import {Lecture} from "../models/Lecture";

export interface LecturesRepositoryInterface {
		getAll(): Lecture[];

		findBy({
			day
		}: {
			day: ConferenceDayEnum
		}): Lecture[];

		create(lecture: Lecture): Lecture;
}