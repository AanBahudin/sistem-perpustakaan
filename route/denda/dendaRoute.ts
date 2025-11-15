import express from 'express'
import { getDendaKeterlambatan, createDendaKeterlambatan, editDendaKeterlambatan, getDendaKeterlambatanWithId } from '../../controllers/denda/dendaKeterlambatanController'
import { createDendaValidator } from '../../validator/dendaValidator'

const router = express.Router()

router.route('/')
    .get(getDendaKeterlambatan)
    .post(createDendaValidator, createDendaKeterlambatan)
    
    router.route('/withId')
    .get(getDendaKeterlambatanWithId)
    
router.route('/:id')
    .patch(createDendaValidator, editDendaKeterlambatan)


export default router