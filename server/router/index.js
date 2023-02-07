const userController = require('../controllers/user-controller')
const Router = require('express').Router
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')
const roomController = require('../controllers/room-controller')

const router = new Router()

router.post(
	'/registration',
	body('email').isEmail(),
	body('password').isLength({ min: 3, max: 32 }),
	userController.registration
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/rooms/create', roomController.createRoom)
router.post('/rooms/:link/addTask', roomController.addTask)
router.post('/rooms/:link/deleteTask', roomController.deleteTask)
router.post('/rooms/:link/setTaskType', roomController.setTaskType)
router.get('/rooms/:link/getData', roomController.getRoomData)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)

module.exports = router
