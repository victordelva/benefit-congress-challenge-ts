import {ConferenceDayModel} from "./ConferenceDay.model";
import {ConferenceDayEnum} from "./ConferenceDay.enum";

export class ConferenceDayFactory {
	static firstDay() {
		return new ConferenceDayModel({
			value: ConferenceDayEnum.FIRST_DAY,
		});
	}

	static secondDay() {
		return new ConferenceDayModel({
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