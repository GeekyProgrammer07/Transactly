const express = require ('express')

const { balance, transfer } = require('../controllers/accountController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/balance', authMiddleware, balance)
router.post('/transfer', authMiddleware, transfer)   


module.exports = router;