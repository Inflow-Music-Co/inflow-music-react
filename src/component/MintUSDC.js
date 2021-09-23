import React, { useState, useEffect } from 'react';
import { Contract, ethers, Wallet } from 'ethers';
import { Button } from 'react-bootstrap';
import { Magic } from "magic-sdk";
import MockUSDC from '../artifacts/contracts/mocks/MockUSDC.sol/MockUSDC.json';
import { Inflow } from '../inflow-solidity-sdk/src/Inflow';
import Loader from './Loader';

const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY_RINKEBY, {
    network: "rinkeby",
  });

const MintUSDC = () => {
    const [mockUSDCmint, setMockUSDCMint] = useState(0.0);
    const [balance, setbalance] = useState(0.0);
    const [loading, setLoading] = useState(false);
    const [provider, setProvider] = useState();

    useEffect(async () => {
        try {
            const init = async () => {
                const isLoggedIn = await magic.user.isLoggedIn();
                console.log('isLoggedIn', isLoggedIn)
                if(isLoggedIn) {
                    const walletProvider = new ethers.providers.Web3Provider(magic.rpcProvider);
                    setProvider(walletProvider);
                } 
            };
            setLoading(true);
            init();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }, []);

    useEffect(async () => {
        if(provider){
            const signer = provider.getSigner();
            const inflow = new Inflow(provider, 4);
            const signerAddress = await signer.getAddress();
            const usdcBalance = await inflow.balanceOf(
                'USDC',
                signerAddress
            );
        setbalance(usdcBalance[0]);
        }
        
    },[provider])


    const mintUSDC = async () => {
        try {
            const signer = provider.getSigner();
            const usdc = new Contract(
                process.env.REACT_APP_MOCKUSDC,
                MockUSDC.abi,
                signer
            );
            console.log('usdc Contract', usdc, 'signer', signer)
            const usdcMinter = usdc.connect(signer);
            console.log({ usdcMinter });
            const inflow = new Inflow(provider, 4);
            console.log(inflow.parseERC20('USDC', String(mockUSDCmint)));
            setLoading(true);
            const signerAddress = await signer.getAddress();
            console.log({ signerAddress })
            await (
                await usdcMinter.mint(
                    inflow.parseERC20('USDC', String(mockUSDCmint))
                )
            ).wait();
            console.log('MOCK USDC MINT SUCCESSFUL');
            const usdcBalance = await inflow.balanceOf('USDC', signerAddress);
            setbalance(usdcBalance[0]);
            setLoading(false);
            console.log('USDC BALANCE: ', usdcBalance);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            <div className="dashboard-wrapper-main vw-100 vh-100 d-flex flex-column justify-content-center align-items-center">
                <div className="heading">MINT MOCK USDC</div>
                <div className="tab-settings-main">
                    <nav>
                        <div
                            className="nav nav-tabs nav-fill"
                            id="nav-tab"
                            role="tablist"
                        >
                            <a
                                className="nav-item nav-link active"
                                id="nav-home-tab"
                                data-toggle="tab"
                                href="#nav-home"
                                role="tab"
                                aria-controls="nav-home"
                                aria-selected="true"
                            >
                                Mint Mock USDC
                            </a>
                        </div>
                    </nav>
                    <div className="tab-content pt-3" id="nav-tabContent">
                        <div
                            className="tab-pane fade show active"
                            id="nav-home"
                            role="tabpanel"
                            aria-labelledby="nav-home-tab"
                        >
                            <div className="account-setting-form">
                                <div className="grids-main-inputs">
                                    <div className="comman-grids">
                                        <input
                                            value={mockUSDCmint}
                                            onChange={(e) =>
                                                setMockUSDCMint(e.target.value)
                                            }
                                            placeholder="MINT MOCK USDC"
                                        />
                                    </div>
                                </div>
                                <div className="save-changes-main">
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        onClick={mintUSDC}
                                    >
                                        MINT MOCK USDC
                                    </Button>{' '}
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className="p-3 my-3">USDC Balance is : {balance}</h2>
                </div>
            </div>
        </div>
    );
};

export default MintUSDC;
