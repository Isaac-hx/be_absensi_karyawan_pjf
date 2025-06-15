import { pool } from "../config/db.js";

import bcrypt, { hash } from "bcryptjs";
import generateIntegerID from "../helper/generatorId.js";
import { generateAccessToken } from "../helper/jwt.js";
import { validationResult } from "express-validator";

export const getAllUsers = async(req,res)=>{
    try{
 let { username = "", page = 1, limit = 10 } = req.query;

    // Convert to integers and handle invalid inputs
    page = parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;
    limit = parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 10;
    const offset = (page - 1) * limit;

    // Fetch total items count
    const [totalResult] = await pool.query(
      `SELECT COUNT(*) as total FROM users WHERE username LIKE ?`,
      [`%${username}%`]
    );
    const totalItems = totalResult[0].total;

    // Fetch paginated data
    const [rows] = await pool.query(
      `SELECT * FROM users WHERE username LIKE ? LIMIT ? OFFSET ?`,
      [`%${username}%`, limit, offset]
    );

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

export const register = async (req, res) => {
    try {
        // Handle validation results
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id =generateIntegerID()
        // Extract validated input
        const { username, password, status } = req.body;
        const hash_password = bcrypt.hashSync(password,bcrypt.genSaltSync(5))

        // Use parameterized query to prevent SQL injection
        const [result] = await pool.query(
            'INSERT INTO users (id,username,password,status) VALUES (?,?, ?, ?)',
            [id, username, hash_password, status]
        );

        res.status(201).json({ message: "user created", data: {username} });
    } catch (e) {
        res.status(500).json({ message: "Error creating user", error: e });
    }
};

export const login = async (req, res) => {
    try {
     
        
        // Extract validated input
        const { username, password } = req.body;

        // Use parameterized query to prevent SQL injection
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE username = ? AND status = "active"',
            [username]
        );

        if (rows.length ===0){
            return res.status(401).json({ message: "Invalid username or password!" });
            
        }
        const user = rows[0]
        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = generateAccessToken({ id: user.id, username: user.username });
        res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600;`);

        res.status(200).json({ message: "Login sucessful", token:token });
    } catch (e) {
        res.status(500).json({ message: "Error creating user", error: e.message });
    }
};

export const getusersById = async (req, res) => {

    try {
       const { id } = req.params;

        // Validate the input ID
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID parameter" });
        }

        // Query the database to find the user by ID
        const [result] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);

        // Check if the user exists
        if (result.length === 0) {
            return res.status(404).json({ message: `User with ID ${id} not found` });
        }

        // Respond with the found users data
        res.status(200).json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving users data", error });
    }
};

export const deleteUserById = async (req, res) => {

    try {
            const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID parameter" });
        }

        // Check if users exists
        

        // Delete users
        const [deletedUser] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
        if (deletedUser.affectedRows === 0) {
                return res.status(404).json({ message: `users with ID ${id} not found` });
            }        
        res.status(200).json({ message: `users with ID ${id} deleted successfully` });
    } catch (e) {
        res.status(500).json({ message: "Error deleting users", error: e.message });
    }
};

export const editUsersById = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation errors", errors: errors.array() });
        }

        const { id } = req.params;
        const { username,password,status } = req.body;

        // Update fields only if provided
        const fieldsToUpdate = {};
        if (username) fieldsToUpdate.username = username;
        if (password) fieldsToUpdate.password = password;
        if (status) fieldsToUpdate.status = status;

        const [updateResult] = await pool.query(
            "UPDATE users SET ? WHERE id = ?",
            [fieldsToUpdate, id]
        );
        if (updateResult.affectedRows === 0) {
            return res.status(404).json({ message: `users with ID ${id} not found` });
        }


        res.status(200).json({
            message: "users updated successfully",
            affectedRows: updateResult.affectedRows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating users", error });
    }
};


