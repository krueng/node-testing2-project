const express = require("express");

const employees = require("./employees/employees-model");

const server = express();

server.use(express.json()); 

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/api/employees", (req, res) => {
  employees.getAll()
    .then(employees => {
      res.status(200).json(employees);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get("/api/employees/:id", async (req, res) => {
  res.json(await employees.getById(req.params.id))
});

server.post("/api/employees", async (req, res) => {
  res
  .status(201)
  .json(await employees.insert(req.body))
});

server.delete("/api/employees/:id", async (req, res) => {
  res.end()
});

server.put("/api/employees/:id", (req, res) => {
  res.end()
});

module.exports = server;
