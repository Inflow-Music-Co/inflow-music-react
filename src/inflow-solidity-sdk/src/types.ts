import { BigNumberish, BigNumber, providers, ContractInterface } from "ethers";
import { Inflow1155BC, Inflow1155, Inflow721 } from "../typechain";
export {
  Inflow1155BC,
  Inflow1155,
  Inflow721,
  SocialToken,
  IERC20,
  SocialTokenFactory,
} from "../typechain";

export type ChainId = 137 | 80001 | 4;

export type Part = { account: string; value: BigNumberish };

export type FormattedAndBNTuple = [formatted: string, bn: BigNumber];

export type ERC1155 = "Inflow1155BC" | "Inflow1155";

export type Contracts =
  | "Inflow1155BC"
  | "Inflow1155"
  | "Inflow721"
  | "SocialToken"
  | "ERC20"
  | "SocialTokenFactory";

export type WhitelistEnabled = NFT | "SocialTokenFactory";

export type NFT = "Inflow1155BC" | "Inflow1155" | "Inflow721";

export type ERC20 = "SocialToken" | "USDC";

export type SocialTokenOrInflow1155BC = "SocialToken" | "Inflow1155BC";

export type NFTContract = Inflow1155BC | Inflow1155 | Inflow721;

export type AddressesByChainId = Map<ChainId, Addresses>;

export interface Addresses {
  Inflow1155BC: string;
  Inflow1155: string;
  Inflow721: string;
  MockUSDC: string;
  SocialTokenFactory: string;
}

export type ABIs = Map<string, ContractInterface>;

export type Token1155 = Token1155BC | Token1155Standard;

export interface Token1155BC {
  curve: number;
  creator: string;
  social: string;
  price: BigNumber;
  socialBalance: BigNumber;
  maxSupply: BigNumber;
  supply: [BigNumber] & { _value: BigNumber };
  uri: string;
}
export interface Token1155Standard {
  creator: string;
  supply: BigNumber;
  maxSupply: BigNumber;
  uri: string;
}

export type CIDString = string & {};

export type NftStorageConfig = {
  token: string;
  endpoint?: any;
};

export interface StoreDirectoryData {
  fileBits: any[];
  fileNames: string;
  options?: any;
}
