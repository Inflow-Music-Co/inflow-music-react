/* eslint-disable */
import { ContractInterface } from "ethers";
import { abi as Inflow1155BC_ABI } from "../../artifacts/contracts/token/nft/Inflow1155BC.sol/Inflow1155BC.json";
import { abi as Inflow1155_ABI } from "../../artifacts/contracts/token/nft/Inflow1155.sol/Inflow1155.json";
import { abi as Inflow721_ABI } from "../../artifacts/contracts/token/nft/Inflow721.sol/Inflow721.json";
import { abi as SocialToken_ABI } from "../../artifacts/contracts/token/social/SocialToken.sol/SocialToken.json";
import { abi as ERC20_ABI } from "../../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json";
import { abi as SocialTokenFactory_ABI } from "../../artifacts/contracts/token/social/SocialTokenFactory.sol/SocialTokenFactory.json";
import MATIC_DEPLOYED_ADDRESSES from "../deployments/matic.json";
import MUMBAI_DEPLOYED_ADDRESSES from "../deployments/mumbai.json";
import RINKEBY_DEPLOYED_ADDRESSES from "../deployments/rinkeby.json";
import {
  AddressesByChainId,
  Addresses,
  ABIs,
  ChainId,
  Contracts,
} from "./types";

export const inflowAddressesByChainId: AddressesByChainId = new Map([
  [137, MATIC_DEPLOYED_ADDRESSES as Addresses], // matic mainnet
  [4, RINKEBY_DEPLOYED_ADDRESSES as Addresses] //rinkeby testnet
]);

export function getAddressesByChainId(
  addressesByChainId: AddressesByChainId,
  chainId: ChainId
): Addresses {
  console.log({ chainId })
  const addresses = addressesByChainId.get(chainId);
  console.log({ addresses })
  if (addresses === undefined) throw new Error("Addresses is undefined");
  return addresses;
}

export const inflowABIs: ABIs = new Map([
  ["Inflow1155BC", Inflow1155BC_ABI],
  ["Inflow1155", Inflow1155_ABI],
  ["Inflow721", Inflow721_ABI],
  ["SocialToken", SocialToken_ABI],
  ["ERC20", ERC20_ABI],
  ["SocialTokenFactory", SocialTokenFactory_ABI],
]);

export function getAbi(abis: ABIs, contract: Contracts): ContractInterface {
  const abi = abis.get(contract);
  if (abi === undefined) throw new Error("Invalid contract name");
  return abi;
}
