var express = require("express");
const sdk = require("api")("@opensea/v1.0#1e41yo45l0vihg6s");

var app = express();

app.get("/", function (req, res) {
  sdk["getting-assets"]({
    order_by: "pk",
    order_direction: "desc",
    limit: "200",
    asset_contract_address: "0xc5ba5f657ee81c9f0eddee0e75b39deac45db41f",
    include_orders: "true",
    "X-API-KEY": "c1e6a3580d3f42eeac519e3d3d4ee0f1",
  })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
  res.send("Hello world!");
});

app.listen(3000);
