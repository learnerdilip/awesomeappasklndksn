const express = require("express");

const app = express();

app.get("/", (req, res) => {
  console.log("Hi There");
  res.send("Hello World");
});

app.get("/hello", (req, res) => {
  res.sendFile(index.html);
});

app.listen(3789, () => {
  console.log("Server started");
});
