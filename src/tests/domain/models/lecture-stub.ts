import {Lecture} from "../../../domain/models/lecture";
import {ConferenceDayFactory} from "../../../domain/models/conference-day/conference-day.factory";
import {ConferenceDay} from "../../../domain/models/conference-day/conference-day";
import {Time} from "../../../domain/models/time";

export class LectureStub {
	static random({
		duration,
		day,
		              room,
		startAt,
	}:{
		duration?: number;
		room?: number;
		day?: ConferenceDay;
		startAt?: Time;
	} = {}): Lecture {
		return new Lecture({
			title: "title",
			description: "description",
			speakers: [{name: "speaker"}],
			day: day ?? ConferenceDayFactory.firstDay(),
			duration: duration ?? 30,
			room: room,
			startAt: startAt,
		})
	}
}