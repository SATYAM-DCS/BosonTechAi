const express = require('express');
const passport = require('passport');
const router = express.Router();

const taskController = require('../controllers/tasks');


router.post('/create',passport.checkAuthentication,taskController.addTask);

router.get('/delete/:id',passport.checkAuthentication,taskController.deleteTask)

router.get('/edit/:id',passport.checkAuthentication,taskController.editTaskPage);

router.post('/update',passport.checkAuthentication,taskController.updateTask);

module.exports = router;