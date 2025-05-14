const express = require('express');
const userRouter = require('./user')
const accountRouter = require('./account')

const router = express.Router();

router.use('/user', userRouter);
router.use('/account', accountRouter);

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong on the server'
    });
});

module.exports = router;