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
    if (!parsedInputs.success) {
        await session.abortTransaction();
        return res.status(400).json({ errors: parsedInputs.error.flatten().fieldErrors });
    }

    const { to, amount } = req.body;
    const fromUserId = req.body.userId;

    const fromAccount = await Account.findOne({ userId: fromUserId }).session(session);
    if (fromAccount.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({ message: "Insufficient balance" });
    }

    const toUser = await User.findOne({ userName: to }).session(session);
    if (!toUser) {
        await session.abortTransaction();
        return res.status(400).json({ message: "Invalid receiver username" });
    }

    // Deduct from sender
    await Account.updateOne(
        { userId: fromUserId },
        { $inc: { balance: -amount } }
    ).session(session);

    // Add to receiver
    await Account.updateOne(
        { userId: toUser._id },
        { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Transfer Successful" });
};
