import {Lecture} from "../../../domain/models/Lecture";
import {ConferenceDayFactory} from "../../../domain/models/ConferenceDay/ConferenceDay.factory";
import {ConferenceDayModel} from "../../../domain/models/ConferenceDay/ConferenceDay.model";
import {Time} from "../../../domain/models/Time";

export class LectureStub {
	static random({
		duration,
		day,
		              room,
		startAt,
	}:{
		duration?: number;
		room?: number;
		day?: ConferenceDayModel;
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