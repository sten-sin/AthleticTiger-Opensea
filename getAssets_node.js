const axios = require("axios").default;

const options = {
  method: 'GET',
  url: 'https://api.opensea.io/api/v1/assets?order_by=pk&order_direction=desc&asset_contract_address=0xc5ba5f657ee81c9f0eddee0e75b39deac45db41f&limit=200&include_orders=true',
  headers: {Accept: 'application/json', 'X-API-KEY': 'c1e6a3580d3f42eeac519e3d3d4ee0f1'}
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});