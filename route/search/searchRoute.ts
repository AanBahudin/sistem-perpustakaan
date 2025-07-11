import express from 'express'
import { searchController } from '../../controllers/search/searchController'

const router = express.Router()

router.route('/')
    .get(searchController)

export default router