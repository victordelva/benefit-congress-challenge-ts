import {Time} from "../../../../domain/models/time";
import {ConferenceDayFactory} from "../../../../domain/models/conference-day/conference-day.factory";

describe('Conference Day ', () => {
	it('should be created and know if it can handle more lectures', () => {
		const day = ConferenceDayFactory.secondDay();
		expect(day.value).toBe("secondDay");
		expect(day.startTime.toString()).toBe("10:00");
		expect(day.endTime.toString()).toBe("15:00");
		expect(day.canHaveLectureWithTimeAndDuration(new Time("14:00"), 60)).toBe(true);
		expect(day.canHaveLectureWithTimeAndDuration(new Time("14:00"), 61)).toBe(false);
	});
});