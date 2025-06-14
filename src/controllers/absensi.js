import { pool } from "../config/db.js";

import generateIntegerID from "../helper/generatorId.js";
import { validationResult } from "express-validator";

export const getAllAbsensi = async(req,res)=>{
    try{
        const [rows] =await pool.query('SELECT absensi.absensi_id,absensi.karyawan_id,karyawan.name,absensi.location,absensi.url_profile,absensi.url_signature,absensi.target_work,absensi.result_work,absensi.check_in,absensi.check_out,absensi.created_at FROM absensi INNER JOIN karyawan ON absensi.karyawan_id = karyawan.id ')
        res.json(rows)
    }catch(e){
        res.status(500).json({message:"Error fetching data",e})
    }
}


export const createAbsensi = async(req,res )=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const new_id = generateIntegerID(100000000,900000000)
        const {karyawan_id,location,url_profile,url_signature,target_work,result_work,check_in,check_out} = req.body
        const [row] =await pool.query('SELECT id FROM karyawan WHERE id = ?',[karyawan_id])
        if(row.length === 0){
            throw new Error("Karyawan_id not found")
        }

 const [insertResult] = await pool.query(
      `INSERT INTO absensi (
        absensi_id,
        karyawan_id, 
        location, 
        url_profile, 
        url_signature, 
        target_work, 
        result_work, 
        check_in, 
        check_out
      ) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        new_id,
        karyawan_id,
        location,
        url_profile,
        url_signature,
        target_work || null,
        result_work || null,
        check_in || null,
        check_out || null,
      ]
    );
    res.status(201).json({ message: "Success absensi", data: {new_id,karyawan_id,location,url_profile,url_signature,target_work,result_work,check_in,check_out} });

    }catch (e) {
         console.error("Error creating absensi:", e);

    if (e.message.includes("Karyawan_id not found")) {
      return res.status(404).json({ message: e.message });
    }

    if (e.message.includes("Validation")) {
      return res.status(400).json({ message: "Validation error", error: e.message });
    }

    // Jika tidak ada error spesifik, kembalikan status 500
    return res.status(500).json({ message: "Internal server error", error: e.message });
  }
}

export const getAbsensiById = async(req,res)=>{
    try{
        const { id } = req.params;

        const [rows] =await pool.query('SELECT absensi.absensi_id,absensi.karyawan_id,karyawan.name,absensi.location,absensi.url_profile,absensi.url_signature,absensi.target_work,absensi.result_work,absensi.check_in,absensi.check_out,absensi.created_at FROM absensi INNER JOIN karyawan ON absensi.karyawan_id = karyawan.id WHERE absensi_id=?',[id])
        if (rows.length === 0) {
            return res.status(404).json({ message: `Absensi with ID ${id} not found` });
        }

        res.json(rows)
    }catch(e){
        res.status(500).json({message:"Error fetching data",e})
    }}