
exports.__esModule = true;
exports.formatUsdc = exports.parseUsdc = void 0;
var ethers_1 = require("ethers");
function parseUsdc(value) {
    return ethers_1.ethers.utils.parseUnits(value, 6);
}
exports.parseUsdc = parseUsdc;
function formatUsdc(value) {
    var result = ethers_1.ethers.utils.formatUnits(value, 6);
    if (result.slice(-2) === ".0")
        return result.slice(0, -2);
    return result;
}
exports.formatUsdc = formatUsdc;
