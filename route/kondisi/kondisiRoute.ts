import express from 'express'
import { 
    createKondisi,
    getAllKondisi,
    getSingleKondisi,
    updateKondisi,
    deleteKondisi } from '../../controllers/kondisi/kondisiController'
import mongooseIdMiddleware from '../../middleware/validateMongoIdMiddleware'

const router = express.Router()

router.route('/')
    .get(getAllKondisi)
    .post(createKondisi)

router.route('/:id')
    .get(mongooseIdMiddleware, getSingleKondisi)
    .patch(mongooseIdMiddleware, updateKondisi)
    .delete(mongooseIdMiddleware, deleteKondisi)

export default router