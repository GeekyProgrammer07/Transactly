const { default: mongoose } = require("mongoose");
const Account = require("../models/accountSchema");
const User = require("../models/usersSchema");
const { tranferSchema } = require("../validations/types");

exports.balance = async (req, res) => {
    const userId = req.body.userId;
    const userAccount = await Account.findOne({
        userId: userId
    })
    res.status(200).json({
        balance: userAccount.balance
    })
};

exports.transfer = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    const parsedInputs = tranferSchema.safeParse(req.body);
    console.log("Hello world");
    console.log(req.body);
    console.log(parsedInputs);
    if (!parsedInputs.success) {
        await session.abortTransaction();
        const errors = parsedInputs.error.flatten().fieldErrors;
        return res.status(400).json({ errors });
    }
    console.log("Hello world");
    
    const { to, amount } = req.body;

    const userId = req.body.userId;
    const userAccount = await Account.findOne({
        userId: userId
    })

    if (userAccount.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "insufficient balance"
        })
    }

    if (!await User.findOne({
        userName: to
    })) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "invalid account"
        })
    }

    await Account.updateOne({
        userId: userId
    }, {
        $inc: {
            balance: -amount
        }
    }).session(session);

    await Account.updateOne({
        userName: to
    }, {
        $inc: {
            balance: amount
        }
    }).session(session);

    await session.commitTransaction();

    res.status(200).json({
        message: "Transfer Successful"
    })
};

