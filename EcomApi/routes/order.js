const router = require('express').Router()
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require('../middleware/verifyToken')
const orderModel = require('../models/orderModel')

// create

router.post('/', verifyToken, async (req, res) => {
    const newOrder = new orderModel(req.body)

    try {
        const saveOrder = await newOrder.save()
        return res.status(200).json(saveOrder)
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
})

//update

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await orderModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        return res.status(200).json(updatedOrder)
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
})


//delete

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await orderModel.findByIdAndDelete(req.params.id)
        return res.status(200).json('order has been deleted')
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
})


// get user order

router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await orderModel.find({ userId : req.params.id })
        return res.status(200).json(orders)
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
})


// get all order for admin

router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try{
        const orders = await orderModel.find()
        return res.status(200).json(orders)
    }
    catch(err){
        return res.status(500).json(err.message)
    }
})

module.exports = router