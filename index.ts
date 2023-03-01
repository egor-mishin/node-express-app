import express, { Request, Response, NextFunction } from 'express'
import {userRouter} from './users/users.js'

const port = '8000'
const  app = express()


app.use((req, res, next) => {
    console.log('Time ', Date.now())
    next()
})
app.get('/hello', (req, res) => {
    res.send('Hello')
})

app.use('/users', userRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.message)
    res.status(500).send(err.message)
})
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
