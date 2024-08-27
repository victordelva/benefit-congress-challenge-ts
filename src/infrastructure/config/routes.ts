import {validateCreateLecture} from "../controllers/lectures.validator";

export const configureRoutes = (app, { lecturesController }) => {
	app.get('/lectures', lecturesController.findAll());
	app.post('/lectures', validateCreateLecture, lecturesController.create());
};