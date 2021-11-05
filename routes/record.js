const express = require("express");
const moment = require('moment'); 

const taskRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the tasks.
taskRoutes.route("/").get(function (_req, res) {
  let db_connect = dbo.getDb("EbytrTasks");
  db_connect
    .collection("tasks")
    .find({})
    .sort({data: 1})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single task by id
taskRoutes.route("/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("tasks")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new task.
taskRoutes.route("/").post(function (req, response) {
  const data = moment().format('DD-MM-yyyy');
  let db_connect = dbo.getDb();
  let myobj = {
    data,
    task: req.body.task,
    status: req.body.status,
  };
  db_connect.collection("tasks").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a task by id.
taskRoutes.route("/update/:id").post(function (req, response) {
  const data = moment().format('DD-MM-yyyy');
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      data,
      task: req.body.task,
      status: req.body.status,
    },
  };
  db_connect
    .collection("tasks")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a task
taskRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("tasks").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

module.exports = taskRoutes;
