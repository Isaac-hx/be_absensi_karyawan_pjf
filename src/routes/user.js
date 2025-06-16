import express from 'express'
import { verifyToken } from '../helper/jwt.js'
import { getAllUsers,register,login, getusersById,deleteUserById, editUsersById, getTotalUsers } from '../controllers/user.js'
import { validateAddUser, validateEditUser } from '../validations/userValidations.js'

const userRoutes = express.Router()


userRoutes.get("/total-user",verifyToken,getTotalUsers)
userRoutes.get("/",verifyToken,getAllUsers)
userRoutes.get("/:id",verifyToken,getusersById)
userRoutes.post("/register",validateAddUser,register)
userRoutes.post("/login",validateAddUser,login)
userRoutes.delete("/:id",verifyToken,deleteUserById)
userRoutes.put("/:id",validateEditUser,verifyToken,editUsersById)




export default userRoutes