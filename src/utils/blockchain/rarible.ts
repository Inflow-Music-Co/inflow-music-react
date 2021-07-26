import { BigNumber, BigNumberish } from "ethers";

export type Part = { account: string; value: BigNumberish };

export function formatCreators(creators: string[]): Part[] {
  const value = BigNumber.from(10000).div(creators.length);
  return creators.map((account) => ({ account, value }));
}
