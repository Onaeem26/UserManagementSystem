const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// we will hit the function (view, find, update, delete, create)
router.get('/', userController.view)
router.post('/', userController.find)
router.get('/adduser', userController.form)
router.post('/adduser', userController.create)
router.get('/edituser/:id', userController.edit)
router.post('/edituser/:id', userController.update)
router.get('/:id', userController.delete)
router.get('/viewuser/:id', userController.userDetail)

module.exports = router

