const express = require('express');
require("express-async-errors")
const dotenv = require('dotenv')
const corsOptions = require('./src/config/cors-option')
const credential = require('./src/middleware/credentials');
const cookieParser = require('cookie-parser')
const cors = require('cors')
dotenv.config()
const app = express();
const connectDb = require('./src/db/connection')
const errorHandler = require('./src//middleware/global_error_handler');
const notFound = require('./src/middleware/not_found');
const authRouter = require('./src/routes/auth_router');

//Handle optional credential check before cors and fetch cookies credential request
app.use(credential)

//I must never forget thsi middleware again
app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())



app.use("/user", authRouter)
app.use(notFound)
app.use(errorHandler)


const dbUrl = process.env.MONGO_URI;
const port = process.env.SERVER_PORT;
const start = async () => {
   await connectDb(dbUrl);
   app.listen(port, () => console.log(`App Listening To Port ${port}`))
}

start()