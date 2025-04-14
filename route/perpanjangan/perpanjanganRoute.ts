import express from 'express'
import {
    pengajuanPerpanjangan,
    getAllPerpanjangan,
    getSinglePerpanjangan,
    terimaPerpanjangan,
    getAllPerpanjanganUser,
    editPerpanjanganUser
} from '../../controllers/perpanjangan/perpanjanganController'
import { editPerpanjanganInputValidator, idPerpanjanganValidator, perpanjanganInputValidator, userValidator } from '../../validator/perpanjanganValidator'
import { pustakawanMiddlewareAuthorized, userMiddlewareAuthorized } from '../../middleware/roleBasedMiddleware'

const router = express.Router()

router.route('/user')
    .get(userMiddlewareAuthorized, getAllPerpanjanganUser)
    .post(userMiddlewareAuthorized, perpanjanganInputValidator, pengajuanPerpanjangan)

router.route('/user/:id')
    .get(userMiddlewareAuthorized, idPerpanjanganValidator, userValidator, getSinglePerpanjangan)
    .patch(
        userMiddlewareAuthorized, 
        idPerpanjanganValidator, 
        userValidator, 
        editPerpanjanganInputValidator, 
        editPerpanjanganUser)

export default router