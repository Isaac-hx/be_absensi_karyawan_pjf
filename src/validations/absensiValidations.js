import { body } from "express-validator";

export const validateAddAbsensi = [
    body("karyawan_id")
     .notEmpty().withMessage("Karyawan id is required")
     .isInt().withMessage("Karyawan id must be integer"),
    body("location")
     .notEmpty().withMessage("Location is required")
     .isString().withMessage("Location must be string"),
    body("url_profile")
     .notEmpty().withMessage("Url profile is required")
     .isString().withMessage("Url profile must be string")
     .matches(/^(https?:\/\/.*\.(?:png|jpg|jpeg))$/i).withMessage("File format is not valid"),
    body("url_signature")
     .notEmpty().withMessage("Url signature is required")
     .isString().withMessage("Url signature must be string")
     .matches(/^(https?:\/\/.*\.(?:png|jpg|jpeg))$/i).withMessage("File format is not valid"),
    body("target_work")
     .optional().isString().withMessage("Target work must be string"),
    body("result_work")
     .optional().isString().withMessage("Result work must be string"),
    body("check_in")
     .optional()
     .isString().withMessage("Check in must be string"),
    body("check_out")
     .optional()
     .isString().withMessage("Check out must be string")
]
