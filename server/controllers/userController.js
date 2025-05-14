const User = require("../models/usersSchema")
const bcrypt = require('bcrypt')
const { signupSchema, signinSchema, updateInfoSchema } = require('../validations/types')
const jwt = require('jsonwebtoken')
const JWT_SECRET = require("../config/config")
const Account = require("../models/accountSchema")

//Signup
exports.signup = async (req, res) => {
    const parsedInputs = signupSchema.safeParse(req.body);
    if (!parsedInputs.success) {
        const errors = parsedInputs.error.flatten().fieldErrors;
        return res.status(400).json({ errors }); //400 Bad Request – validation error
    }

    const { username, email, password, firstName, lastName } = parsedInputs.data;
    const existingUser = await User.findOne({ userName: username });
    if (existingUser) {
        return res.status(409).json({ message: "Username already exists" }); //409 Conflict
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        userName: username,
        email: email,
        firstName,
        lastName,
        password: hashedPassword
    });

    const userId = user._id;

    const account = await Account.create({
        userId,
        balance: Math.floor(Math.random() * 100001)
    });

    res.status(201).json({ //201 Created
        message: "User Created Successfully"
    });
};

exports.signin = async (req, res) => {
    const parsedInputs = signinSchema.safeParse(req.body);
    if (!parsedInputs.success) {
        const errors = parsedInputs.error.flatten().fieldErrors;
        return res.status(400).json({ errors }); //400 Bad Request – invalid input
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" }); //401 Unauthorized
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" }); //401 Unauthorized
    }

    const token = jwt.sign(
        { userId: user._id, username: user.userName, email },
        process.env.JWT_SECRET,
        { noTimestamp: true, expiresIn: '1h' }
    );

    res.status(200).json({
        message: "Logged in Successfully",
        token: `Bearer ` + token
    });
};

exports.user = async (req, res) => {
    const { userId, password, firstName, lastName } = req.body;

    if (!password && !firstName && !lastName) {
        return res.status(400).json({ error: "Please provide at least one field to update" }); //400 Bad Request
    }

    const parsedInputs = updateInfoSchema.safeParse(req.body);
    if (!parsedInputs.success) {
        const errors = parsedInputs.error.flatten().fieldErrors;
        return res.status(400).json({ errors }); //400 Bad Request
    }

    let hashedPassword;
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
    }

    try {
        const updateData = {};
        if (hashedPassword) updateData.password = hashedPassword;
        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;

        await User.findOneAndUpdate({ _id: userId }, updateData);

        res.status(200).json({
            message: "Updated Successfully"
        });

    } catch (err) {
        console.error("Update Error:", err);
        return res.status(500).json({ message: "Internal Server Error" }); //500 Server Error
    }
};

exports.getUsers = async (req, res) => {
    try {
        const filter = req.query.filter || "";

        const users = await User.find({
            $or: [
                { firstName: { $regex: filter, $options: 'i' } },
                { lastName: { $regex: filter, $options: 'i' } }
            ]
        });

        const formattedUsers = users.map(user => ({
            username: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id.toString()
        }));

        res.status(200).json({ users: formattedUsers });

    } catch (err) {
        console.error("Error fetching users:", err.message);
        res.status(500).json({
            error: "Failed to fetch users. Please try again later."
        });
    }
};
