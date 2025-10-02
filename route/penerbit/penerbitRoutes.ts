import express from 'express'
import { getAllPenerbit } from '../../controllers/penerbit/penerbitControllers'

const router = express.Router()

router.route('/')
    .get(getAllPenerbit)

export default router