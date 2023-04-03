const express = require('express');
const router = express.Router();
const passport = require('passport');
// home Controller
const homeController = require('../controllers/home_controller');

//home page

router.get('/',passport.checkAuthentication,homeController.home);

router.use('/user',require('./user'));

router.use('/task',require('./tasks'));



module.exports=router;