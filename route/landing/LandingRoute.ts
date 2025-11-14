import express from "express";
import { getLandingData, getLandingKatalogData, getSingleKatalogData } from "../../controllers/landing/landingControllers";

const router = express.Router()

router.route('/data')
    .get(getLandingData)

router.route('/katalog')
    .get(getLandingKatalogData)

router.route('/katalog/:id')
    .get(getSingleKatalogData)

export default router