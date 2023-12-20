const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    // const authHeader = req.headers.token
    // if(!authHeader) return res.status(401).json("You are not authenticated")

    // const token = authHeader.split(" ")[1]
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json("Your are not authentcated")
    
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
        if(err) return res.status(403).json("Token is not valid")
        req.user = user
        next()
    })
}


const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id == req.params.id || req.user.isAdmin) next()
        else return res.status(403).json('You are not allowed to do that')
    })
}


const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin) next()
        else return res.status(402).json('You are not allowed to do that')
    })
}

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin}