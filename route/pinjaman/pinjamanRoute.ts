import express from 'express'
import {
    requestPinjaman,
    terimaPinjaman,
    tambahPinjaman,
    getAllPinjamanAktif,
    getSinglePinjaman,
    hapusPinjaman,
    getAllRequestedPinjaman,
    getAllPinjaman
 } from '../../controllers/pinjaman/pinjamanController'

import { idPinjamanValidator, inputPengajuanPeminjamanValidator, terimaPinjamanValidator

 } from '../../validator/pinjamanValidator'
import { pustakawanMiddlewareAuthorized, userMiddlewareAuthorized } from '../../middleware/roleBasedMiddleware'

const router = express.Router()

// KHUSUS USER
router.route('/request/pinjaman')
    .post(userMiddlewareAuthorized, inputPengajuanPeminjamanValidator, requestPinjaman)

// KHUSUS PUSTAKAWAN
router.route('/pinjaman')
    .get(getAllPinjaman)

router.route('/pinjaman/aktif')
    .get(pustakawanMiddlewareAuthorized, getAllPinjamanAktif)

router.route('/pinjaman/:id')
    .get(idPinjamanValidator, getSinglePinjaman)
    .delete(idPinjamanValidator, hapusPinjaman)

router.route('/requested/pinjaman')
    .get(pustakawanMiddlewareAuthorized, getAllRequestedPinjaman)

router.route('/accept/pinjaman')
    .post(pustakawanMiddlewareAuthorized, terimaPinjamanValidator, terimaPinjaman)

export default router