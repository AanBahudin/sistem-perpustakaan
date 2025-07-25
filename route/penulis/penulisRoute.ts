import express from 'express'
import { getAllPenulis } from '../../controllers/penulis/penulisControllers'

const router = express.Router()

router.route('/')
    .get(getAllPenulis)

export default router