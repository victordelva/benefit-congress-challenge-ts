import {CreateLectureRequest} from "./createLecture.request";
import {Lecture} from "../../../domain/models/Lecture";
import {Speaker} from "../../../domain/models/Speaker";
import {ConferenceDayEnum} from "../../../domain/models/ConferenceDay/ConferenceDay.enum";
import {ConferenceDayFactory} from "../../../domain/models/ConferenceDay/ConferenceDay.factory";
import {Time} from "../../../domain/models/Time";
import {CreateLectureResponse} from "./createLecture.response";

export function mapToLecture (lecture: CreateLectureRequest): Lecture {
		return new Lecture({
				title: lecture.title,
				description: lecture.description,
				speakers: lecture.speakers.map(speaker => (new Speaker({name: speaker}))),
				day: lecture.day === ConferenceDayEnum.FIRST_DAY ? ConferenceDayFactory.firstDay() : ConferenceDayFactory.secondDay(),
				duration: lecture.duration,
				room: lecture.room,
				startAt: lecture.startAt ? new Time(lecture.startAt): undefined,
		})
}

export function mapToCreateLectureResponse (lecture: Lecture): CreateLectureResponse {
		return {
				title: lecture.title,
				description: lecture.description,
				speakers: lecture.speakers.map(speaker => speaker.name),
				day: lecture.day.value,
				duration: lecture.duration,
				room: lecture.room,
				startAt: lecture.startAt?.toString()
		} as CreateLectureResponse;
}