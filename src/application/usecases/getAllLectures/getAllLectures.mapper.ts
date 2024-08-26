import {Lecture} from "../../../domain/models/Lecture";
import {GetAllLecturesResponse} from "./getAllLectures.response";


export function mapToGetLectureResponse (lectures: Lecture[]): GetAllLecturesResponse {
		return lectures.map(lecture =>({
			title: lecture.title,
			description: lecture.description,
			speakers: lecture.speakers.map(speaker => speaker.name),
			day: lecture.day.value,
			duration: lecture.duration,
			room: lecture.room,
			startAt: lecture.startAt?.toString()
		})) as GetAllLecturesResponse;
}