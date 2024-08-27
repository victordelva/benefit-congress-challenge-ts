import {Speaker} from "./speaker";
import {ConferenceDay} from "./conference-day/conference-day";
import {Time} from "./time";

export class Lecture {
	title: string;
	description: string;
	speakers: Speaker[];
	day: ConferenceDay;
	duration: number;
	room?: number;
	startAt: Time;

	constructor({
		title,
		description,
		speakers,
		day,
		duration,
		room,
		startAt,
	}: {
		title: string;
		description: string;
		speakers: Speaker[];
		day: ConferenceDay;
		duration: number;
		room?: number;
		startAt: Time;
	}) {
		this.title = title;
		this.description = description;
		this.speakers = speakers;
		this.day = day;
		this.duration = duration;
		this.room = room;
		this.startAt = startAt;
	}

	assignRoom(room: number) {
		this.room = room;
	}

	assignTime(time: Time) {
		this.startAt = time;
	}

	get endTime() {
		return this.startAt.addMinutes(this.duration);
	}
}