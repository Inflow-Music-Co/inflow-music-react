import { ethers } from "ethers";
import Web3Modal from "web3modal";
// import WalletConnectProvider from '@walletconnect/web3-provider';
// import { INFURA_ID, FORTMATIC_KEY, PORTIS_ID } from "./constants";
// import Portis from "@portis/web3";
// import Fortmatic from "fortmatic";
// import Torus from "@toruslabs/torus-embed";
// import WalletLink from "walletlink";
// import MewConnect from "@myetherwallet/mewconnect-web-client";

class Wallet {
  ethersProvider = null;
  web3Modal;
  providerOptions;
  chainId = 4;
  networkName = "";
  account = null;
  provider = null;

  constructor() {
    this.providerOptions = {
      // walletconnect: {
      //     package: WalletConnectProvider,
      //     options: {
      //         infuraId: INFURA_ID,
      //     },
      // },
      // portis: {
      //     package: Portis, // required
      //     options: {
      //         id: PORTIS_ID, // required
      //     },
      // },
      // fortmatic: {
      //     package: Fortmatic, // required
      //     options: {
      //         key: FORTMATIC_KEY, // required
      //     },
      // },
      // // torus: {
      // //     package: Torus, // required
      // //     options: {
      // //         networkParams: {
      // //             host: "https://rpc-mumbai.matic.today/", // optional
      // //             chainId: 80001, // optional
      // //             networkId: 80001, // optional
      // //         },
      // //         config: {
      // //             buildEnv: "development", // optional
      // //         },
      // //     },
      // // },
      // "custom-walletlink": {
      //     display: {
      //         logo:
      //             "https://raw.githubusercontent.com/walletlink/walletlink/1acb5599f4382ad657d1d1545eca2d7e54f3f001/web/src/images/wallets/coinbase-wallet.svg", // Path to wallet link logo. Source https://github.com/walletlink/walletlink/blob/master/web/src/images/wallets/coinbase-wallet.svg
      //         name: "WalletLink",
      //         description: "Scan with WalletLink to connect",
      //     },
      //     options: {
      //         appName: "App name", // Your app name
      //         networkUrl: `https://mainnet.infura.io/v3/36b9397d38ae4fd3a9d3c4b469fd3127`,
      //         chainId: this.chainId,
      //     },
      //     package: WalletLink,
      //     connector: async (_, options) => {
      //         const { appName, networkUrl, chainId } = options;
      //         const walletLink = new WalletLink({
      //             appName,
      //         });
      //         const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
      //         await provider.enable();
      //         return provider;
      //     },
      // },
      // // mewconnect: {
      // //     package: MewConnect, // required
      // //     options: {
      // //         infuraId: "INFURA_ID", // required
      // //     },
      // // },
    };
    this.init();
  }

  async autoConnect() {
    if (this.web3Modal.cachedProvider) {
      await this.connect();
    }
  }

  init() {
    this.web3Modal = new Web3Modal({
      // network: 'mainnet',
      cacheProvider: true,
      providerOptions: this.providerOptions,
    });
  }

  async connect() {
    let web3Provider = await this.web3Modal.connect();
    // console.log({web3Provider})
    await this.subscribeProvider(web3Provider);
    const ethersProvider = new ethers.providers.Web3Provider(web3Provider);
    // console.log({ethersProvider})
    const accounts = await ethersProvider.listAccounts();
    let account = ethers.utils.getAddress(accounts[0]);
    let network = await ethersProvider.getNetwork();
    this.ethersProvider = ethersProvider;
    this.account = account;
    this.chainId = network.chainId;
    this.networkName = network.name;
    console.log("account", "network", account, network);
    //this.dispatch(connected({address: account}));
  }

  disconnect(clearCache) {
    // console.log("DISCONNECTING WALLET")
    // this.dispatch(disconnect());
    if (this.ethersProvider) {
      localStorage.removeItem("walletconnect");
      this.ethersProvider.removeAllListeners();
      this.ethersProvider = null;
    }
    this.address = "";
    if (clearCache) {
      this.web3Modal.clearCachedProvider();
    }
  }

  async subscribeProvider(provider) {
    if (!provider.on) {
      return;
    }

    provider.on("close", () => {
      this.disconnect(true);
    });

    provider.on("disconnect", () => {
      this.disconnect(true);
    });

    provider.on("accountsChanged", async (accounts) => {
      await this.connect();
      window.location.reload();
    });

    provider.on("chainChanged", async (chainId) => {
      await this.connect();
      window.location.reload();
    });

    provider.on("networkChanged", async () => {
      if (this.ethersProvider !== null) {
        await this.connect();
        window.location.reload();
      }
    });
  }
}

export default new Wallet();
