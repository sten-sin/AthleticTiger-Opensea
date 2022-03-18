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
module.exports = { API_KEY, INIT_URL, apiOptions };
