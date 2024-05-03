import 'dotenv/config'
import express from 'express'
import userRoutes from './routes/user.route.js'
import transferRoutes from './routes/transfer.route.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/transfer', transferRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})