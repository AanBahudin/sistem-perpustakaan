import { Express } from 'express'

import authRoute from './route/auth/authRoute'
import userRoute from './route/pengguna/penggunaRoute'
import pustakawanRoute from './route/pustakawan/pustakawanRoute'
import prodiRoute from './route/prodi/prodiRoute'
import pinjamanRoute from './route/pinjaman/pinjamanRoute'
import pengembalianRoute from './route/pengembalian/pengembalianRoute'
import durasiRoute from './route/durasi/durasiRoute'
import perpanjanganRoute from './route/perpanjangan/perpanjanganRoute'
import bukuRoute from './route/buku/bukuRoute'
import kategoriRoute from './route/kategori/kategoriRoute'
import kondisiRoute from './route/kondisi/kondisiRoute'
import dendaRoute from './route/denda/dendaRoute'
import sukaRoute from './route/suka/sukaRoutes'
import simpanRoute from './route/simpan/simpanRoute'
import searchRoute from './route/search/searchRoute'
import penerbitRoute from './route/penerbit/penerbitRoutes'
import penulisRoute from './route/penulis/penulisRoute'
import landingRoute from './route/landing/LandingRoute'

import { errorHandler } from './errors/errorHandler'

import authenticationMiddleware from './middleware/authenticationMiddleware'
import { 
    prodiMiddlewareAuthorized, 
    pustakawanMiddlewareAuthorized, 
    userMiddlewareAuthorized } from './middleware/roleBasedMiddleware'

export const routeWrapper = (app: Express) => {

    app.use('/api/v1/auth', authRoute)
    app.use('/api/v1/user', authenticationMiddleware, userRoute)
    app.use('/api/v1/pustakawan', authenticationMiddleware, pustakawanMiddlewareAuthorized, pustakawanRoute)
    app.use('/api/v1/prodi', authenticationMiddleware, prodiMiddlewareAuthorized, prodiRoute)
    app.use('/api/v1/pinjaman', authenticationMiddleware, pinjamanRoute)
    app.use('/api/v1/durasi', authenticationMiddleware, durasiRoute)
    app.use('/api/v1/perpanjangan', authenticationMiddleware, perpanjanganRoute)
    app.use('/api/v1/buku', authenticationMiddleware, bukuRoute)
    app.use('/api/v1/pengembalian', authenticationMiddleware, pengembalianRoute)
    app.use('/api/v1/kategori', authenticationMiddleware, kategoriRoute)
    app.use('/api/v1/kondisi', authenticationMiddleware, pustakawanMiddlewareAuthorized, kondisiRoute)
    app.use('/api/v1/denda', authenticationMiddleware, pustakawanMiddlewareAuthorized, dendaRoute)
    app.use('/api/v1/suka', authenticationMiddleware, userMiddlewareAuthorized, sukaRoute)
    app.use('/api/v1/simpan', authenticationMiddleware, userMiddlewareAuthorized, simpanRoute)
    app.use('/api/v1/search', authenticationMiddleware, userMiddlewareAuthorized, searchRoute)
    app.use('/api/v1/penerbit', authenticationMiddleware, penerbitRoute)
    app.use('/api/v1/penulis', authenticationMiddleware, penulisRoute)
    app.use('/api/v1/landing', landingRoute)


    app.use(errorHandler)
}