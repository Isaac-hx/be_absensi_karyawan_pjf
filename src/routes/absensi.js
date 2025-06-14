import express from 'express'
import { verifyToken } from '../helper/jwt.js'

import { getAllAbsensi,getAbsensiById,createAbsensi } from '../controllers/absensi.js'
import { validateAddAbsensi } from '../validations/absensiValidations.js'

const absensiRoutes = express.Router()



absensiRoutes.get("/",verifyToken,getAllAbsensi)
absensiRoutes.get("/:id",verifyToken,getAbsensiById)
absensiRoutes.post("/",validateAddAbsensi,createAbsensi)





export default absensiRoutes