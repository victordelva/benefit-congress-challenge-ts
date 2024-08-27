export type GetLectureResponse = {
    title: string;
    description: string;
    speakers: string[];
    day: string;
    room: number;
    startAt: string;
    duration: number;
}

export type GetAllLecturesResponse = GetLectureResponse[];