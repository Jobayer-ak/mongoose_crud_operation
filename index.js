const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler")
const dotenv = require("dotenv").config();
// const cors = require("cors");

// express app initialization
const app = express();

app.use(express.json());
// app.use(cors());

const DB = `mongodb+srv://basic_db:WusudQgkC4QDrfVk@cluster0.oqhc5xx.mongodb.net/todos`;
// const db = "mongodb://localhost/todos";

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log("Database connected...")
}).catch(err=>{
  console.log(err)
})


// application routes
app.use("/todo", todoHandler)

// default error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({ error: err });
}

app.listen(3000, () => {
  console.log("App is listening at port 3000");
});

// Benefits of using mongoose
// 1. Abstraction from raw low level MongoDBNamespace
// 2. Relationship between NoSQL DataTransfer
// 3. Provides Schema Validation
// 4. Object-Data Mapping -translation of data into object that our code understands and vice Versa
// 5. ~40-60% less code compared to raw mongodb package


// database connection with mongoose

// mongoose
//   .connect("mongodb://localhost:27017/test", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 10,
//   })
//   .then(() => console.log("Db is connected"))
//   .catch((err) => console.log(err));

// application routes
// app.use("/todo", todoHandler)

