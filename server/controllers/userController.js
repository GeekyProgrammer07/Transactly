const User = require("../models/Users")
const bcrypt = require('bcrypt')
const { signupSchema, signinSchema } = require('../validations/types')
const jwt = require('jsonwebtoken')
const JWT_SECRET = require("../config/config")

//Signup
exports.signup = async (req, res) => {
    //Validation
    const parsedInputs = signupSchema.safeParse(req.body);
    if (!parsedInputs.success) {
        const errors = parsedInputs.error.flatten().fieldErrors;
        return res.status(400).json({ errors });
    }

    const { username, email, password, firstName, lastName } = parsedInputs.data;
    const existingUser = await User.findOne({ userName: username });
    if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        userName: username,
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: hashedPassword
    });

    await user.save();

    //Generating JSON Web Token
    const token = jwt.sign({ userId: user._id, username: username, email: email }, process.env.JWT_SECRET, { noTimestamp: true, expiresIn: '1h' })
    res.status(200).json({
        message: "User Created Successfully",
        token: `Bearer ` + token
    })
}

exports.signin = async (req, res) => {
    //Validation
    const parsedInputs = signinSchema.safeParse(req.body);
    if (!parsedInputs.success) {
        const errors = parsedInputs.error.flatten().fieldErrors;
        return res.status(400).json({ errors });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(411).json({
            message: "Error while logging in"
        })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(411).json({
            message: "Error while logging in"
        })
    }

    const token = jwt.sign({ userId: user._id, username: user.userName, email: email }, process.env.JWT_SECRET, { noTimestamp: true, expiresIn: '1h' })
    res.status(200).json({
        message: "Logged in Successfully",
        token: `Bearer ` + token
    })
}
