var GgwpToken = artifacts.require("./GgwpToken.sol");
//var GgwpTokenFaucet = artifacts.require("./GgwpTokenFaucet.sol");

module.exports = function(deployer) {
  deployer.deploy(GgwpToken, 10000000); //10 million supply
    /* .then(() => {
      return deployer.deploy(GgwpTokenFaucet, GgwpToken.address, 5000000); //5 million faucet budget
    }); */
};