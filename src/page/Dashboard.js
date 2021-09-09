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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Inflow } from "../inflow-solidity-sdk/src/Inflow";
import SmallLoader from "../component/SmallLoader";
import { WalletProviderContext } from "../contexts/walletProviderContext";
import { ethers } from "ethers";
import { Magic } from "magic-sdk";
import "../component/Artist.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { updateActivePage } from "../store/reducers/appSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  // const { walletProvider } = useContext(WalletProviderContext);
  const MySwal = withReactContent(Swal);
  const uid = useSelector((state) => state.auth.data._id);
  const wallet = useSelector((state) => state.wallet);
  const walletProvider = useSelector((state) => state.wallet.provider);
  const [connectedWallet, setConnectedWallet] = useState(true);
  const [isFetched, setIsFetched] = useState(false);
  const [tokenAddresses, setTokenAddresses] = useState([]);
  const [tokenSymbols, setTokenSymbols] = useState([]);
  const [tokenBalances, setTokenBalances] = useState([]);
  const [tokenPrices, setTokenPrices] = useState([]);
  const [totalValues, setTotalValues] = useState([]);
  const [profileImages, setProfileImages] = useState([]);

  useEffect(() => {
    dispatch(updateActivePage("dashboard"));
  }, []);
  useEffect(() => {
    if (!wallet.wallet_connected) {
      setConnectedWallet(false);
    } else {
      getTokensOwnedByUser(); // complete
    }
  }, [wallet]);
  useEffect(() => {
    getTokensBalAndPrice(); // complete
    getArtistInfoFromDB(); // need to implement
  }, [tokenAddresses]);
  useEffect(() => {
    !connectedWallet &&
      MySwal.fire({
        title: <p style={{ color: "white" }}>Please Login</p>,
        icon: "warning",
        confirmButtonText: "Login",
        customClass: {
          confirmButton: "btn-gradiant",
        },
        buttonsStyling: false,
        background: "#303030",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("need to implement direct magiclink login button here");
          // setconnectedwallet((connectedwallet) => !connectedwallet);
        }
      });
  }, [connectedWallet]);
  useEffect(() => {
    console.log({ tokenBalances, tokenPrices, totalValues });
  }, [totalValues]);

  const getTokensOwnedByUser = async () => {
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/v1/user/gettokensbought`, {
        uid,
      })
      .then((resp) => {
        console.log("token addresses", resp.data.tokensBought);
        setTokenAddresses(resp.data.tokensBought);
        console.log("token symbols", resp.data.tokenNames);
        setTokenSymbols(resp.data.tokenNames);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getTokensBalAndPrice = async () => {
    const tempBalances = [];
    const tempPrices = [];
    const tempValues = [];
    setIsFetched(false);
    if (tokenAddresses.length > 0) {
      const tokenBals = await Promise.all(
        tokenAddresses.map(async (token) => {
          const bal = await getTokenBalance(token);
          if (bal) {
            const tokenPrice = await getTokenPrice(token, bal);
            tempBalances.push(bal);
            tempPrices.push(Number(tokenPrice));
            tempValues.push(Number(tokenPrice) * bal);
          }
        })
      );
    }
    setTokenBalances(tempBalances);
    setTokenPrices(tempPrices);
    setTotalValues(tempValues);
    setIsFetched(true);
  };

  const getArtistInfoFromDB = () => {
    // TODO: need to code logic to pull only artist images/names that user owns
    // const { data } = await axios.post(
    //   `${process.env.REACT_APP_SERVER_URL}/v1/user/gettokensbought`,
    //   { uid }
    // );
    // tempTokenAddresses = data.tokensBought;
    // setTokenSymbols(data.tokenNames);
    // console.log({ tempTokenAddresses });
    //set Profile Images
    // let imageUrls = tempTokenAddresses.map((address) => {
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
      } catch (err) {
        console.log(err);
      }
    }
  };

  const displayTotalValue = () => {
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
      const names = formatBalanceArray(tokenSymbols);
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

  const displayDoughnutChart = () => {
    if (isFetched) {
      return <Doughnetchart balances={totalValues} tokenNames={tokenSymbols} />;
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
              tokenNames={tokenSymbols}
              profileImages={profileImages}
            />
          </div>
          <div className="below-row">
            <div className="date-row-main">
              <div className="left-pricing">
                <div className="price-tag">
                  {" "}
                  <span>$</span> {displayTotalValue()}
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
            <div className="card-heading">Wallet</div>
            <a href="#">
              <img alt="" src={assetsImages.filter} />
            </a>
          </div>

          <div className="artist-holdings">
            {/* <div className="chart-row">{displayDoughnutChart()}</div> */}
            {/* <div className="chart-row">{displayPercentageBalances()}</div> */}

            <div className="artist-holdings-total m-auto col-12 d-flex align-items-center">
              <div
                className="artist-holdings-inner d-flex flex-column"
                // style={{ borderRight: "2px solid black" }}
              >
                <span
                  className="d-flex flex-row"
                  style={{ fontSize: "1.1rem" }}
                >
                  {wallet.wallet_address}
                </span>
                <span className="small-heading">Your Address</span>
              </div>
            </div>

            <div className="artist-holdings-total mr-auto mt-3 ml-auto col-12 d-flex align-items-center">
              <div
                className="artist-holdings-inner d-flex flex-column"
                // style={{ borderRight: "2px solid black" }}
              >
                <span className="d-flex flex-row">$ {displayTotalValue()}</span>
                <span className="small-heading">Total Wallet Balance</span>
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
            <div className="card-heading">Total Wallet Performance</div>
            <div className="dollar-price">
              <span>$</span> {displayTotalValue()}
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
    </div>
  );
};
export default Dashboard;
