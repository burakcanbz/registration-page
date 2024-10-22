const express = require('express')
const {userLoginController, userSignupController, userLogoutController, verifyToken, refreshToken, userPageController} = require('../controllers/userRegistration');
const registerRouter = express.Router();


registerRouter.post('/login', userLoginController);
registerRouter.post('/signup', userSignupController);
registerRouter.get('/user', verifyToken, userPageController)
registerRouter.get('/refresh', refreshToken, verifyToken, userPageController)
registerRouter.get('/logout', verifyToken, userLogoutController)
exports.registerRouter = registerRouter;