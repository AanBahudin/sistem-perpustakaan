import express from 'express'
import { searchController, typedSearchController } from '../../controllers/search/searchController'

const router = express.Router()

router.route('/')
    .get(searchController)

router.route('/typed')
    .get(typedSearchController)

export default router