const express = require('express')
const {userLoginController, userSignupController, verifyToken, userPageController} = require('../controllers/userRegistration');
const registerRouter = express.Router();


registerRouter.post('/login', userLoginController);
registerRouter.post('/signup', userSignupController);
registerRouter.get('/user', verifyToken, userPageController)
// registerRouter.get('/refresh', refreshToken)
exports.registerRouter = registerRouter;