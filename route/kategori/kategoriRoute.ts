import express from 'express'
import { kategoriInputValidator } from '../../validator/kategoriValidator'
import mongooseIdMiddleware from '../../middleware/validateMongoIdMiddleware'
import { createKategori, getAllKategori, hapusKategori } from '../../controllers/kategori/kategoriController'

const router = express.Router()
 
router.route('/')
    .get(getAllKategori)
    .post(kategoriInputValidator, createKategori)

router.route('/:id')
    .delete(mongooseIdMiddleware, hapusKategori)


export default router