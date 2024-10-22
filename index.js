const serverless = require('serverless-http');
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes/index");
app.use(cors({ origin: true}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);
app.all("*",(req,res)=>{
    res.status(404).json({"status": "error", "msg": "404 Not Found"});
});

module.exports.handler = serverless(app);