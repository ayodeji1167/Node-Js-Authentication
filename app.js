 const express = require ('express');
 require("express-async-errors")
 const dotenv = require('dotenv')
 const cookieParser = require('cookie-parser')
 const cors = require('cors')
 dotenv.config()
 const app = express();
 const connectDb = require('./src/db/connection')
const errorHandler = require('./src//middleware/global_error_handler');
const notFound = require('./src/middleware/not_found');
const authRouter = require('./src/routes/auth_router');

//I must never forget thsi middleware again
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())



app.use("/user" ,authRouter)
app.use(notFound)
app.use(errorHandler)


 const dbUrl = process.env.MONGO_URI;
 const port = process.env.SERVER_PORT;
 const start = async() =>{
    await connectDb(dbUrl);
    app.listen(port, ()=> console.log(`App Listening To Port ${port}`))
 }

 start()