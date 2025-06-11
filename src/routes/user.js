import express from 'express'

import { getAllUsers,createUser, getusersById,deleteUserById, editUsersById } from '../controllers/user.js'
import { validateAddUser, validateEditUser } from '../validations/userValidations.js'

const userRoutes = express.Router()



userRoutes.get("/",getAllUsers)
userRoutes.get("/:id",getusersById)
userRoutes.post("/",validateAddUser,createUser)
userRoutes.delete("/:id",deleteUserById)
userRoutes.put("/:id",validateEditUser,editUsersById)




export default userRoutes