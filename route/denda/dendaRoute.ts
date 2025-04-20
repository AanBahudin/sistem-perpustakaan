import express from 'express'
import { getDendaKeterlambatan, createDendaKeterlambatan } from '../../controllers/denda/dendaKeterlambatanController'
import mongooseIdMiddleware from '../../middleware/validateMongoIdMiddleware'
import { createDendaValidator } from '../../validator/dendaValidator'

const router = express.Router()

router.route('/')
    .get(getDendaKeterlambatan)
    .post(createDendaValidator, createDendaKeterlambatan)

export default router