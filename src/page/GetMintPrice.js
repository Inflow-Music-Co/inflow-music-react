import React, { useState } from 'react';
import { Contract, ethers, Wallet } from 'ethers';
import SocialToken from '../artifacts/contracts/token/social/SocialToken.sol/SocialToken.json';
import MockUSDC from '../artifacts/contracts/mocks/MockUSDC.sol/MockUSDC.json';
// import SocialTokenFactory from '../artifacts/contracts/token/social/SocialTokenFactory.sol/SocialTokenFactory.json';
import { Inflow } from '../inflow-solidity-sdk/src/Inflow';
// import detectEthereumProvider from '@metamask/detect-provider';

const GetMintPrice = () => {
    const [SocialTokenAddress, setSocialTokenAddress] = useState();
    const [MintPrice, setMintPrice] = useState();
    const [BurnPrice, setBurnPrice] = useState();
    const [TokensToMint, setTokensToMint] = useState();
    const [TokensToBurn, setTokensToBurn] = useState();
    const [Balance, setBalance] = useState();


    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    const fetchTokenMintPrice = async () => {
        if (
            typeof window.ethereum !== 'undefined' &&
            SocialTokenAddress &&
            SocialTokenAddress !== ''
        ) {
            try {
                await requestAccount();
                const provider = new ethers.providers.Web3Provider(
                    window.ethereum
                );
                const inflow = new Inflow(provider, 4);
                const mintPrice = await inflow.getMintPriceSocial(SocialTokenAddress, inflow.parseERC20("SocialToken", "1"))
                setMintPrice(mintPrice[0]);
                // console.log(`MINT PRICE: ${mintPrice[0]}`);
            } catch (err) {
                // console.log(err);
            }
        }
    };


    const mint = async (social, usdc, amount) => {
        const mintPrice = await social.getMintPrice(amount);
        await (await usdc.mint(mintPrice)).wait();
        await (await usdc.approve(social.address, mintPrice)).wait();
        await (await social.mint(amount)).wait();
        return mintPrice;
    }

    const mintTokens = async () => {
        if (
            typeof window.ethereum !== 'undefined' &&
            SocialTokenAddress &&
            SocialTokenAddress !== ''
        ) {
            try {
                await requestAccount();
                const provider = new ethers.providers.Web3Provider(
                    window.ethereum
                );
                const admin = new Wallet(process.env.REACT_APP_ADMIN_PVT_KEY, provider)
                const signer = provider.getSigner();
                const social = new Contract(
                    SocialTokenAddress,
                    SocialToken.abi,
                    admin
                )
                const socialMinter = social.connect(signer)
                const usdc = new Contract(
                    process.env.REACT_APP_MOCKUSDC,
                    MockUSDC.abi,
                    admin
                )
                const usdcMinter = usdc.connect(signer);
                const inflow = new Inflow(provider, 4);
                await mint(socialMinter, usdcMinter, inflow.parseERC20("SocialToken", String(TokensToMint)));
                // console.log("MINT SUCCESSFULL")
            } catch (err) {
                // console.log(err);
            }
        }
    }

    const fetchTokenBurnPrice = async () => {
        if (
            typeof window.ethereum !== 'undefined' &&
            SocialTokenAddress &&
            SocialTokenAddress !== ''
        ) {
            try {
                await requestAccount();
                const provider = new ethers.providers.Web3Provider(
                    window.ethereum
                );
                const inflow = new Inflow(provider, 4);
                const burnPrice = await inflow.getBurnPriceSocial(SocialTokenAddress, inflow.parseERC20("SocialToken", "1"))
                setBurnPrice(burnPrice[0]);
                // console.log(`BURN PRICE: ${burnPrice[0]}`);
            } catch (err) {
                // console.log(err);
            }
        }
    }

    const burn = async (social, amount) => {
        const burnPrice = await social.getBurnPrice(amount);
        await (await social.burn(amount)).wait();
        return burnPrice;
    }

    const burnTokens = async () => {
        if (
            typeof window.ethereum !== 'undefined' &&
            SocialTokenAddress &&
            SocialTokenAddress !== ''
        ) {
            try {
                await requestAccount();
                const provider = new ethers.providers.Web3Provider(
                    window.ethereum
                );
                const admin = new Wallet(process.env.REACT_APP_ADMIN_PVT_KEY, provider)
                const signer = provider.getSigner();
                const social = new Contract(
                    SocialTokenAddress,
                    SocialToken.abi,
                    admin
                )
                const socialMinter = social.connect(signer)
                const inflow = new Inflow(provider, 4);
                await burn(socialMinter, inflow.parseERC20("SocialToken", String(TokensToBurn)));
                // console.log("BURN SUCCESSFULL")
            } catch (err) {
                // console.log(err);
            }
        }
    }

    const getBalance = async () => {
        if (
            typeof window.ethereum !== 'undefined' &&
            SocialTokenAddress &&
            SocialTokenAddress !== ''
        ) {
            try {
                await requestAccount();
                const provider = new ethers.providers.Web3Provider(
                    window.ethereum
                );
                const signer = provider.getSigner();
                const signerAddress = await signer.getAddress();
                const inflow = new Inflow(provider, 4);
                const balance = await inflow.balanceOf("SocialToken", signerAddress, SocialTokenAddress)
                setBalance(balance[0]);
                // console.log(`BALANCE: ${balance[0]}`);
            } catch (err) {
                // console.log(err);
            }
        }
    }

    return (
        <div>
            <input
                onChange={(e) => setSocialTokenAddress(e.target.value)}
                placeholder="Social Token Address"
            />
            <br />
            <button onClick={fetchTokenMintPrice}>Get Token Mint Price</button>
            <h1>Mint Price of 1 Token: {MintPrice}</h1>
            <br />
            <br />
            <br />

            <button onClick={getBalance}>VIEW BALANCE</button>
            <h1>Balance is: {Balance}</h1>

            <br />
            <br />
            <br />

            <input
                type="number"
                onChange={(e) => setTokensToMint(e.target.value)}
                placeholder="Number of Tokens to mint"
            />
            <h1>Price: {TokensToMint * MintPrice}</h1>
            <br />
            <button onClick={mintTokens}>Mint Tokens</button>

            <br />
            <br />
            <br />

            <button onClick={fetchTokenBurnPrice}>Get Token Burn Price</button>
            <h1>Burn Price of 1 Token: {BurnPrice}</h1>

            <br />
            <br />
            <br />

            <input
                type="number"
                onChange={(e) => setTokensToBurn(e.target.value)}
                placeholder="Number of Tokens to burn"
            />
            <h1>Price: {TokensToBurn * BurnPrice}</h1>
            <br />
            <button onClick={burnTokens}>Burn Tokens</button>
        </div>


    );
};

export default GetMintPrice;
