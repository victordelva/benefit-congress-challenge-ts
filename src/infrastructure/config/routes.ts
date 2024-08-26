export const configureRoutes = (app, { lecturesController }) => {
	app.get('/lectures', lecturesController.findAll());
	app.post('/lectures', lecturesController.create());
};