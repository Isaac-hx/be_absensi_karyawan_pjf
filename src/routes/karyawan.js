import express from 'express'

import { getAllKaryawan,createKaryawan, getKaryawanById,deleteKaryawanById, editKaryawanById } from '../controllers/karyawan.js'
import { validateAddKaryawan, validateEditKaryawan } from '../validations/karyawanValidations.js'

const router = express.Router()



router.get("/",getAllKaryawan)
router.get("/:id",getKaryawanById)
router.post("/",validateAddKaryawan,createKaryawan)
router.delete("/:id",deleteKaryawanById)
router.put("/:id",validateEditKaryawan,editKaryawanById)




export default router