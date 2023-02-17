require('dotenv').config();
const express = require("express");
const { connectToServer } = require("./utils/dbConnect");
const usersRoute=require('./routes/users.route.js');
const { erroHandler } = require("./middleware/errorHandler");
// const cors= require("cors");
const app = express();
// app.use(cors());
const port = process.env.PORT || 5000;
app.use(express.json())
connectToServer((err)=>{
  if(!err){
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } else {
    console.log("err")
  }
})
app.use('/users',usersRoute)
app.use(erroHandler);
app.get("/", (req, res) => {
  res.send("Hello World");
});



