import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { default as contractABI } from '../../contract-abi.json';

const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_ALCHEMY_API_URL_RINKEBY || '');

export const connectWallet = async () => {
  if (window.ethereum) {
    // if you have metamask installed
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const obj = {
        status: undefined,
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: null,
        status: 'An error has ocurred: ' + err.message,
      };
    }
  } else {
    // you do not have metamask installed
    return {
      address: undefined,
      status: 'You need to install Metamask wallet.',
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
        };
      } else {
        return {
          address: '',
          status: '🦊 Connect to Metamask using the top right button.',
        };
      }
    } catch (err) {
      return {
        address: '',
        status: 'An error has ocurred: ' + err.message,
      };
    }
  } else {
    return {
      address: '',
      status: 'You need to install Metamask wallet.',
    };
  }
};

export const mintNFT = async (
  image,
  author,
  name,
  description,
) => {
  if (!image || name.trim() === '' || description.trim() === '') {
    return {
      success: false,
      status: 'Please make sure all fields are completed before minting.',
    };
  }

  const metadata = {
    name: '',
    author: '',
    description: '',
    image: '',
  };

  metadata.image = image;
  metadata.name = name;
  metadata.author = author;
  metadata.description = description;

  const pinataResponse = await fetch('/api/upload-asset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ metadata }),
  });

  const response = await pinataResponse.json();

  if (!response.success) {
    return {
      success: false,
      status: '😢 Something went wrong while uploading your tokenURI.',
    };
  }

  const tokenURI = response.ipfsHash;

  window.contract = await new web3.eth.Contract(
    contractABI.abi,
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  );

  const transactionParameters = {
    to: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //make call to NFT smart contract
  };

  //sign the transaction via Metamask
  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });
    return {
      success: true,
      tx: txHash,
    };
  } catch (error) {
    return {
      success: false,
      status: '😥 Something went wrong: ' + error.message,
    };
  }
};