export class Time {
	value: string;

	constructor(value: string) {
		if (value.length !== 5 || value.indexOf(':') !== 2) {
			throw new Error('Invalid time format');
		}
		this.value = value;
	}

	toString() {
		return this.value;
	}

	get hours() {
		return parseInt(this.value.substring(0, 2));
	}

	get minutes() {
		return parseInt(this.value.substring(3, 5));
	}

	isBiggerThan(time: Time) {
		return this.hours > time.hours || (this.hours === time.hours && this.minutes > time.minutes);
	}

	addMinutes(minutes: number): Time {
		const hours = Math.floor(minutes / 60);
		const newHours = this.hours + hours;
		const newMinutes = this.minutes + minutes % 60;
		return new Time(`${fillZeros(newHours)}:${fillZeros(newMinutes)}`);
	}
}

function fillZeros(num) {
	if (num < 10) {
		return "0" + num
	}
	return num
}