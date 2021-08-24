/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react'
import { assetsImages } from '../constants/images'
import Slider from '../component/Slider'
// import Customdropdown from '../component/Customdropdown';
// import Performbar from '../component/Performbar';
import ProgressBar from 'react-bootstrap/ProgressBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Doughnetchart from '../component/Doughnetchart';
import MyBalanceChart from '../component/MyBalanceChart';
 // import Mynftdropdown from '../component/Mynftdropdown';
// import Song from '../component/Song';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Inflow } from '../inflow-solidity-sdk/src/Inflow';
import SmallLoader from '../component/SmallLoader';
import { WalletProviderContext } from '../contexts/walletProviderContext';
import SweetAlert from 'react-bootstrap-sweetalert';


const Mydashboard = () => {
    const { walletProvider } = useContext(WalletProviderContext);
    const uid = useSelector((state) => state.auth.data._id);
    const wallet = useSelector(state => state.wallet);
    const [balarr, setbalarr] = useState('');
    const [connectedwallet, setconnectedwallet] = useState(true);
    const [tokennames, settokennames] = useState([]);
    const [isfetched, setisfetched] = useState(false);
    const [tokenValues, setTokenValues] = useState([]);
    const [tokenPrices, setTokenPrices] = useState([]);
    const [profileImages, setProfileImages] = useState([]);
    let tokensBought = [];
    let temptokenValues = [];
    let temptokenPrices = [];

    useEffect(() => {
        if (!wallet.wallet_connected) {
            setconnectedwallet(false);
        } else {
            getTotalBalance()
        }
    }, [walletProvider]);



    const getTotalBalance = async () => {
        const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/user/gettokensbought`, { uid })
        tokensBought = data.tokensBought;
        settokennames(data.tokenNames);
        console.log({ tokensBought })

        //set Profile Images 
        let imageUrls = tokensBought.map(address => {
            if(address){
                const result = address + "_profilePic.jpeg"
                return result
            }          
        });

        imageUrls = imageUrls.filter(url => {
            if(url) return url
        })

        setProfileImages(imageUrls);

        console.log({ imageUrls });

        if (tokensBought) {
            const balArr = await Promise.all(tokensBought.map(async (token) => {
                console.log({ token })
                const bal = await getBalance(token);
                console.log({ bal })
                if (bal) {
                    const { singleval, totalval } = await getPrice(token, bal);
                    console.log({ singleval, totalval })
                    temptokenValues.push(parseFloat(totalval));
                    temptokenPrices.push(parseFloat(singleval));
                }
                return parseFloat(bal);
            }));
            console.log({ balarr })
            setbalarr(balArr);
            setTokenValues(temptokenValues);
            setTokenPrices(temptokenPrices);
            setisfetched(true);
        }

    }

    const getPrice = async (token, balance) => {
        if (walletProvider) {
            try {
                const provider = walletProvider;
                const inflow = new Inflow(provider, 4);
                const mintPrice = await inflow.getMintPriceSocial(
                    token,
                    inflow.parseERC20('SocialToken', String(balance))
                );
                console.log({ mintPrice })
                const singleMintPrice = await inflow.getMintPriceSocial(
                    token,
                    inflow.parseERC20('SocialToken', '1')
                );
                console.log({ singleMintPrice })
                const data = { singleval: singleMintPrice[0], totalval: mintPrice[0] };
                console.log("HERE")
                return data;
            } catch (error) {
                console.log(error)
            }
        }
    }

    const getBalance = async (tokenaddress) => {
        if (walletProvider) {
            try {
                const signer = walletProvider.getSigner();
                const signerAddress = await signer.getAddress();
                const inflow = new Inflow(walletProvider, 4);
                const balance = await inflow.balanceOf(
                    'SocialToken',
                    signerAddress,
                    tokenaddress
                );
                console.log({ balance })
                // console.log({ balance: balance[0] })
                return balance[0];
                // // console.log(`BALANCE: ${balance[0]}`);
            } catch (err) {
                console.log(err);
            }
        };
    }

    const formatBalanceArray = (arr) => {
        let index = 0;
        let temp = [];
        let finalArr = [];
        let flag = 0;
        while (index < arr.length) {
            temp.push(arr[index]);
            flag += 1;
            if (flag === 2) {
                finalArr.push(temp);
                temp = []
                flag = 0;
            }
            index += 1;
        }
        if (flag === 1) {
            finalArr.push(temp)
        }
        return finalArr;
    }

    const displaypercentagebalances = () => {
        if (isfetched) {
            const sum = tokenValues.reduce(function (a, b) {
                return a + b;
            }, 0);
            const amount = formatBalanceArray(tokenValues);
            // console.log({ amount })
            const names = formatBalanceArray(tokennames);
            // console.log({ names })
            return (
                <div className="common-div-for-pro" >
                    {amount.map((item, index) => {
                        return (
                            <div className="spiner-bar-row">
                                {
                                    item.map((item2, index2) => {
                                        return (
                                            <div className="comman-col">
                                                <div className="spinner">
                                                    <CircularProgress variant="determinate" size={30} thickness={5} value={100} />
                                                </div>
                                                <div className="right-side-value">
                                                    {`${(item2 / sum * 100).toFixed(1)} %`}
                                                    <span className="small-heading">{names[index][index2]}</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return <div className="d-flex justify-content-center align-items-center"><SmallLoader /></div>
        }
    }

    const displaytotalbalance = () => {
        if (isfetched) {
            const sum = tokenValues.reduce(function (a, b) {
                return a + b;
            }, 0);
            return sum.toFixed(2)
        } else {
            return <SmallLoader />
        }
    }

    const displaydoughnetchart = () => {
        if (isfetched) {
            return <Doughnetchart balances={tokenValues} tokennames={tokennames} />
        } else {
            return <div className="d-flex justify-content-center align-items-center"><SmallLoader /></div>
        }
    }


    return (
        <div className="dashboard-wrapper-main">
            <div className="heading">My dashboard</div>
            <div className="first-row-main-dash">
                <div className="left-col">
                    <div className="above-row">
                        <div className="inner-row">
                            <div className="card-heading">Artist Performance</div>
                            <a href="#"><img alt="" src={assetsImages.filter} /></a>
                        </div>
                        <Slider tokenPrices={tokenPrices} tokenNames={tokennames} profileImages={profileImages} />
                    </div>
                    <div className="below-row">
                        <div className="date-row-main">
                            <div className="left-pricing">
                                <div className="price-tag"> <span>$</span> {displaytotalbalance()}</div>
                                <div className="short-des">--</div>
                            </div>
                            <div className="right-side">
                                {/* <div className="custom-drop">
                                    <Customdropdown />
                                </div>
                                <div className="labal"> This Month</div> */}
                            </div>
                        </div>
                        {/* <Performbar /> */}
                        <MyBalanceChart />
                        <div className="progress-bar-cust">
                            <ProgressBar now={100} />
                        </div>
                        <div className="spiner-bar-row">
                            <div className="comman-col">
                                <div className="spinner">
                                    <CircularProgress variant="determinate" size={50} thickness={5} value={100} />
                                </div>
                                <div className="right-side-value">
                                    --
                                    <span className="small-heading">Artist Tokens</span>
                                </div>
                            </div>
                            <div className="comman-col">
                                <div className="spinner">
                                    <CircularProgress variant="determinate" size={50} thickness={5} value={100} />
                                </div>
                                <div className="right-side-value">
                                    --
                                    <span className="small-heading">Artist Tokens</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="right-col">
                    <div className="inner-row">
                        <div className="card-heading">My Artist Holdings</div>
                        <a href="#"><img alt="" src={assetsImages.filter} /></a>
                    </div>
                    <div className="chart-row">
                        {displaydoughnetchart()}
                    </div>
                    {displaypercentagebalances()}
                    <div className="last-row-pricing">
                        <div className="comman-priced" style={{ borderRight: "0px" }}>
                            $ {displaytotalbalance()}
                            <span className="small-heading">Total Artist Balance</span>
                        </div>
                        {/* <div className="comman-priced">
                            $3,981
                            <span className="small-heading">Total Token Balance</span>
                        </div> */}
                    </div>

                </div>

            </div>
            {/* ---------------Total-wallet-balance-------- */}
            <div className="Second-row-wave-chart">
                <div className="total-balance-row">
                    <div className="heading-cols">
                        <div className="card-heading">Total Wallet Balance</div>
                        <div className="dollor-price"><span>$</span> {displaytotalbalance()}</div>
                        <div className="small-heading">+8  last week</div>
                    </div>
                    <div className="btn-filter">
                        <a href="#">
                            <img alt="" src={assetsImages.filter} />
                        </a>
                    </div>

                </div>
                <div className="total-bal-chart">
                    {/* <Totalbalancechart /> */}
                </div>
                <div className="deposite-earning-row">
                    {/* <div className="deposits">
                        <div className="square-lab"></div>
                        <div className="deposite-heaing">
                            <span className="labal-heading">Deposits</span>
                            <span className="percent">+11.7%</span>
                        </div>
                    </div>
                    <div className="earning">
                        <div className="square-lab"></div>
                        <div className="deposite-heaing">
                            <span className="labal-heading">Earnings</span>
                            <span className="percent">+11.7%</span>
                        </div>
                    </div> */}

                </div>

            </div>

            {/* -----------My-NFTs----------------------- */}

            {/* <div className="mynfts-row-main">
                <div className="second-col">
                    <Mynftdropdown />
                </div>
                <div className="center-col">
                    <input placeholder="Search for an NFT..." />
                </div>
                <div className="last-icon">
                    <a href="#">
                        <img alt="" src={assetsImages.filter} />
                    </a>
                </div>
            </div> */}
            {/* <div className="songs-grid-main">
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                </div> */}

            <SweetAlert
                danger
                show={!connectedwallet}
                title="Please Connect Wallet"
                style={{ color: '#000' }}
                onConfirm={() => { setconnectedwallet(connectedwallet => !connectedwallet) }}
                onCancel={() => { setconnectedwallet(connectedwallet => !connectedwallet) }}
            >
            </SweetAlert>

        </div>
    )
}
export default Mydashboard
