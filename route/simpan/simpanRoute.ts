import express from 'express'
import {
    fetchOrCreate,
    addOrDelete
} from '../../controllers/simpan/simpanController'


const router = express.Router()

router.route('/')
    .get(fetchOrCreate)
    .post(addOrDelete)


export default router