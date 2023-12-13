const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors")
const mongoose = require("mongoose");

//Local Routes imports
const registerRoute = require("./routes/register.route.js");
const loginRoute=require("./routes/login.route.js");
const dataRoute=require("./routes/data.route.js")
const app = express();
app.use(express.json())
//Routes configs
app.use("",registerRoute);
app.use("",loginRoute);
app.use("/api",dataRoute);
//Handle Cross origin requests
app.use(cors());


//Server & database config
(async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Database successfully connected!");
        app.listen(process.env.PORT,()=>{
            console.log(`Server is running at: http://localhost:${process.env.PORT}`)
        });
    } catch (error) {
        throw new Error(error.message);
    }
})()

