const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Sign Up User
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

// Login User
// const loginUser = async (req, res) => {
//     try {
//         const {email, password} = req.body;
//         // Check User Not Found
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(400).json({
//                 message: "User Not Found!"
//             });
//         }
//         // Compare Password
//         const matchPassword = await bcrypt.compare(password, user.password);
//         if(!matchPassword) {
//             return res.status(400).json({
//                 message: "Wrong Password!"
//             });
//         }
//         // Generate JWT TOKEN
//         const token = jwt.sign(
//             {id: user._id},
//             process.env.JWT_SECRET,
//             {expiresIn: "1d"}
//         )
//         res.status(200).json({
//             message: "Login Successfully",
//             token,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,

//             }
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: "Server Error",
//             error: error.message
//         });
//     }
// }

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required!"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password!"
            });
        }

        const matchPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!matchPassword) {
            return res.status(400).json({
                message: "Invalid email or password!"
            });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is missing from .env");
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            message: "Login Successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.log("Login Error:", error);

        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

module.exports = { SignupUser, loginUser };
