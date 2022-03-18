const axios = require("axios").default;
const fs = require("fs");

const API_KEY = "c1e6a3580d3f42eeac519e3d3d4ee0f1";
const URL =
  "https://api.opensea.io/wyvern/v1/orders?asset_contract_address=0xc5ba5f657ee81c9f0eddee0e75b39deac45db41f&limit=1&offset=0"; //1888;
const MAX_TOKEN_ID = 1984;

async function writeFile(filePath, content) {
  try {
    await fs.writeFile(filePath, content);
    console.log("success!");
  } catch (error) {
    console.error(`Got an error trying to write the file`);
    // console.error(`Got an error trying to write the file: ${error.message}`);
  }
}

let apiOptions = {
  method: "GET",
  url: URL,
  headers: {
    Accept: "application/json",
    "X-API-KEY": API_KEY,
  },
};

(async () => {
  console.log("================ BEGIN ================");
  const response = await axios.request(apiOptions);
  const orders = response["data"];
  // let results = [];
  // assets.forEach((asset) => {
  //   let result = {
  //     token_id: asset["token_id"],
  //     is_listed:
  //   };
  // });

  const str = JSON.stringify(orders, null, "\t");
  fs.writeFileSync(`./assets.json`, str);
  console.log("================ END ================");
})(); // Wrap in parenthesis and call now
