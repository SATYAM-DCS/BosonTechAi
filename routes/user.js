const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');

router.get('/signup',userController.signup);

router.post('/create',userController.createUser);

router.get('/signin',userController.signin);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/signin'}
),userController.createSession);


router.get('/signout',userController.signOut);

module.exports=router;