const express = require ('express')
const { getSomething } = require('../controllers/userController')

const router = express.Router()

router.get('/something', getSomething);

module.exports = router;