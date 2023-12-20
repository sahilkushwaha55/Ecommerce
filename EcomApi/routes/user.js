const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken')
const userModel = require('../models/userModel')
const CryptoJS = require('crypto-js')

const router = require('express').Router()

//update user

router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString()
    }

    try {
        const updatedUser = await userModel.findByIdAndUpdate(req.user.id, {
            $set: req.body
        }, { new: true })
        return res.status(200).json(updatedUser)
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
})

// Delete user


router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try{
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).json('User has been deleted')
    }
    catch(err){
        return res.status(500).json(err.message)
    }
})


//get user detail


router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
    try{
        const user = await userModel.findById(req.params.id)
        const { password, ...others} = user._doc
        return res.status(200).json(others)
    }
    catch(err){
        return res.status(500).json(err.message)
    }
})


//get all user detail for admin


router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new
    try{
        const users = query ? await userModel.find().sort({ _id : -1 }).limit(1) : await userModel.find()
        return res.status(200).json(users)
    }
    catch(err){
        return res.status(500).json(err.message)
    }
})

module.exports = router