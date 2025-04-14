import { NotFoundError } from "../errors/errorHandler";
import Perpanjangan from "../model/Perpanjangan";
import { isValidMongooseId } from "../utils/checker";
import withValidationErrors from "./withValidationErrors";
import { body, param } from "express-validator";


export const perpanjanganInputValidator = withValidationErrors([

])

export const idPerpanjanganValidator = withValidationErrors([
    param('id')
        .notEmpty().withMessage('Id tidak boleh kosong')
        .custom(async(id) => {

            // cek id mongoose
            isValidMongooseId(id)

            const isPerpanjanganExist = await Perpanjangan.findOne({_id: id})
            if (!isPerpanjanganExist) {
                throw new NotFoundError('Data Perpanjangant tidak ditemukan')
            }
        })
])