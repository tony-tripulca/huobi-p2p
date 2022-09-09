const express = require("express");
const app = express();
const axios = require("axios");
const crypto = require("crypto");

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "*");

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "*");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", false);

  // Pass to next layer of middleware
  next();
});

let port = 8080;

app.listen(port, function () {
  console.log(`Binance test app listening on port ${port}!`);
});

app.get("/", function (req, res) {
  res.json({ msg: "nothing here" });
});