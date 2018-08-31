const snekfetch = require("snekfetch");
module.exports = async () => {
  const response = await snekfetch.get("http://aws.random.cat/meow");
  return response.body.file;
}