var express = require("express");
const router = require("./router");

var app = express();
app.use(router);

app.listen(3000);
