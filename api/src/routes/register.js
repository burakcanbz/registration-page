const express = require('express')
const {userLoginController, userSignupController} = require('../controllers/userRegistration');
const registerRouter = express.Router();


registerRouter.post('/login', userLoginController);
registerRouter.post('/signup', userSignupController);

exports.registerRouter = registerRouter;