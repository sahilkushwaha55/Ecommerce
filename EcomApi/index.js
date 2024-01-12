const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')

dotenv.config()

app.use(helmet())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.FRONT_URL)
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(rateLimit({
    max: 500,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, Please wait for an hour!'
}))
app.use(express.json({ limit: '10kb'}))
app.use(bodyParser.urlencoded())
app.use(cookieParser())
app.use(mongoSanitize())
app.use(xss())

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err))

app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/product", productRoute)
app.use("/api/cart", cartRoute)
app.all('*', (req, res) => res.status(404).json({
    statu: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
}))

app.listen(process.env.PORT || 3000, () => console.log("app running"))