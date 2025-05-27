import express from 'express'
import { createOrFetchSuka, addOrDeleteData } from '../../controllers/suka/sukaControllers'



const router = express.Router()

router.route('/')
    .get(createOrFetchSuka)
    .post(addOrDeleteData)


export default router