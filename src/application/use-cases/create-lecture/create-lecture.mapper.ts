import {CreateLectureRequest} from "./create-lecture.request";
import {Lecture} from "../../../domain/models/lecture";
import {Speaker} from "../../../domain/models/speaker";
import {ConferenceDayEnum} from "../../../domain/models/conference-day/conference-day.enum";
import {ConferenceDayFactory} from "../../../domain/models/conference-day/conference-day.factory";
import {Time} from "../../../domain/models/time";
import {CreateLectureResponse} from "./create-lecture.response";

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