import { body } from "express-validator";

export const validateAddKaryawan = [
    body("email")
     .notEmpty().withMessage("Email is Required")
     .isString().withMessage("Email must be an string")
     .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).withMessage("Email must be in a valid format"),
    body("name")
     .notEmpty().withMessage("Name is Required")
     .isString().withMessage("Name must be an string"),
    body("gender")
     .notEmpty().withMessage("Gender is Required")
     .isIn(['male','female']).withMessage("Gender must be either male or female"),
    body("no_telp")
     .notEmpty().withMessage("no_telp is Required")
     .isString().withMessage("no_telp must be an string"),
]

export const validateEditKaryawan = [
    body("name")
        .optional().isString().withMessage("Name must be a string"),
    body("no_telp")
        .optional().isString().withMessage("No telp must be a string"),
    body("email")
        .optional().isString().withMessage("Email be a string")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).withMessage("Email must be in a valid format"),
    body("gender")
        .optional()
        .isIn(["male", "female"]).withMessage("Gender must be 'male' or 'female'"),
];
