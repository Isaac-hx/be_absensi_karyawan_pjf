import { body } from "express-validator";

export const validateAddUser = [
    body("username")
        .notEmpty().withMessage("Username is required")
        .isString().withMessage("Username must be a string")
        .isLength({ min: 6 }).withMessage("Username must be at least 6 characters long"),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isString().withMessage("Password must be a string")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    body("status")
        .notEmpty().withMessage("Status is required")
        .isIn(['active', 'inactive']).withMessage("Status must be either 'active' or 'inactive'"),
];

export const validateEditUser = [
    body("username")
        .optional()
        .isString().withMessage("Username must be a string")
        .isLength({ min: 6 }).withMessage("Username must be at least 6 characters long"),
    body("password")
        .optional()
        .isString().withMessage("Password must be a string")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    body("status")
        .optional()
        .isIn(['active', 'inactive']).withMessage("Status must be either 'active' or 'inactive'"),
];