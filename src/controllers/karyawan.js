import { pool } from "../config/db.js";
import { validationResult } from "express-validator";
import generateIntegerID from "../helper/generatorId.js";

export const getAllKaryawan = async(req,res)=>{
    try{
        const [rows] =await pool.query('SELECT * FROM karyawan')
        res.json(rows)
    }catch(e){
        res.status(500).json({message:"Error fetching data",e})
    }
}

export const createKaryawan = async (req, res) => {
    try {
        // Handle validation results
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id =generateIntegerID()
        // Extract validated input
        const { name, gender, no_telp,email } = req.body;

        // Use parameterized query to prevent SQL injection
        const [result] = await pool.query(
            'INSERT INTO karyawan (id, name, gender, no_telp,email) VALUES (?, ?, ?, ?,?)',
            [id, name, gender, no_telp,email]
        );

        res.status(201).json({ message: "Karyawan created", data: {id,name,gender,no_telp,email} });
    } catch (e) {
        res.status(500).json({ message: "Error creating karyawan", error: e.message });
    }
};

export const getKaryawanById = async (req, res) => {

    try {
       const { id } = req.params;

        // Validate the input ID
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID parameter" });
        }

        // Query the database to find the karyawan by ID
        const [result] = await pool.query('SELECT * FROM karyawan WHERE id = ?', [id]);

        // Check if the karyawan exists
        if (result.length === 0) {
            return res.status(404).json({ message: `Karyawan with ID ${id} not found` });
        }

        // Respond with the found karyawan data
        res.status(200).json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving karyawan data", error });
    }
};

export const deleteKaryawanById = async (req, res) => {

    try {
            const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID parameter" });
        }

        // Check if karyawan exists
        const [check] = await pool.query("SELECT * FROM karyawan WHERE id = ?", [id]);
        if (check.length === 0) {
            return res.status(404).json({ message: `Karyawan with ID ${id} not found` });
        }

        // Delete karyawan
        await pool.query("DELETE FROM karyawan WHERE id = ?", [id]);
        res.status(200).json({ message: `Karyawan with ID ${id} deleted successfully` });
    } catch (e) {
        res.status(500).json({ message: "Error deleting karyawan", error: e.message });
    }
};

export const editKaryawanById = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation errors", errors: errors.array() });
        }

        const { id } = req.params;
        const { name, no_telp, gender,email } = req.body;

        // Update fields only if provided
        const fieldsToUpdate = {};
        if (name) fieldsToUpdate.name = name;
        if (no_telp) fieldsToUpdate.no_telp = no_telp;
        if (gender) fieldsToUpdate.gender = gender;

        const [updateResult] = await pool.query(
            "UPDATE karyawan SET ? WHERE id = ?",
            [fieldsToUpdate, id]
        );
        if (updateResult.affectedRows === 0) {
            return res.status(404).json({ message: `Karyawan with ID ${id} not found` });
        }


        res.status(200).json({
            message: "Karyawan updated successfully",
            affectedRows: updateResult.affectedRows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating karyawan", error });
    }
};