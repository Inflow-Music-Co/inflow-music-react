
exports.__esModule = true;
exports.formatCreators = void 0;
var ethers_1 = require("ethers");
function formatCreators(creators) {
    var value = ethers_1.BigNumber.from(10000).div(creators.length);
    return creators.map(function (account) { return ({ account: account, value: value }); });
}
exports.formatCreators = formatCreators;
