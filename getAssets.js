const axios = require("axios").default;
const fs = require("fs");

const API_KEY = "c1e6a3580d3f42eeac519e3d3d4ee0f1";
const INIT_URL =
  "https://api.opensea.io/api/v1/assets?order_by=pk&order_direction=desc&asset_contract_address=0xc5ba5f657ee81c9f0eddee0e75b39deac45db41f&limit=200&include_orders=true"; //1888;
let apiOptions = {
  method: "GET",
  url: INIT_URL,
  headers: {
    Accept: "application/json",
    "X-API-KEY": API_KEY,
  },
};

(async () => {
  console.log("================ BEGIN ================");

  // prepare variable for listInformation
  let listInfos = [];

  let response = await axios.request(apiOptions);
  let assets = response["data"]["assets"];

  // get info from 200 assets
  assets.forEach((asset) => {
    let listInfo = {
      name: asset["name"],
      image_url: asset["image_url"],
      owner_address: asset["owner"]["address"],
      is_listed: asset["sell_orders"] == null ? false : true,
    };
    listInfos.push(listInfo);
  });

  let nextCursor = response["data"]["next"];

  while (nextCursor != null) {
    apiOptions.url = `${INIT_URL}&cursor=${nextCursor}`;
    response = await axios.request(apiOptions);
    assets = response["data"]["assets"];

    // get info from 200 assets
    assets.forEach((asset) => {
      let listInfo = {
        name: asset["name"],
        image_url: asset["image_url"],
        owner_address: asset["owner"]["address"],
        is_listed: asset["sell_orders"] == null ? false : true,
      };
      listInfos.push(listInfo);
    });
    nextCursor = response["data"]["next"];
  }
  fs.writeFileSync(`./assets.json`, JSON.stringify(listInfos, null, "\t"));
  console.log("================ END ================");
})();
