
const Jwt = require("jsonwebtoken");
const { Register, } = require("../../models/authentication/authModel");
const bcrypt = require('bcrypt')
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { text, json } = require("body-parser");

const register = async (req, res) => {

    const { userName, email, password } = req.body
    try {
        if (!userName || !email || !password) {
            return res.status(400).send({
                success: false,
                message: " User name, email and password is required"
            })
        }

        const existingUser = await Register.findOne({ email: email })
        if (existingUser) {
            res.send("user already exists")
        } else {

            // res.status(200).json({ msg: "user registered successfully" });
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'darius.hamill24@ethereal.email',
                    pass: 'SVTzHEYnSRwjBt14yh'
                }
            });

            const mailOpetions = {
                from: "smtp.ethereal.email",
                to: email,
                subject: "Activate Your Account",
                text: "Please use the following link to activate your account: http://localhost:3000/activate",
                html: `
                        <p>Thank you for registering with us!</p>
                        <p>To activate your account, please click the link below:</p>
                        <p>
                            <a href="http://localhost:3000/activate" target="_blank" style="text-decoration: none; color: #007bff; font-weight: bold;">
                                Activate Your Account
                            </a>
                        </p>
                        <p>If you did not register for this account, you can safely ignore this email.</p>
    `
            };

            transporter.sendMail(mailOpetions, (err, info) => {
                if (err) {
                    return console.log("Error ocurred ")
                }
                console.log("Message sent", info.response)
            })

            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new Register({ userName, email, password: hashedPassword });
            await newUser.save();
            res.status(200).json({ message: "Registration successful! Check your inbox to activate your account." });

        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const Login = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: "email and password fields are required"
            })
        };

        const existsUser = await Register.findOne({ email: email })
        if (!existsUser) {
            return res.status(401).json({ message: "Invalid email " })
        };
        const activeFlag = await Register.findOne({ email: email })
        if (activeFlag.isActive === "0") {
            return res.status(401).json({
                success: false,
                message: "Please activate your account first."
            })
        }

        const isMatch = await bcrypt.compare(password, existsUser.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid  password" })
        };

        const token = Jwt.sign({ id: existsUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.json({ message: "Successfully logged in", token });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body

    const user = await Register.findOne({ email: email })
    if (!user) {
        res.status(400).json({ message: "user not found" })
    }

    token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'darius.hamill24@ethereal.email',
            pass: 'SVTzHEYnSRwjBt14yh'
        }
    });


    const mailOpetions = {
        from: "smtp.ethereal.email",
        to: user,
        subject: "Demo project",
        text: "This is rest password mail",
        html: `<p>This is your reset password link: <a target="_blank" href="http://localhost:3000/reset-password/${user._id}/${token}">Click here</a> to reset your password.</p>`
    }
    transporter.sendMail(mailOpetions, (err, info) => {
        if (err) {
            return console.log("Error ocurred ")
        }
        console.log("Message sent", info.response)
    })
    res.status(200).json({ message: "check inbox" })

}

const resetPassword = async (req, res) => {
    const { id, token } = req.params; // Assuming you pass userId and token in the URL params
    const { password } = req.body;

    try {
        const user = await Register.findOne({ _id: id });

        if (!user) {
            return res.status(401).json({
                success: false,
                msg: "User does not exist"
            });
        }
        const isTokenValid = Jwt.verify(token, process.env.JWT_SECRET)
        if (!isTokenValid) {
            return res.status(401).json({
                message: "user token not valid",
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await Register.updateOne({ _id: id }, { $set: { password: hashedPassword } });

        res.status(200).json({ message: "Password reset successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const isActivation = async (req, res) => {
    const { isActive, email } = req.body
    try {
        const user = await Register.findOne({ email: email })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "please enter Valid email"
            })
        } else if (Register.isActive === "1") {
            return res.status(401).json({
                success: false,
                message: "user already activated"
            })
        } else {

            await Register.updateOne({ email: email }, { $set: { isActive: isActive } });
            res.status(200).json({
                success: true,
                message: "User activated successfully"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}





module.exports = { register, Login, forgotPassword, resetPassword, isActivation }