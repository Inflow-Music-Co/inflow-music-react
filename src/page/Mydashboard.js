/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import { assetsImages } from "../constants/images";
import Slider from "../component/Slider";
// import Customdropdown from '../component/Customdropdown';
// import Performbar from '../component/Performbar';
import ProgressBar from "react-bootstrap/ProgressBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Doughnetchart from "../component/Doughnetchart";
import MyBalanceChart from "../component/MyBalanceChart";
// import Mynftdropdown from '../component/Mynftdropdown';
// import Song from '../component/Song';
import { useSelector } from "react-redux";
import axios from "axios";
import { Inflow } from "../inflow-solidity-sdk/src/Inflow";
import SmallLoader from "../component/SmallLoader";
import { WalletProviderContext } from "../contexts/walletProviderContext";
import SweetAlert from "react-bootstrap-sweetalert";
import { ethers } from "ethers";
import { Magic } from "magic-sdk";
import "../component/Artist.css";

const Mydashboard = () => {
  const { walletProvider } = useContext(WalletProviderContext);
  const uid = useSelector((state) => state.auth.data._id);
  const wallet = useSelector((state) => state.wallet);
  const [connectedWallet, setConnectedWallet] = useState(true);
  const [isFetched, setIsFetched] = useState(false);
  const [tokensBought, setTokensBought] = useState([]);
  const [tokenNames, setTokenNames] = useState([]);
  const [tokenBalances, setTokenBalances] = useState([]);
  const [tokenPrices, setTokenPrices] = useState([]);
  const [totalValues, setTotalValues] = useState([]);
  const [profileImages, setProfileImages] = useState([]);

  const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY, {
    network: "rinkeby",
  });
  const provider = new ethers.providers.Web3Provider(magic.rpcProvider);

  let tempTokensBought = []; // need to pull owned token addresses & symbols from wallet
  let tempTokenBalances = []; // // need to pull each token's balance
  let tempTokenPrices = []; // need to pull each token's unit price
  let tempTokenTotalValues = []; // need to derive total token value (amount * price)

  useEffect(() => {
    if (!wallet.wallet_connected) {
      setConnectedWallet(false);
    } else {
      getTokensOwnedByUser();
      getTokensBalAndPrice();
      getArtistInfoFromDB();
    }
  }, [walletProvider]);

  const getTokensOwnedByUser = () => {
    console.log("need to implement fetching tokens");
    // Should we check all tokens in user's wallet
    // and cross reference with our DB of contracts?

    tempTokensBought.push("0x7675a6189ccc1efd89e4239d30afdb2a8c763348"); // LTA
    tempTokensBought.push("0x5Cfe6cEE86e3799B17746313160169782e7a41F2"); // HFT
  };

  const getTokensBalAndPrice = async () => {
    if (tempTokensBought.length > 0) {
      const tokenBalances = await Promise.all(
        tempTokensBought.map(async (token) => {
          const bal = await getTokenBalance(token);
          // console.log({ token, bal });

          if (bal) {
            const tokenPrice = await getTokenPrice(token, bal);
            tempTokenBalances.push(bal);
            tempTokenPrices.push(tokenPrice);
            tempTokenTotalValues.push(tokenPrice * bal);
          }
        })
      );

      setTokensBought(tempTokensBought);
      setTokenBalances(tempTokenBalances);
      setTotalValues(tempTokenTotalValues);
      setTokenPrices(tempTokenPrices);
      setIsFetched(true);
    }
  };

  const getArtistInfoFromDB = () => {
    // TODO: need to code logic to pull only artist images/names that user owns
    // const { data } = await axios.post(
    //   `${process.env.REACT_APP_SERVER_URL}/v1/user/gettokensbought`,
    //   { uid }
    // );
    // tempTokensBought = data.tokensBought;
    // setTokenNames(data.tokenNames);
    // console.log({ tempTokensBought });
    //set Profile Images
    // let imageUrls = tempTokensBought.map((address) => {
    //   if (address) {
    //     const result = address + "_profilePic.jpeg";
    //     return result;
    //   }
    // });
    // imageUrls = imageUrls.filter((url) => {
    //   if (url) return url;
    // });
    // setProfileImages(imageUrls);
    // console.log({ imageUrls });
  };

  const getTokenPrice = async (token, balance) => {
    if (walletProvider) {
      try {
        const provider = walletProvider;
        const inflow = new Inflow(provider, 4);

        const singleTokenPrice = await inflow.getMintPriceSocial(
          token,
          inflow.parseERC20("SocialToken", "1")
        );
        // console.log({ singleTokenPrice });

        // const totalBalanceValue = await inflow.getMintPriceSocial(
        //   token,
        //   inflow.parseERC20("SocialToken", String(balance))
        // );
        // console.log({ totalBalanceValue });

        // const data = {
        //   singleval: singleTokenPrice[0],
        //   totalval: totalBalanceValue[0],
        // };
        // return data;

        return singleTokenPrice[0];
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getTokenBalance = async (tokenaddress) => {
    if (walletProvider) {
      try {
        const signer = walletProvider.getSigner();
        const signerAddress = await signer.getAddress();
        const inflow = new Inflow(walletProvider, 4);
        const balance = await inflow.balanceOf(
          "SocialToken",
          signerAddress,
          tokenaddress
        );
        return Number(balance[0]);
        // console.log({ balance });
        // console.log({ balance: balance[0] })
        // // console.log(`BALANCE: ${balance[0]}`);
      } catch (err) {
        console.log(err);
      }
    }
  };

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
        temp = [];
        flag = 0;
      }
      index += 1;
    }
    if (flag === 1) {
      finalArr.push(temp);
    }
    return finalArr;
  };

  const displayPercentageBalances = () => {
    if (isFetched) {
      const sum = totalValues.reduce(function (a, b) {
        return a + b;
      }, 0);
      const amount = formatBalanceArray(totalValues);
      // console.log({ amount })
      const names = formatBalanceArray(tokenNames);
      // console.log({ names })
      return (
        <div className="common-div-for-pro">
          {amount.map((item, index) => {
            return (
              <div className="spiner-bar-row">
                {item.map((item2, index2) => {
                  return (
                    <div className="comman-col">
                      <div className="spinner">
                        <CircularProgress
                          variant="determinate"
                          size={30}
                          thickness={5}
                          value={100}
                        />
                      </div>
                      <div className="right-side-value">
                        {`${((item2 / sum) * 100).toFixed(1)} %`}
                        <span className="small-heading">
                          {names[index][index2]}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="d-flex justify-content-center align-items-center">
          <SmallLoader />
        </div>
      );
    }
  };

  const displayTotalBalance = () => {
    if (isFetched) {
      const sum = totalValues.reduce(function (a, b) {
        return a + b;
      }, 0);
      return sum.toFixed(2);
    } else {
      return (
        <div className="ml-4">
          <SmallLoader />
        </div>
      );
    }
  };

  const displayDoughnutChart = () => {
    if (isFetched) {
      return <Doughnetchart balances={totalValues} tokenNames={tokenNames} />;
    } else {
      return (
        <div className="d-flex justify-content-center align-items-center">
          <SmallLoader />
        </div>
      );
    }
  };

  return (
    <div className="dashboard-wrapper-main">
      <div className="heading">My dashboard</div>
      <div className="first-row-main-dash">
        <div className="left-col">
          <div className="above-row">
            <div className="inner-row">
              <div className="card-heading">Artist Performance</div>
              <a href="#">
                <img alt="" src={assetsImages.filter} />
              </a>
            </div>
            <Slider
              tokenPrices={tokenPrices}
              tokenNames={tokenNames}
              profileImages={profileImages}
            />
          </div>
          <div className="below-row">
            <div className="date-row-main">
              <div className="left-pricing">
                <div className="price-tag">
                  {" "}
                  <span>$</span> {displayTotalBalance()}
                </div>
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
                  <CircularProgress
                    variant="determinate"
                    size={50}
                    thickness={5}
                    value={100}
                  />
                </div>
                <div className="right-side-value">
                  --
                  <span className="small-heading">Artist Tokens</span>
                </div>
              </div>
              <div className="comman-col">
                <div className="spinner">
                  <CircularProgress
                    variant="determinate"
                    size={50}
                    thickness={5}
                    value={100}
                  />
                </div>
                <div className="right-side-value">
                  --
                  <span className="small-heading">Artist NFTs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------My Artist Holdings-------- */}
        <div className="right-col">
          <div className="inner-row">
            <div className="card-heading">My Artist Holdings</div>
            <a href="#">
              <img alt="" src={assetsImages.filter} />
            </a>
          </div>

          <div className="artist-holdings">
            {/* <div className="chart-row">{displayDoughnutChart()}</div> */}
            {/* <div className="chart-row">{displayPercentageBalances()}</div> */}

            <div className="artist-holdings-total m-auto col-12 d-flex justify-content-center align-items-center">
              <div
                className="artist-holdings-inner d-flex flex-column"
                // style={{ borderRight: "2px solid black" }}
              >
                <span className="d-flex flex-row">
                  $ {displayTotalBalance()}
                </span>
                <span className="small-heading">Total Artist Balance</span>
              </div>
              {/* <div className="comman-priced">
              $3,981
              <span className="small-heading">Total Token Balance</span>
            </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------Total-wallet-balance-------- */}
      <div className="token-chart">
        <div className="chart-header-row">
          <div className="token-info">
            <div className="card-heading">Total Wallet Balance</div>
            <div className="dollar-price">
              <span>$</span> {displayTotalBalance()}
            </div>
            <div className="small-heading">+8 last week</div>
          </div>
          <div className="btn-filter">
            <a href="#">
              <img alt="" src={assetsImages.filter} />
            </a>
          </div>
        </div>
        <div className="total-bal-chart">{/* <Totalbalancechart /> */}</div>
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
        show={!connectedWallet}
        title="Please Connect Wallet"
        style={{ color: "#000" }}
        onConfirm={() => {
          setConnectedWallet((connectedWallet) => !connectedWallet);
        }}
        onCancel={() => {
          setConnectedWallet((connectedWallet) => !connectedWallet);
        }}
      ></SweetAlert>
    </div>
  );
};
export default Mydashboard;
