const router = require('express').Router()
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
const rateLimit = require('express-rate-limit')
const userModel = require('../models/userModel')
const cartModel = require('../models/cartModel')

router.post("/register", async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    if (!firstName) return res.status(400).json("First name required")
    if (!lastName) return res.status(400).json("Last name required")
    if (!email) return res.status(400).json("Email required")
    if (!password) return res.status(400).json("Password required")

    const searchEmail = await userModel.findOne({ email })
    if (searchEmail) return res.status(400).json('Registered Email')

    const encryptPassword = CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString()

    const newUser = new userModel({
        firstName, lastName, email, password: encryptPassword
    })

    try {
        const saveUser = await newUser.save()

        await cartModel.create({userId: saveUser._id})

        return res.status(201).json("user created")
    }
    catch (err) {
        res.status(500).json(err.message)
    }
})

const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 5,
    message: '5 login try limit exceeded. Please wait for 10 minutes',
    handler: (req, res, next, options) => {
        res.status(options.statusCode).json(options.message)
    }
})

router.post('/login', loginLimiter, async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (!user) return res.status(401).json("wrong credentials")

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8)

        if (hashedPassword !== req.body.password) return res.status(401).json("wrong credentials")

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SEC,
            { expiresIn: "30d" })

        res.cookie('accessToken', accessToken, {
            maxAge: 30 * 24 * 60 * 60 *1000,
            httpOnly: true,
            sameSite: 'strict'
        })

        const { password, ...others } = user._doc

        return res.status(200).json(others)
    }
    catch (err) {
        res.status(500).json(err.message)
    }
})

router.delete('/logout', (req, res) => {
    return res.clearCookie('accessToken').status(204).json("Logout")
})

module.exports = router