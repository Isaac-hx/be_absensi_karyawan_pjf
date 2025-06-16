import express from 'express'
import { verifyToken } from '../helper/jwt.js'

import { getAllKaryawan,createKaryawan, getKaryawanById,deleteKaryawanById, editKaryawanById,getTotalKaryawan } from '../controllers/karyawan.js'
import { validateAddKaryawan, validateEditKaryawan } from '../validations/karyawanValidations.js'

const router = express.Router()


router.get("/total-karyawan",verifyToken,getTotalKaryawan)
router.get("/",verifyToken,getAllKaryawan)
router.get("/:id",verifyToken,getKaryawanById)
router.post("/",validateAddKaryawan,verifyToken,createKaryawan)
router.delete("/:id",verifyToken,deleteKaryawanById)
router.put("/:id",validateEditKaryawan,verifyToken,editKaryawanById)




export default router