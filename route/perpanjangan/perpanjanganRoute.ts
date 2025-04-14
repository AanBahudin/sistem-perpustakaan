import express from 'express'
import {
    pengajuanPerpanjangan,
    getAllPerpanjangan,
    getSinglePerpanjangan,
    terimaPerpanjangan
} from '../../controllers/perpanjangan/perpanjanganController'

const router = express.Router()

router.route('/')
    .get(getAllPerpanjangan)
    .post(pengajuanPerpanjangan)

router.route('/:id')
    .get(getSinglePerpanjangan)
    .post(terimaPerpanjangan)