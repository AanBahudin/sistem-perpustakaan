import express from 'express'
import {
    pengajuanPerpanjangan,
    getAllPerpanjangan,
    getSinglePerpanjangan,
    terimaPerpanjangan,
    getAllPerpanjanganUser,
    editPerpanjanganUser,
    batalPerpanjanganUser
} from '../../controllers/perpanjangan/perpanjanganController'
import { deletePerpanjanganValidator, editPerpanjanganInputValidator, idPerpanjanganValidator, perpanjanganInputValidator, terimaPerpanjanganValidator, userValidator } from '../../validator/perpanjanganValidator'
import { pustakawanMiddlewareAuthorized, userMiddlewareAuthorized } from '../../middleware/roleBasedMiddleware'

const router = express.Router()

router.route('/user')
    .get(userMiddlewareAuthorized, getAllPerpanjanganUser)
    .post(userMiddlewareAuthorized, perpanjanganInputValidator, pengajuanPerpanjangan)

router.route('/user/:id')
    .get(
        userMiddlewareAuthorized, 
        idPerpanjanganValidator, 
        userValidator, 
        getSinglePerpanjangan)
    .patch(
        userMiddlewareAuthorized, 
        idPerpanjanganValidator, 
        userValidator, 
        editPerpanjanganInputValidator, 
        editPerpanjanganUser)
    .delete(
        userMiddlewareAuthorized,
        idPerpanjanganValidator,
        userValidator,
        deletePerpanjanganValidator,
        batalPerpanjanganUser)


/*
    Route dibawah dikhususkan hanya boleh diakses oleh pustakawan saja
*/

router.route('/')
    .get(pustakawanMiddlewareAuthorized, getAllPerpanjangan)

router.route('/data/:id')
    .get(pustakawanMiddlewareAuthorized, getSinglePerpanjangan)

router.route('/accept')
    .post(pustakawanMiddlewareAuthorized, terimaPerpanjanganValidator, terimaPerpanjangan)

export default router