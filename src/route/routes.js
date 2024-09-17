
const express = require('express');
const router = express.Router();
const userController = require('../Modules/User/Controllers/userController')
const movieController = require('../Modules/Movies/Controllers/movieController');
const TheatreController = require('../Modules/Theatres/Controllers/theatreController');
const ShowController = require('../Modules/showTime/Controllers/showController');
const upload = require('../Middlewares/multerMiddleware');
const emailVerify = require('../utils/emailVerification');

//Authentication routes
router.post('/signup',userController.signUp);
router.post('/login',userController.login);

//email verification
router.post('/generate-otp', emailVerify.generateOTP);
router.post('/verify-otp',emailVerify.verifyOTP);


//movie  routes
router.post('/movies', upload.single('poster'), movieController.createMovie);
router.get('/moviesFetch',  movieController.getAllMovies);
router.get('/movieId/:id', movieController.getMovieById);
router.delete('/movieDelete/:id', movieController.deleteMovie);
router.put('/movieEdit/:id',movieController.EditMovie);

//theatre  routes
router.post('/theatres',  TheatreController.registerTheatre);
router.get('/theatresFetch',  TheatreController.getAllTheatres);
router.delete('/theatreDelete/:id', TheatreController.deleteTheatre);
router.put('/theatreEdit/:id',TheatreController.EditTheatre);

//show time  routes
router.post('/showTimings', ShowController.createShowTime);
router.get('/showsFetch',ShowController.getAllShowTimes);
router.delete('/showsDelete/:id', ShowController.deleteShow);
router.put('/showsEdit/:id',  ShowController.EditShow);

module.exports = router;