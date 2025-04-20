import express from 'express'
import { 
    createKondisi,
    getAllKondisi,
    getSingleKondisi,
    updateKondisi,
    deleteKondisi } from '../../controllers/kondisi/kondisiController'
import mongooseIdMiddleware from '../../middleware/validateMongoIdMiddleware'
import { kondisiValidator } from '../../validator/kondisiValidator'

const router = express.Router()

router.route('/')
    .get(getAllKondisi)
    .post(kondisiValidator, createKondisi)

router.route('/:id')
    .get(mongooseIdMiddleware, getSingleKondisi)
    .patch(mongooseIdMiddleware, kondisiValidator, updateKondisi)
    .delete(mongooseIdMiddleware, deleteKondisi)

export default router