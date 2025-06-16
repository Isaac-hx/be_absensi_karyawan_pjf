import { pool } from "../config/db.js";

import generateIntegerID from "../helper/generatorId.js";
import { validationResult } from "express-validator";


export const getAllAbsensi = async(req,res)=>{
    try{
    let { search = "", page = 1, limit = 10,order="ASC" } = req.query;

    // Convert `page` and `limit` to integers and set defaults
    page = parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;
    limit = parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 10;
    const offset = (page - 1) * limit;

    // Total count query
    const [totalResult] = await pool.query(
      `SELECT COUNT(*) as total 
       FROM absensi 
       INNER JOIN karyawan ON absensi.karyawan_id = karyawan.id 
       WHERE karyawan.name LIKE ?`,
      [`%${search}%`]
    );
    const totalItems = totalResult[0].total;

    // Paginated data query
    const [rows] = await pool.query(
      `SELECT absensi.absensi_id, absensi.karyawan_id, karyawan.name, absensi.location, 
              absensi.url_profile, absensi.url_signature, absensi.target_work, absensi.result_work, 
              absensi.check_in, absensi.check_out, absensi.created_at 
       FROM absensi 
       INNER JOIN karyawan ON absensi.karyawan_id = karyawan.id 
       WHERE karyawan.name LIKE ? 
       ORDER BY absensi.created_at ${order}
       LIMIT ? OFFSET ?`,
      [`%${search}%`,limit, offset]
    );

    // Response with paginated data
    res.status(200).json({
      message: "Data fetched successfully",
      data: rows,
      pagination: {
        current_page: page,
        total_items: totalItems,
        total_pages: Math.ceil(totalItems / limit),
        items_per_page: limit,
      },
    });
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

        res.json(rows[0])
    }catch(e){
        res.status(500).json({message:"Error fetching data",e})
    }}