const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SignupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check Existing User
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User Already Exists."
            });
        }

        // Password Hashing
        const hashPassword = await bcrypt.hash(password, 10);

        // Create New User
        await User.create({
            name,
            email,
            password: hashPassword
        });

        res.status(201).json({
            message: "User Registered Successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

module.exports = { SignupUser };
