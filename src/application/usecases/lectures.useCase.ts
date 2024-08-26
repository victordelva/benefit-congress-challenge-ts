import {LecturesRepositoryInterface} from "../../domain/repositories/LecturesRepository.interface";

export default class LecturesUseCase {
    constructor(private lecturesRepository: LecturesRepositoryInterface) {}

    createLecture(lecture) {
        const allLectures = this.lecturesRepository.getAll();
        if (lecture.day == 'firstDay') {
            let firstDayLectures = []
            for (const lecture of allLectures) {
                if (lecture.day == 'firstDay') {
                    firstDayLectures.push(lecture)
                }
            }
            // Find the last room created for given day
            let lastRoom = 1
            for (const lecture of firstDayLectures) {
                if (lecture.room > lastRoom) {
                    lastRoom = lecture.room
                }
            }
            let roomLectures = []
            for (const lecture of firstDayLectures) {
                if (lecture.room == lastRoom) {
                    roomLectures.push(lecture)
                }
            }
            if (roomLectures.length == 0) {
                lecture.room = lastRoom;
                lecture.startAt = "10:00"
            } else {
                // Check if the new lecture fits into the room
                let roomLastLecture = roomLectures[roomLectures.length-1]
                let startAt = new Date()
                startAt.setHours(roomLastLecture.startAt.substring(0,2), roomLastLecture.startAt.substring(3,5), 0)
                let endAt = new Date()
                endAt.setTime(startAt.getTime() + (roomLastLecture.duration * 60 * 1000));

                let newEndAt = new Date()
                newEndAt.setTime(endAt.getTime() + (lecture.duration * 60 * 1000));

                let lastHourOfDay = new Date()
                lastHourOfDay.setHours(18, 0, 0)
                if (newEndAt <= lastHourOfDay) {
                    lecture.room = lastRoom
                    lecture.startAt = fillZeros(endAt.getHours()) + ":" + fillZeros(endAt.getMinutes())
                } else {
                    // The new lecture must be place into a new room
                    lecture.room = lastRoom + 1;
                    lecture.startAt = "10:00"
                }
            }

            this.lecturesRepository.create(lecture)
        } else if (lecture.day == 'secondDay'){
            // Same logic that for the first day only changes the last hour for the conferences
            let secondDayLectures = []
            for (const lecture of allLectures) {
                if (lecture.day == 'secondDay') {
                    secondDayLectures.push(lecture)
                }
            }
            let lastRoom = 1
            for (const lecture of secondDayLectures) {
                if (lecture.room > lastRoom) {
                    lastRoom = lecture.room
                }
            }
            let roomLectures = []
            for (const lecture of secondDayLectures) {
                if (lecture.room == lastRoom) {
                    roomLectures.push(lecture)
                }
            }
            if (roomLectures.length == 0) {
                lecture.room = lastRoom;
                lecture.startAt = "10:00"
            } else {
                let roomLastLecture = roomLectures[roomLectures.length-1]
                let startAt = new Date()
                startAt.setHours(roomLastLecture.startAt.substring(0,2), roomLastLecture.startAt.substring(3,5), 0)
                let endAt = new Date()
                endAt.setTime(startAt.getTime() + (roomLastLecture.duration * 60 * 1000));

                let newEndAt = new Date()
                newEndAt.setTime(endAt.getTime() + (lecture.duration * 60 * 1000));

                let lastHourOfDay = new Date()
                lastHourOfDay.setHours(15, 0, 0)
                if (newEndAt <= lastHourOfDay) {
                    lecture.room = lastRoom
                    lecture.startAt = fillZeros(endAt.getHours()) + ":" + fillZeros(endAt.getMinutes())
                } else {
                    lecture.room = lastRoom + 1;
                    lecture.startAt = "10:00"
                }
            }

            this.lecturesRepository.create(lecture)
        }

        return lecture
    }

    getLectures() {
        return this.lecturesRepository.getAll()
    }
}

function fillZeros(num) {
    if (num < 10) {
        return "0" + num
    }
    return num
}
