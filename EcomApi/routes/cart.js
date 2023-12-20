const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken')
const cartModel = require('../models/cartModel')

const router = require('express').Router()

// create

router.post('/', verifyToken, async (req, res) => {
    const newCart = new cartModel(req.body)

    try {
        const saveCart = await newCart.save()
        return res.status(200).json(saveCart)
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
})

//update

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    const userId = req.params.id
    const {id, quantity, price, remove} = req.body
    if(!userId) return res.status(400).json("Please login to add product")

    try {
        const findCart = await cartModel.findOne({userId})
        if(!findCart) return res.status(403).json("No cart available")

        if(findCart.products.length > 0){
            const cartProducts = findCart.products.map(product => product.productId)
            if(cartProducts.includes(id)){
                if(remove){
                    const index = cartProducts.indexOf(id)
                    if(findCart.products[index].quantity == 1){
                        const updatedCart = await cartModel.findOneAndUpdate({userId},{
                            $inc: {totalPrice: -price * quantity, totalQuantity: -quantity },
                            $pull: { products: {productId : id}}
                        })
                        return res.status(200).json(updatedCart)
                    }
                    const updatedCart = await cartModel.findOneAndUpdate({userId, "products.productId": id},{
                        $inc: {totalPrice: -price * quantity, totalQuantity: -quantity, "products.$.quantity": -quantity}
                    })
                    return res.status(200).json(updatedCart)
                }

                const updatedCart = await cartModel.findOneAndUpdate({userId, "products.productId": id},{
                    $inc: {totalPrice: price * quantity, totalQuantity: quantity, "products.$.quantity": quantity}
                })
                return res.status(200).json(updatedCart)
            }
            else{
                const updatedCart = await cartModel.findOneAndUpdate({userId},{
                    $push: {products: {productId: id, quantity}},
                    $inc: {totalPrice: quantity * price, totalQuantity: quantity}
                })
                return res.status(200).json(updatedCart)
            }
        }
        const updatedCart = await cartModel.findOneAndUpdate({userId}, {
            $set:{totalPrice: price,totalQuantity: quantity,products: [{productId: id, quantity}]}
        }, { new: true })
        return res.status(200).json(updatedCart)
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
})


//delete

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await cartModel.findByIdAndDelete(req.params.id)
        return res.status(200).json('Cart has been deleted')
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
})


// get user cart

router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await cartModel.findOne({ userId : req.params.id })
        return res.status(200).json(cart)
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
})


// get all cart for admin

router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try{
        const carts = await cartModel.find()
        return res.status(200).json(carts)
    }
    catch(err){
        return res.status(500).json(err.message)
    }
})

module.exports = router