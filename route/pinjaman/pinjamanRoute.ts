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
    pembatalanPinjamanUser,
    getSinglePinjamanUserByBookId,
    getSinglePinjamanUserByPengembalianId,
    tolakPeminjamanPustakawan
 } from '../../controllers/pinjaman/pinjamanController'

import { 
    pengajuanPeminjamanValidator, 
    terimaPinjamanValidator,
    tambahPinjamanInputValidator,
    inputPembatalanPeminjamanUserValidator

 } from '../../validator/pinjamanValidator'
import { pustakawanMiddlewareAuthorized, userMiddlewareAuthorized } from '../../middleware/roleBasedMiddleware'
import mongooseIdMiddleware from '../../middleware/validateMongoIdMiddleware'

const router = express.Router()

// KHUSUS USER
router.route('/request/pinjaman')
    .post(userMiddlewareAuthorized, pengajuanPeminjamanValidator, requestPinjaman)

router.route('/user')
    .get(userMiddlewareAuthorized, getPinjamanUser)
    .post(userMiddlewareAuthorized, inputPembatalanPeminjamanUserValidator, pembatalanPinjamanUser)

router.route('/user/book/:id')
    .get(userMiddlewareAuthorized, mongooseIdMiddleware, getSinglePinjamanUserByBookId)

router.route('/user/pengembalian/:id')
    .get(userMiddlewareAuthorized, mongooseIdMiddleware, getSinglePinjamanUserByPengembalianId)

router.route('/user/:id')
    .get(userMiddlewareAuthorized, mongooseIdMiddleware, getSinglePinjamanUser)


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

router.route('/accept')
    .post(pustakawanMiddlewareAuthorized, terimaPinjamanValidator, terimaPinjaman)

router.route('/decline/:id')
    .get(pustakawanMiddlewareAuthorized, mongooseIdMiddleware, tolakPeminjamanPustakawan)

export default router