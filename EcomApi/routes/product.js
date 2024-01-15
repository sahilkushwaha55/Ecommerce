const { verifyTokenAndAdmin } = require('../middleware/verifyToken')
const productModel = require('../models/productModel')

const router = require('express').Router()

//Create

router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const newProdcut = new productModel(req.body)

    try {
        const saveProdcut = await newProdcut.save()
        return res.status(200).json(saveProdcut)
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).json(err.message)
    }
})

//update

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        return res.status(200).json(updatedProduct)
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
})

//delete

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id)
        return res.status(200).json('Product has been deleted')
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
})

// get product

router.get("/find/:id", async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id)
        return res.status(200).json(product)
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
})

//get all prodcut

router.get("/", async (req, res) => {
    const { qCategory, size, color, sort, name } = req.query

    try {
        let filterObj = {}
        let sortFilter = { }
        if (size) filterObj.size = { $in : size }
        if (qCategory) filterObj.categories = { $in : qCategory}
        if (color) filterObj.color = { $in : color }
        if (name) filterObj.title = { $regex: name.trim(), $options: 'i' }
        if (sort) sortFilter.price = sort
        sortFilter._id = -1

        const products = await productModel.find(filterObj).sort(sortFilter).limit(20)

        return res.status(200).json(products)
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
})

module.exports = router