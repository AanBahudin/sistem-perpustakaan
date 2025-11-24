import express from 'express'
import { 
    createKondisi,
    getAllKondisi,
    getSingleKondisi,
    updateKondisi,
    deleteKondisi } from '../../controllers/kondisi/kondisiController'
import mongooseIdMiddleware from '../../middleware/validateMongoIdMiddleware'
import { kondisiValidator } from '../../validator/kondisiValidator'
import { pustakawanMiddlewareAuthorized } from '../../middleware/roleBasedMiddleware'

const router = express.Router()

router.route('/')
    .get(getAllKondisi)
    .post(pustakawanMiddlewareAuthorized, kondisiValidator, createKondisi)

router.route('/:id')
    .get(pustakawanMiddlewareAuthorized, mongooseIdMiddleware, getSingleKondisi)
    .patch(pustakawanMiddlewareAuthorized, mongooseIdMiddleware, kondisiValidator, updateKondisi)
    .delete(pustakawanMiddlewareAuthorized, mongooseIdMiddleware, deleteKondisi)

export default router