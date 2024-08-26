import {ConferenceDayEndTimeEnum, ConferenceDayEnum, ConferenceDayStartTimeEnum} from "./ConferenceDay.enum";
import {Time} from "../Time";

export class ConferenceDayModel {
	value: ConferenceDayEnum;

	constructor({ value }: {
		value: ConferenceDayEnum
	}) {
		this.value = value;
	}

	isFirstDay() {
		return this.value === ConferenceDayEnum.FIRST_DAY;
	}

	isSecondDay() {
		return this.value === ConferenceDayEnum.SECOND_DAY;
	}

	get startTime() {
		return this.isFirstDay() ? new Time(ConferenceDayStartTimeEnum.FIRST_DAY) : new Time(ConferenceDayStartTimeEnum.SECOND_DAY);
	}

	get endTime() {
		return this.isFirstDay() ? new Time(ConferenceDayEndTimeEnum.FIRST_DAY) : new Time(ConferenceDayEndTimeEnum.SECOND_DAY);
	}

	canHaveLectureWithTimeAndDuration(time: Time, duration: number) {
		const endTime = time.addMinutes(duration);
		return !endTime.isBiggerThan(this.endTime);
	}
}