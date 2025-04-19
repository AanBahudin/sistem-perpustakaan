import { body, param } from "express-validator";
import withValidationErrors from "./withValidationErrors";
import { BadRequestError, NotFoundError } from "../errors/errorHandler";
import DurasiPeminjaman from "../model/DurasiPeminjaman";
import mongoose from "mongoose";

export const durasiInputValidator = withValidationErrors([
    body('durasi')
        .notEmpty().withMessage('Durasi tidak boleh kosong')
        .isInt({min: 1}).withMessage('Durasi harus bertipe integer')
        .toInt()
])