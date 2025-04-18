import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

import authRoute from './route/auth/authRoute'
import userRoute from './route/pengguna/penggunaRoute'
import pustakawanRoute from './route/pustakawan/pustakawanRoute'
import prodiRoute from './route/prodi/prodiRoute'
import pinjamanRoute from './route/pinjaman/pinjamanRoute'
import pengembalianRoute from './route/pengembalian/pengembalianRoute'
import durasiRoute from './route/durasi/durasiRoute'
import perpanjanganRoute from './route/perpanjangan/perpanjanganRoute'
import bukuRoute from './route/buku/bukuRoute'

import databaseConnectionFunction from './db/connect'

import authenticationMiddleware from './middleware/authenticationMiddleware'
import { prodiMiddlewareAuthorized, pustakawanMiddlewareAuthorized, userMiddlewareAuthorized } from './middleware/roleBasedMiddleware'

import { errorHandler } from './errors/errorHandler'
import path from 'path'

import Buku from './model/Buku'

const app = express()
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'))

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

app.get('/', async(req, res) => {
    await Buku.updateMany({}, {dihapus: false})
})

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user', authenticationMiddleware, userMiddlewareAuthorized, userRoute)
app.use('/api/v1/pustakawan', authenticationMiddleware, pustakawanMiddlewareAuthorized, pustakawanRoute)
app.use('/api/v1/prodi', authenticationMiddleware, prodiMiddlewareAuthorized, prodiRoute)
app.use('/api/v1/pinjaman', authenticationMiddleware, pinjamanRoute)
app.use('/api/v1/durasi', authenticationMiddleware, durasiRoute)
app.use('/api/v1/perpanjangan', authenticationMiddleware, perpanjanganRoute)
app.use('/api/v1/buku', authenticationMiddleware, bukuRoute)
app.use('/api/v1/pengembalian', authenticationMiddleware, pengembalianRoute)

app.use(errorHandler)

const startServer = async() => {
    try {
        await databaseConnectionFunction(process.env.MONGO_URL as string)
        app.listen(4000, () => {
            console.log('server is running')
        })
    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'something is wrong'
        console.log(errorMsg)
        process.exit(1)
    }
}

startServer()