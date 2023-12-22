const express = require("express");
require("dotenv").config();
const cors = require("cors")
const mongoose = require("mongoose");

//Local Routes imports
const path = require("path");
const registerRoute = require("./routes/register.route.js");
const loginRoute=require("./routes/login.route.js");
const dataRoute=require("./routes/data.route.js")
const postRoute=require("./routes/post.route.js");
const userRoute=require("./routes/user.route.js")
const app = express();
app.use(express.json())
const STATIC=path.join(path.dirname(__dirname),"frontend","dist");
app.use(express.static(STATIC))
//Handle Cross origin requests
app.use(cors({
    origin:"*",
    allowedHeaders:['Content-Type','Authorization'],
    methods:"POST,GET,DELETE,PUT"
}));

//Routes configs
app.use("",registerRoute);
app.use("",loginRoute);
app.use("/api",dataRoute);
app.use("/post",postRoute);
app.use("/user",userRoute);


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

