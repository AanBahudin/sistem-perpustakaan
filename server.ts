import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import {v2 as cloudinary} from 'cloudinary'

import databaseConnectionFunction from './db/connect'

import path from 'path'
import http from 'http'
import { routeWrapper } from './routeWrapper'
import { initSocket } from './sockets/soket'


const app = express()
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'))

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

routeWrapper(app)

const startServer = async() => {
    try {
        await databaseConnectionFunction(process.env.MONGO_URL as string)
        const server = http.createServer(app)

        initSocket(server)
         
        // serving server on PORT 4000
        server.listen(4000, () => {
            console.log('server is running')
        })
    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'something is wrong'
        console.log(errorMsg)
        process.exit(1)
    }
}

startServer()