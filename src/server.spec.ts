import * as request from 'supertest'
import {createServer} from './server'
import {configureDependencies} from "./infrastructure/dependencies";

describe('Lectures Management', () => {
  let server
  let app

  beforeEach((done) => {
    const result = createServer(configureDependencies(),done)
    app = result.app
    server = result.server
  })

  afterEach(done => {
    server.close(done)
  })

  it('Should create the first lecture for the first day', async () => {
    let lecture = {
      title: 'Lecture 1',
      description: 'Some description',
      speakers: ['John Doe'],
      duration: 400,
      day: "firstDay"
    }
    let res = await request(app)
        .post('/lectures').send(lecture)

    expect(res.statusCode).toBe(201)
    const createdLecture1 = res.body
    expect(createdLecture1.room).toEqual(1)
    expect(createdLecture1.startAt).toEqual('10:00')

    res = await request(app)
        .get('/lectures')

    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject([createdLecture1])
  })

  it('Should create the second lecture in the same room for the first day', async () => {
    let lecture = {
      title: 'Lecture 1',
      description: 'Some description',
      speakers: ['John Doe'],
      duration: 60,
      day: "firstDay"
    }
    let res = await request(app)
        .post('/lectures').send(lecture)

    expect(res.statusCode).toBe(201)
    let createdLecture1 = res.body
    expect(createdLecture1.room).toEqual(1)
    expect(createdLecture1.startAt).toEqual('10:00')

    let lecture2 = {
      title: 'Lecture 2',
      description: 'Some description 2',
      speakers: ['Mike Doe'],
      duration: 120,
      day: "firstDay"
    }
    res = await request(app)
        .post('/lectures').send(lecture2)

    expect(res.statusCode).toBe(201)
    let createdLecture2 = res.body
    expect(createdLecture2.room).toEqual(1)
    expect(createdLecture2.startAt).toEqual('11:00')

    res = await request(app)
        .get('/lectures')

    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject([createdLecture1, createdLecture2])
  })

  it('Should create the next lecture in a new room for the first day', async () => {
    let lecture = {
      title: 'Lecture 1',
      description: 'Some description',
      speakers: ['John Doe'],
      duration: 420,
      day: "firstDay"
    }
    let res = await request(app)
        .post('/lectures').send(lecture)

    expect(res.statusCode).toBe(201)
    let createdLecture1 = res.body
    expect(createdLecture1.room).toEqual(1)
    expect(createdLecture1.startAt).toEqual('10:00')

    let lecture2 = {
      title: 'Lecture 2',
      description: 'Some description',
      speakers: ['Jane Doe'],
      duration: 90,
      day: "firstDay"
    }
    res = await request(app)
        .post('/lectures').send(lecture2)

    expect(res.statusCode).toBe(201)
    let createdLecture2 = res.body
    expect(createdLecture2.room).toEqual(2)
    expect(createdLecture2.startAt).toEqual('10:00')

    res = await request(app)
        .get('/lectures')

    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject([createdLecture1, createdLecture2])
  })

  it('Should create lectures in the room gaps for the first day', async () => {
    let lecture = {
      title: 'Lecture 1',
      description: 'Some description',
      speakers: ['John Doe'],
      duration: 360, // 6 hours
      day: "firstDay"
    }
    let res = await request(app)
        .post('/lectures').send(lecture)

    expect(res.statusCode).toBe(201)
    let createdLecture1 = res.body
    expect(createdLecture1.room).toEqual(1)
    expect(createdLecture1.startAt).toEqual('10:00')

    // The lecture will end at 16:00 so there is a gap of 2h until the end of the day 18:00

    let lecture2 = {
      title: 'Lecture 2',
      description: 'Some description',
      speakers: ['Jane Doe'],
      duration: 180,
      day: "firstDay"
    }
    res = await request(app)
        .post('/lectures').send(lecture2)

    expect(res.statusCode).toBe(201)
    let createdLecture2 = res.body
    expect(createdLecture2.room).toEqual(2) // In a new room
    expect(createdLecture2.startAt).toEqual('10:00')


    let lecture3 = {
      title: 'Lecture 3',
      description: 'Some description',
      speakers: ['Jane Doe'],
      duration: 60,
      day: "firstDay"
    }
    res = await request(app)
        .post('/lectures').send(lecture3)

    expect(res.statusCode).toBe(201)
    let createdLecture3 = res.body
    expect(createdLecture3.room).toEqual(1) // FIXME the lecture should be placed into the room 1

    res = await request(app)
        .get('/lectures')

    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject([createdLecture1, createdLecture2, createdLecture3])
  })

  it('Should create the first lecture for the second day', async () => {
    let lecture = {
      title: 'Lecture 1',
      description: 'Some description',
      speakers: ['John Doe'],
      duration: 150,
      day: "secondDay"
    }
    let res = await request(app)
        .post('/lectures').send(lecture)

    expect(res.statusCode).toBe(201)
    let createdLecture1 = res.body
    expect(createdLecture1.room).toEqual(1)
    expect(createdLecture1.startAt).toEqual('10:00')

    res = await request(app)
        .get('/lectures')

    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject([createdLecture1])
  })

  it('Should create the second lecture in the same room for the second day', async () => {
    let lecture = {
      title: 'Lecture 1',
      description: 'Some description',
      speakers: ['John Doe'],
      duration: 120,
      day: "secondDay"
    }
    let res = await request(app)
        .post('/lectures').send(lecture)

    expect(res.statusCode).toBe(201)
    let createdLecture1 = res.body
    expect(createdLecture1.room).toEqual(1)
    expect(createdLecture1.startAt).toEqual('10:00')

    let lecture2 = {
      title: 'Lecture 2',
      description: 'Some description 2',
      speakers: ['Mike Doe'],
      duration: 30,
      day: "secondDay"
    }
    res = await request(app)
        .post('/lectures').send(lecture2)

    expect(res.statusCode).toBe(201)
    let createdLecture2 = res.body
    expect(createdLecture2.room).toEqual(1)
    expect(createdLecture2.startAt).toEqual('12:00')

    res = await request(app)
        .get('/lectures')

    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject([createdLecture1, createdLecture2])
  })

  it('Should create the next lecture in a new room for the second day', async () => {
    let lecture = {
      title: 'Lecture 1',
      description: 'Some description',
      speakers: ['John Doe'],
      duration: 360,
      day: "secondDay"
    }
    let res = await request(app)
        .post('/lectures').send(lecture)

    expect(res.statusCode).toBe(201)
    let createdLecture1 = res.body
    expect(createdLecture1.room).toEqual(1)
    expect(createdLecture1.startAt).toEqual('10:00')

    let lecture2 = {
      title: 'Lecture 2',
      description: 'Some description',
      speakers: ['Jane Doe'],
      duration: 90,
      day: "secondDay"
    }
    res = await request(app)
        .post('/lectures').send(lecture2)

    expect(res.statusCode).toBe(201)
    let createdLecture2 = res.body
    expect(createdLecture2.room).toEqual(2)
    expect(createdLecture2.startAt).toEqual('10:00')

    res = await request(app)
        .get('/lectures')

    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject([createdLecture1, createdLecture2])
  })

  it('Should create lectures in the room gaps for the second day', async () => {
    let lecture = {
      title: 'Lecture 1',
      description: 'Some description',
      speakers: ['John Doe'],
      duration: 240, // 4 hours
      day: "secondDay"
    }
    let res = await request(app)
      .post('/lectures').send(lecture)

    expect(res.statusCode).toBe(201)
    let createdLecture1 = res.body
    expect(createdLecture1.room).toEqual(1)
    expect(createdLecture1.startAt).toEqual('10:00')

    // The lecture will end at 14:00 so there is a gap of 1h until the end of the day 15:00

    let lecture2 = {
      title: 'Lecture 2',
      description: 'Some description',
      speakers: ['Jane Doe'],
      duration: 120,
      day: "secondDay"
    }
    res = await request(app)
        .post('/lectures').send(lecture2)

    expect(res.statusCode).toBe(201)
    let createdLecture2 = res.body
    expect(createdLecture2.room).toEqual(2) // In a new room
    expect(createdLecture2.startAt).toEqual('10:00')


    let lecture3 = {
      title: 'Lecture 3',
      description: 'Some description',
      speakers: ['Jane Doe'],
      duration: 10,
      day: "secondDay"
    }
    res = await request(app)
        .post('/lectures').send(lecture3)

    expect(res.statusCode).toBe(201)
    let createdLecture3 = res.body
    expect(createdLecture3.room).toEqual(1) // FIXME the lecture should be placed into the room 1

    res = await request(app)
      .get('/lectures')

    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject([createdLecture1, createdLecture2, createdLecture3])
  })

  it.skip('Should create lectures on the correct room independently of the order of the lecturesDay', async () => {
    let lecture1room1 = {
      title: 'Lecture 1',
      description: 'Some description',
      speakers: ['John Doe'],
      duration: 360, // 6 hours
      day: "firstDay"
    }
    const res1 = await request(app)
      .post('/lectures').send(lecture1room1)
    expect(res1.statusCode).toBe(201)
    let createdLecture1 = res1.body
    expect(createdLecture1.room).toEqual(1)

    let lecture2room1 = {
      title: 'Lecture 1 second day',
      description: 'Some description',
      speakers: ['John Doe'],
      duration: 240, // 4 hours
      day: "secondDay"
    }
    const res2 = await request(app)
      .post('/lectures').send(lecture2room1)
    expect(res2.statusCode).toBe(201)
    let createdLecture2 = res1.body
    expect(createdLecture2.room).toEqual(1)
    expect(createdLecture2.day).toEqual('secondDay')

    let lecture1room2 = {
      title: 'Lecture 2 first day room2',
      description: 'Some description',
      speakers: ['John Doe'],
      duration: 240, // 4 hours
      day: "firstDay"
    }
    const res3 = await request(app)
      .post('/lectures').send(lecture1room2)
    expect(res3.statusCode).toBe(201)
    let createdLecture3 = res3.body
    expect(createdLecture3.room).toEqual(2)
    expect(createdLecture3.day).toEqual('firstDay')
  })
})
