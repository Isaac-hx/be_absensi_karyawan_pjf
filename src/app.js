import bodyParser from "body-parser"
import express from "express"
import router from "../src/routes/karyawan.js"
import userRoutes from "../src/routes/user.js"
 
const app = express()



app.use(bodyParser.json())
app.use("/api/karyawan",router)
app.use("/api/users",userRoutes)

 
export default app