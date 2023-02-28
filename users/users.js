import express from "express";

const userRouter = express.Router()

userRouter.post('/login', (req, res) => {
    res.send('login')
})
userRouter.use((req, res, next) => {
    console.log('Handler of users')
    next()
})
userRouter.post('/register', (req, res) => {
    res.send('register')
})

export { userRouter }
