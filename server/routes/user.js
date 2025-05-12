const express = require ('express')
const { signup, signin, user, getUsers } = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.put('/',authMiddleware, user)
router.get('/bulk', getUsers)

module.exports = router;