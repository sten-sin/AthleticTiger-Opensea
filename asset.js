const axios = require("axios").default;
const fs = require("fs");

const API_KEY = "c1e6a3580d3f42eeac519e3d3d4ee0f1";
const initUrl =
  "https://api.opensea.io/api/v1/asset/0xc5ba5f657ee81c9f0eddee0e75b39deac45db41f/"; //1888;
const MAX_TOKEN_ID = 10;

let apiOptions = {
  method: "GET",
  url: initUrl,
  headers: {
    Accept: "application/json",
    "X-API-KEY": API_KEY,
  },
};

(async () => {
  console.log("================ BEGIN ================");
  const orderList = [];
  for (i of [...Array(MAX_TOKEN_ID).keys()]) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`======== Step: ${i + 336} ========`);
    try {
      const url = `${initUrl}${i + 336 }/?include_orders=true`;
      apiOptions.url = url;
      const response = await axios.request(apiOptions);
      const asset = response["data"];

      // let ownerInfo = {
      //   address: asset["owner"]["address"],
      // };

      // if (
      //   asset["owner"]["user"] != null &&
      //   asset["owner"]["user"]["username"] != null
      // )
      //   ownerInfo["username"] = asset["owner"]["user"]["username"];
      let orderInfo = {
        tokenId: asset["token_id"],
        isOrdered: (asset["orders"].length == 0 ? false : true),
      };

      orderList.push(orderInfo);
      // const str = JSON.stringify(result, null, "\t");
      // fs.writeFileSync(`./assets/${i + 1}.json`, str);
    } catch (error) {
      console.log(`${i + 336} Error`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      i--;
      const str = JSON.stringify(error, null, "\t");
      fs.writeFileSync(`./assets/${i + 336}_error.json`, str);
    }
  }

  const str = JSON.stringify(orderList, null, "\t");
  fs.writeFileSync(`./assets/orders.json`, str);

  console.log("================ END ================");
})(); // Wrap in parenthesis and call now

// axios.request(options).then(function (response) {
//   const result = response['data'];
//   const str = JSON.stringify(result, null, '\t');
//   fs.writeFileSync('./assets/all.json', str);

// }).catch(function (error) {
//   const str = JSON.stringify(error, null, '\t');
//   fs.writeFileSync('./assets/all_error.json', str);
// });
