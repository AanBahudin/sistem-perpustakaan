import express from 'express'

import { getAllBukuUser, getSingleBukuUser, discoveryBuku } from '../../controllers/buku/userBukuController'
import { getAllBukuYearPustakawan } from '../../controllers/buku/pustakawanBukuController'
import {
    getAllBukuPustakawan,
    getAllBukuDipinjamPustakawan,
    getAllBukuDiperpanjangPustakawan,
    getAllBukuDihilangkanPustakawan,
    addBuku,
    getAllBukuDikembalikanPustakawan,
    getSingleBukuPustakawan,
    hapusBuku,
    editBuku
} from '../../controllers/buku/pustakawanBukuController'

import { bukuInputValidator } from '../../validator/bukuValidator'
import { prodiMiddlewareAuthorized, pustakawanMiddlewareAuthorized, userMiddlewareAuthorized } from '../../middleware/roleBasedMiddleware'
import mongoIdMiddleware from '../../middleware/validateMongoIdMiddleware'
import upload from '../../middleware/multerMiddleware'

const router = express.Router()

router.route('/user')
    .get(userMiddlewareAuthorized, getAllBukuUser)

router.route('/year')
    .get(pustakawanMiddlewareAuthorized, getAllBukuYearPustakawan)

router.route('/user/:id')
    .get(userMiddlewareAuthorized, mongoIdMiddleware, getSingleBukuUser)

router.route('/discovery')
    .get(discoveryBuku)

router.route('/pustakawan')
    .get(pustakawanMiddlewareAuthorized, getAllBukuPustakawan)

router.route('/pustakawan/dipinjam')
    .get(pustakawanMiddlewareAuthorized, getAllBukuDipinjamPustakawan)

router.route('/pustakawan/diperpanjang')
    .get(pustakawanMiddlewareAuthorized, getAllBukuDiperpanjangPustakawan)

router.route('/pustakawan/dikembalikan')
    .get(pustakawanMiddlewareAuthorized, getAllBukuDikembalikanPustakawan)

router.route('/pustakawan/dihilangkan')
    .get(pustakawanMiddlewareAuthorized, getAllBukuDihilangkanPustakawan)


router.route('/prodi')
    .get(prodiMiddlewareAuthorized, getAllBukuPustakawan)

router.route('/prodi/dipinjam')
    .get(prodiMiddlewareAuthorized, getAllBukuDipinjamPustakawan)

router.route('/prodi/diperpanjang')
    .get(prodiMiddlewareAuthorized, getAllBukuDiperpanjangPustakawan)

router.route('/prodi/dikembalikan')
    .get(prodiMiddlewareAuthorized, getAllBukuDikembalikanPustakawan)

router.route('/prodi/dihilangkan')
    .get(prodiMiddlewareAuthorized, getAllBukuDihilangkanPustakawan)

router.route('/create')
    .post(pustakawanMiddlewareAuthorized, upload.single('cover'), bukuInputValidator, addBuku)

router.route('/pustakawan/:id')
    .get(pustakawanMiddlewareAuthorized, mongoIdMiddleware, getSingleBukuPustakawan)
    .delete(pustakawanMiddlewareAuthorized, mongoIdMiddleware, hapusBuku)
    .patch(pustakawanMiddlewareAuthorized, mongoIdMiddleware, upload.single('cover'), bukuInputValidator, editBuku)


export default router