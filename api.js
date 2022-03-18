const sdk = require("api")("@opensea/v1.0#bn18zl0jw8kcu");
const fs = require("fs").promises;

async function writeFile(filePath, content) {
  try {
    await fs.writeFile(filePath, content);
    console.log("success!");
  } catch (error) {
    console.error(`Got an error trying to write the file`);
    // console.error(`Got an error trying to write the file: ${error.message}`);
  }
}

sdk['getting-assets']({
  order_by: 'pk',
  order_direction: 'desc',
  asset_contract_address: '0xc5ba5f657ee81c9f0eddee0e75b39deac45db41f',
  limit: '1',
  include_orders: 'true',
  'X-API-KEY': 'c1e6a3580d3f42eeac519e3d3d4ee0f1'
})
  .then(res => writeFile("results.txt", res))
  .catch(err => console.error(err));