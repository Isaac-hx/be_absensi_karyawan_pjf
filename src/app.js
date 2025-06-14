import bodyParser from "body-parser"
import express from "express"
import router from "../src/routes/karyawan.js"
import userRoutes from "../src/routes/user.js"
import cookieParser from 'cookie-parser';
import absensiRoutes from "./routes/absensi.js";
const app = express()


app.use(cookieParser())
app.use(bodyParser.json())
app.use("/api/karyawan",router)
app.use("/api/users",userRoutes)
app.use("/api/absensi",absensiRoutes)
 
export default app