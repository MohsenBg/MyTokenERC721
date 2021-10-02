
var Color = artifacts.require("Color");

module.exports = function(deployer) {
  deployer.deploy(Color, { gasPrice: 15000000 });
};
