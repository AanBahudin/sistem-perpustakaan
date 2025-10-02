import express from 'express'
import {
    pengajuanPerpanjangan,
    getAllPerpanjangan,
    getSinglePerpanjangan,
    terimaPerpanjangan,
    getAllPerpanjanganUser,
    getSinglePerpanjanganUser,
    editPerpanjanganUser,
    batalPerpanjanganUser,
    getSinglePerpanjanganByPeminjamanIdUser,
    tolakPerpanjangan
} from '../../controllers/perpanjangan/perpanjanganController'
import {
    editPerpanjanganInputValidator,
    perpanjanganInputValidator, 
    terimaPerpanjanganValidator, } from '../../validator/perpanjanganValidator'
import { pustakawanMiddlewareAuthorized, userMiddlewareAuthorized } from '../../middleware/roleBasedMiddleware'
import mongooseIdMiddleware from '../../middleware/validateMongoIdMiddleware'
import { isValidMongooseId } from '../../utils/checker'

const router = express.Router()

router.route('/user')
    .get(userMiddlewareAuthorized, getAllPerpanjanganUser)
    .post(userMiddlewareAuthorized, perpanjanganInputValidator, pengajuanPerpanjangan)

router.route('/user/peminjaman/:id')
    .get(userMiddlewareAuthorized, mongooseIdMiddleware, getSinglePerpanjanganByPeminjamanIdUser)

router.route('/user/:id')
    .get(
        userMiddlewareAuthorized,
        mongooseIdMiddleware,
        getSinglePerpanjanganUser)
    .patch(
        userMiddlewareAuthorized, 
        mongooseIdMiddleware,
        editPerpanjanganInputValidator, 
        editPerpanjanganUser)
    .delete(
        userMiddlewareAuthorized,
        mongooseIdMiddleware,
        batalPerpanjanganUser)


/*
    Route dibawah dikhususkan hanya boleh diakses oleh pustakawan saja
*/

router.route('/')
    .get(pustakawanMiddlewareAuthorized, getAllPerpanjangan)

router.route('/data/:id')
    .get(pustakawanMiddlewareAuthorized, getSinglePerpanjangan)

router.route('/accept/:id')
    .get(pustakawanMiddlewareAuthorized, mongooseIdMiddleware, terimaPerpanjangan)

router.route('/decline/:id')
    .get(pustakawanMiddlewareAuthorized, mongooseIdMiddleware, tolakPerpanjangan)

export default router