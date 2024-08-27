export type CreateLectureRequest =  {
	title: string;
	description: string;
	speakers: string[];
	day: string;
	room: number;
	startAt: string;
	duration: number;
}
