var express = require("express");
const axios = require("axios").default;

var router = express.Router();
let { API_KEY, INIT_URL, apiOptions } = require("./configure");

router.get("/listed", async function (req, res) {
  console.log("================Listed BEGIN ================");

  // prepare variable for listInformation
  let listInfos = [];

  let response = await axios.request(apiOptions);
  let assets = response["data"]["assets"];

  // get info from 200 assets
  assets.forEach((asset) => {
    if (asset["sell_orders"] != null) {
      let listInfo = {
        name: asset["name"],
        image_url: asset["image_url"],
        owner_address: asset["owner"]["address"],
        // is_listed: asset["sell_orders"] == null ? false : true,
      };
      listInfos.push(listInfo);
    }
  });

  let nextCursor = response["data"]["next"];

  while (nextCursor != null) {
    apiOptions.url = `${INIT_URL}&cursor=${nextCursor}`;
    response = await axios.request(apiOptions);
    assets = response["data"]["assets"];

    // get info from 200 assets
    assets.forEach((asset) => {
      if (asset["sell_orders"] != null) {
        let listInfo = {
          name: asset["name"],
          image_url: asset["image_url"],
          owner_address: asset["owner"]["address"],
          // is_listed: asset["sell_orders"] == null ? false : true,
        };
        listInfos.push(listInfo);
      }
    });
    nextCursor = response["data"]["next"];
  }
  res.send(JSON.stringify(listInfos, null, "\t"));
  console.log("================ END ================");
});
router.post("/unlisted", async function (req, res) {
  console.log("================Unlisted BEGIN ================");

  // prepare variable for listInformation
  let listInfos = [];

  let response = await axios.request(apiOptions);
  let assets = response["data"]["assets"];

  // get info from 200 assets
  assets.forEach((asset) => {
    if (asset["sell_orders"] != null) {
      let listInfo = {
        name: asset["name"],
        image_url: asset["image_url"],
        owner_address: asset["owner"]["address"],
        // is_listed: asset["sell_orders"] == null ? false : true,
      };
      listInfos.push(listInfo);
    }
  });

  let nextCursor = response["data"]["next"];

  while (nextCursor != null) {
    apiOptions.url = `${INIT_URL}&cursor=${nextCursor}`;
    response = await axios.request(apiOptions);
    assets = response["data"]["assets"];

    // get info from 200 assets
    assets.forEach((asset) => {
      if (asset["sell_orders"] == null) {
        let listInfo = {
          name: asset["name"],
          image_url: asset["image_url"],
          owner_address: asset["owner"]["address"],
          // is_listed: asset["sell_orders"] == null ? false : true,
        };
        listInfos.push(listInfo);
      }
    });
    nextCursor = response["data"]["next"];
  }
  res.send(JSON.stringify(listInfos, null, "\t"));
  console.log("================ END ================");
});

module.exports = router;
