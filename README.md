# Benefit congress challenge

In Cobee we want to organize the first employee benefits congress to increase Cobee’s visibility in the market. Our idea is that our sales team will be contacting relevant profiles in the HR sector to invite them to give a lecture at our congress.

We would like to have a web tool in which the lectures can be registered, as quickly as possible, so that as we manage to convince these people to give a lecture, they will be registered in the system, so people on the days of the congress will be able to see the lectures that day through an app and see the agenda of the event.

The event will last two days. The first day will be from 10:00 am to 6:00 pm and the second day from 10:00 am to 3:00 pm.

## Creation of lectures

The sales person will send the title of the lecture, the description of the lecture, the duration, the day it will be held and the name of the speaker(s).

Speakers will be available throughout the selected day, so it will not be necessary to indicate the time of the lecture in the creation process. We want the system to assign the hour of each lecture automatically until all the hours of the selected day are completed. E.g. the first lecture with a duration of 30 minutes, will schedule at 10:00 am so the second one will start at 10:30 am.

We have a budget to rent several rooms, so if a speaker wants to give a talk on a certain day and all the times have been filled, then we want the system to automatically assign a new room.

**Request**
```
POST /lectures

Content-Type: application/json

{
    "title": "lecture 1",
    "description": "lecture description 1",
    "speakers": ["john"],
    "day": "firstDay",
    "duration": 60
}
```
**Response**
```
{
    "title": "lecture 1",
    "description": "lecture description 1",
    "speakers": ["john"],
    "day": "firstDay",
    "duration": 60,
    "room": 1,
    "startAt": "10:00"
}
```

## Viewing of lectures

The system will make it possible to consult the schedule of lectures. To do this, a list of the lectures will be returned indicating: Day of the lecture, time of the lecture, room, duration, title, description and speaker(s).

**Request**
```
GET /lectures
```
**Response**
```
[
    {
        "title": "lecture 1",
        "description": "lecture description 1",
        "speakers": ["john"],
        "day": "firstDay",
        "duration": 60,
        "room": 1,
        "startAt": "10:00"
    },
    {
        "title": "lecture 2",
        "description": "lecture description 2",
        "speakers": ["jane"],
        "day": "firstDay",
        "duration": 30,
        "room": 1,
        "startAt": "11:00"
    },
    {
        "title": "lecture 3",
        "description": "lecture description 3",
        "speakers": ["mike"],
        "day": "secondDay",
        "duration": 45,
        "room": 1,
        "startAt": "10:00"
    }
]
```

# Instructions

Your goal is to review the code at home before the Technical Interview with Cobee.

During this interview we will walk about:

- We have started the development but the code lacks of quality and does not fit the requirements
- We have failing end-to-end test
- We need to refactor the project
- At Cobee we use things like: clean code, clean architecture, SOLID, TDD, KISS...
- We have not yet decided which database system we want to use to store the data, we will make that decision later so the data in persisted in **memory**.

We hope you enjoy during the review at home task and with us in the Technical Interview 🤘

# Development

You will need to have installed [node](https://nodejs.org/) in your system.

Install the project dependencies using:

```
npm install
```

## How to run the tests

In order to run the tests you can use:

```
npm test
```

## How to start the server

You will need to transpile the typescript code to javascript using:
```
npm run build
```

Then you can run the web server:
```
npm start
```

## Legal notes

All the results obtained from this exercise will be used for recruitment purposes.
The company is not authorised to use it, and you own the copyright of this code.
Please, remember that this document and its information are confidential and won’t be reproduced or circulated.
