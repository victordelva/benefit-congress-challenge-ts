import {ConferenceDay} from "./conference-day";
import {ConferenceDayEnum} from "./conference-day.enum";

export class ConferenceDayFactory {
	static firstDay() {
		return new ConferenceDay({
			value: ConferenceDayEnum.FIRST_DAY,
		});
	}

	static secondDay() {
		return new ConferenceDay({
			value: ConferenceDayEnum.SECOND_DAY,
		});
	}

	static fromString(day: string) {
		if (day === ConferenceDayEnum.FIRST_DAY) {
			return ConferenceDayFactory.firstDay();
		}

		if (day === ConferenceDayEnum.SECOND_DAY) {
			return ConferenceDayFactory.secondDay();
		}

		throw new Error('Invalid day');
	}
}