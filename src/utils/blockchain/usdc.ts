import { ethers, BigNumber, BigNumberish } from "ethers";

export function parseUsdc(value: string): BigNumber {
  return ethers.utils.parseUnits(value, 6);
}

export function formatUsdc(value: BigNumberish): string {
  const result = ethers.utils.formatUnits(value, 6);
  if (result.slice(-2) === ".0") return result.slice(0, -2);
  return result;
}
