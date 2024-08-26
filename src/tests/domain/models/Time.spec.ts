import {Time} from "../../../domain/models/Time";

describe('Time Model ', () => {
	it('should create a valid time a compare time correctly', () => {
		const time = new Time('10:00');
		expect(time.hours).toBe(10);
		expect(time.minutes).toBe(0);
		expect(time.isBiggerThan(new Time('09:00'))).toBe(true);
		expect(time.isBiggerThan(new Time('11:00'))).toBe(false);
		expect(time.isBiggerThan(new Time('10:00'))).toBe(false);
	});
});