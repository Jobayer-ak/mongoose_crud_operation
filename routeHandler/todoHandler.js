const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

// GET all routes
router.get("/", async (req, res) => {});

// get a todo by id
router.get("/:id", async (req, res) => {});

// post a todo
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Todo was inserted successfully",
      });
    }
  });
});

// post multiple todo
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!!",
      });
    } else {
      res.status(200).json({
        message: "Multiple todos were inserted!",
      });
    }
  });
});

// put todo
// router.put("/:id", async (req, res) => {
//   // we can filter with multiple filed
//   await Todo.updateOne(
//     { _id: req.params.id },
//     {
//       $set: {
//         status: "inactive",
//       }
//     },
//     (err) => {
//       if (err) {
//         res.status(500).json({
//           error: "There was a server side error",
//         });
//       } else {
//         res.status(200).json({
//             message: "Todo was updated successfully!",
//           });
//       }
//     }
//   );
// });

// put findByIdAndUpdate
router.put("/:id", async (req, res) => {
  // we can filter with multiple filed
  const result = await Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: "inactive"
      },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "THere was a server side error",
        });
      } else {
        res.status(200).json({
          message: "Todo was updated successfully",
        });
      }
    }
  );

  
  console.log(result);
});

module.exports = router;
