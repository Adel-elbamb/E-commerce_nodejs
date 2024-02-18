import express from 'express'
import path from 'path'
import bootstrap from './src/index.router.js'
import dotenv from 'dotenv'
const app = express()
dotenv.config({path : path.resolve('./config/.env')})
const port = +process.env.PORT
bootstrap(app, express)



app.listen(port, () => console.log(`Example app listening on port ${port}!`))