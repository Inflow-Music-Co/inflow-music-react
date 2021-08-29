import { InjectedConnector } from '@web3-react/injected-connector'
import { FortmaticConnector } from '@web3-react/fortmatic-connector'
import { FORTMATIC_KEY } from "./constants";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
})

export const fortmatic = new FortmaticConnector({
  apiKey: FORTMATIC_KEY,
  chainId: 4
})
