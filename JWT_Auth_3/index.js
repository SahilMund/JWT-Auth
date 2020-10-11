const express=require("express");
const app=express();

const mongoose= require("mongoose");
const { DB_CONNECT} = require('./config/key');
const authrouter=require("./routes/authRoute");
const postroute=require("./routes/postRoute");

app.use(express.json());


//connect db
mongoose.connect(DB_CONNECT, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})
 .then(()=>console.log("connect to db"))
  .catch((err=>console.error(err)));

require('./models/user')
//import route
 
app.use("/api/user",authrouter);
app.use("/api/post",postroute);


app.listen(3000, ()=> console.log("server is running.."));