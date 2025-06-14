import app from './app.js';
import dotenv from "dotenv"
const PORT =  3000;
dotenv.config()
console.log(process.env.TOKEN_SECRET)
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
