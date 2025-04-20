import express from 'express'
import {
    terimaPinjaman,
    tambahPinjaman,
    getAllPinjamanAktif,
    getSinglePinjaman,
    hapusPinjaman,
    getAllPinjaman,
    getAllRequestedPinjaman,
    requestPinjaman,
    getPinjamanUser,
    getSinglePinjamanUser,
    pembatalanPinjamanUser
 } from '../../controllers/pinjaman/pinjamanController'

import { 
    inputPengajuanPeminjamanValidator, 
    terimaPinjamanValidator,
    tambahPinjamanInputValidator,
    inputPembatalanPeminjamanUserValidator

 } from '../../validator/pinjamanValidator'
import { pustakawanMiddlewareAuthorized, userMiddlewareAuthorized } from '../../middleware/roleBasedMiddleware'
import mongooseIdMiddleware from '../../middleware/validateMongoIdMiddleware'

const router = express.Router()

// KHUSUS USER
router.route('/request/pinjaman')
    .post(userMiddlewareAuthorized, inputPengajuanPeminjamanValidator, requestPinjaman)

router.route('/user')
    .get(userMiddlewareAuthorized, getPinjamanUser)

router.route('/user/:id')
    .get(userMiddlewareAuthorized, mongooseIdMiddleware, getSinglePinjamanUser)
    .delete(userMiddlewareAuthorized, mongooseIdMiddleware, inputPembatalanPeminjamanUserValidator, pembatalanPinjamanUser)

// KHUSUS PUSTAKAWAN
router.route('/pinjaman')
    .get(getAllPinjaman)

router.route('/pinjaman/aktif')
    .get(pustakawanMiddlewareAuthorized, 
        getAllPinjamanAktif)

router.route('/pinjaman/create')
    .post(
        pustakawanMiddlewareAuthorized, 
        tambahPinjamanInputValidator, 
        tambahPinjaman)

router.route('/pinjaman/:id')
    .get(mongooseIdMiddleware, getSinglePinjaman)
    .delete(mongooseIdMiddleware, hapusPinjaman)

router.route('/requested/pinjaman')
    .get(pustakawanMiddlewareAuthorized, getAllRequestedPinjaman)

router.route('/accept/pinjaman')
    .post(pustakawanMiddlewareAuthorized, terimaPinjamanValidator, terimaPinjaman)

export default router