const express = require("express");
const app = express();
const axios = require("axios");
const crypto = require("crypto");
const CryptoJS = require("crypto-js");
const HmacSHA256 = require("crypto-js/hmac-sha256");

require("dotenv").config();

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

const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

app.get("/", function (req, res) {
  res.json({ msg: "nothing here" });
});

app.get("/huobi-orders", async function (req, res) {
  let protocol = "https://";
  let host = "api.huobi.pro";
  let endpoint = `/v1/order/orders`;

  let timestamp = new Date();

  let payload = {
    AccessKeyId: ACCESS_KEY,
    SignatureMethod: "HmacSHA256",
    SignatureVersion: 2,
    Timestamp: timestamp.toISOString().substring(0, 19),
    symbol: "btcusdt",
    states: "filled",
  };

  let query = [];
  for (let data in payload) {
    query.push(data + "=" + encodeURIComponent(payload[data]));
  }

  let p = query.sort().join("&");

  let meta = ["GET", host, endpoint, p].join("\n");
  let hash = HmacSHA256(meta, SECRET_KEY);
  let signature = encodeURIComponent(CryptoJS.enc.Base64.stringify(hash));

  p += `&Signature=${signature}`;

  let result = await axios
    .get(`${protocol}${host}${endpoint}?${p}`)
    .then(function (response) {
      let res = {
        data: response.data,
        config: response.config,
        headers: response.headers,
      };

      return res;
    })
    .catch(function (error) {
      return error;
    });

  res.json({
    signed: p,
    result: result,
  });
});

app.get("/p2p-orders", async function (req, res) {
  let protocol = "https://";
  let host = "otc-api.trygofast.com";
  let endpoint = `/v1/order/orders`;

  let timestamp = new Date();

  let payload = {
    accessKey: ACCESS_KEY,
    signatureMethod: "HmacSHA256",
    signatureVersion: 2,
    timestamp: timestamp.toISOString().substring(0, 19),
    "order-id": req.query.order_id,
  };

  let query = [];
  for (let data in payload) {
    query.push(data + "=" + encodeURIComponent(payload[data]));
  }

  let p = query.sort().join("&");

  let meta = ["GET", host, endpoint, p].join("\n");
  let hash = HmacSHA256(meta, SECRET_KEY);
  let signature = encodeURIComponent(CryptoJS.enc.Base64.stringify(hash));

  p += `&Signature=${signature}`;

  let result = await axios
    .get(`${protocol}${host}${endpoint}?${p}`)
    .then(function (response) {
      let res = {
        data: response.data,
        config: response.config,
        headers: response.headers,
      };

      return res;
    })
    .catch(function (error) {
      return error;
    });

  res.json({
    signed: p,
    result: result,
  });
});

app.get("/p2p-ads", async function (req, res) {
  let protocol = "https://";
  let host = "otc-api.trygofast.com";
  let endpoint = `/v1/api/public/ad-get`;

  let timestamp = new Date();

  let payload = {
    accessKey: ACCESS_KEY,
    signatureMethod: "HmacSHA256",
    signatureVersion: 2.1,
    timestamp: timestamp.toISOString().substring(0, 19),
    coin: "USDT",
    tradeType: "SELL",
  };

  let query = [];
  for (let data in payload) {
    query.push(data + "=" + encodeURIComponent(payload[data]));
  }

  let p = query.sort().join("&");

  let meta = ["GET", host, endpoint, p].join("\n");
  let hash = HmacSHA256(meta, SECRET_KEY);
  let signature = encodeURIComponent(CryptoJS.enc.Base64.stringify(hash));

  p += `&signature=${signature}`;

  let result = await axios
    .get(`${protocol}${host}${endpoint}?${p}`)
    .then(function (response) {
      let res = {
        data: response.data,
        config: response.config,
        headers: response.headers,
      };

      return res;
    })
    .catch(function (error) {
      return error;
    });

  res.json({
    signed: p,
    result: result,
  });
});
