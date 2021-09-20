/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import { assetsImages } from "../constants/images";
import Slider from "../component/Slider";
import Customdropdown from '../component/Customdropdown';
// import Performbar from '../component/Performbar';
import ProgressBar from "react-bootstrap/ProgressBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Doughnutchart from "../component/Doughnutchart";
import MyBalanceChart from "../component/MyBalanceChart";
import { ethers } from 'ethers'
import { connected, setProvider } from "../store/reducers/walletSlice";
// import Mynftdropdown from '../component/Mynftdropdown';
// import Song from '../component/Song';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Inflow } from "../inflow-solidity-sdk/src/Inflow";
import SmallLoader from "../component/SmallLoader";
import Button from '@material-ui/core/Button'
import "../component/Artist.css";
import SendSocialToken from "../component/SendSocialToken"
import SendModal from "../component/SendModal"
import Swal from "sweetalert2";
import { Magic } from "magic-sdk";
import withReactContent from "sweetalert2-react-content";
import { updateActivePage } from "../store/reducers/appSlice";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FileCopy from "@material-ui/icons/FileCopy";
import transakSDK from '@transak/transak-sdk';

const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY_RINKEBY, {
  network: "rinkeby",
});

const Dashboard = () => {

  const dispatch = useDispatch();
  // const { walletProvider } = useContext(WalletProviderContext);
  const MySwal = withReactContent(Swal);
  const uid = useSelector((state) => state.auth.data._id);
  const [walletProvider, setWalletProvider] = useState();
  const [connectedWallet, setConnectedWallet] = useState(true);
  const [isFetched, setIsFetched] = useState(false);
  const [tokenBalances, setTokenBalances] = useState([]);
  const [tokenPrices, setTokenPrices] = useState([]);
  const [tokenAddresses, setTokenAddresses] = useState([]);
  const [totalValues, setTotalValues] = useState([]);
  const [tokenSymbols, setTokenSymbols] = useState([]);
  const [tokenMappings, setTokenMappings] = useState({});
  const [profileImages, setProfileImages] = useState([]);
  const [userAddress, setUserAddress] = useState();
  const [send, setSend] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formattedAddress, setFormattedAddress] = useState();

  useEffect(async () => {
    
    const isLoggedIn = await magic.user.isLoggedIn();
    console.log('isLoggedIn', isLoggedIn)
   
    if(isLoggedIn) {
      const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setUserAddress(address);
      dispatch(connected({ address: address }));
      setWalletProvider(provider);
      dispatch(setProvider(provider));
      setConnectedWallet(true);
      setSend(false);
      dispatch(updateActivePage("dashboard"));
      await getTokensOwnedByUser();
    } else {
      setConnectedWallet(false);
    }
  }, []);

  useEffect(() => {
    formatAddress();
  },[userAddress])

  useEffect(async () => {
      await getTokensBalAndPrice();
      setIsFetched(true);
  },[tokenAddresses])

  useEffect(() => {
    copied &&
      MySwal.fire({
        title: <p style={{ color: "white" }}>copied address to clipboard</p>,
        icon: "success",
        background: "#303030",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("need to implement direct magiclink login button here");
          setCopied((copied) => !copied);
        }
      });

  }, [copied])

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

  const getTokensOwnedByUser = async () => {
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/v1/user/gettokensbought`, {
        uid
      })
      .then((resp) => {
        console.log(resp.data)
        mapAndFilter(resp.data.tokensBought)     
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const mapAndFilter = (buys) => {
    let tempAddresses = [];
    let tempSymbols = [];
    let filtered = [];
    buys.forEach(buy => {
      if(buy.address && buy.symbol){
        tempAddresses.push(buy.address);
        tempSymbols.push(buy.symbol)
      }
    });
    const noDuplicateAddresses = tempAddresses.filter((value, index) => tempAddresses.indexOf(value) === index);
    const noDuplicateSymbols = tempSymbols.filter((value, index) => tempSymbols.indexOf(value) === index)
    noDuplicateAddresses.forEach((address, index) => {
      filtered.push({ address, symbol : noDuplicateSymbols[index]})
    })
    console.log(filtered);
    setTokenMappings(filtered);
    setTokenSymbols(noDuplicateSymbols);
    setTokenAddresses(noDuplicateAddresses);
  }

  const getTokensBalAndPrice = async () => {
    console.log('getTokensBalAndPrice fired')
    console.log({ tokenAddresses });
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
      setTokenBalances(tempBalances);
      setTokenPrices(tempPrices);
      setTotalValues(tempValues);
      console.log('totalValues', totalValues);
      setIsFetched(true); 
    }
  };

  const launchTransak = () => {

      let transak = new transakSDK({
        apiKey: 'ee41ed4b-c89a-42c0-9aab-d9d472916ac7',  // Your API Key
        environment: 'PRODUCTION', // STAGING/PRODUCTION
        defaultCryptoCurrency: 'ETH',
        walletAddress: userAddress, // Your customer's wallet address
        themeColor: '000000', // App theme color
        fiatCurrency: 'USD', // INR/GBP
        email: 'limited-game@dfjqlpa2.mailosaur.net', // Your customer's email address
        redirectURL: '',
        hostURL: window.location.origin,
        widgetHeight: '550px',
        widgetWidth: '450px'
    });
    transak.init();
    transak.on(transak.ALL_EVENTS, (data) => {console.log(data)});
    transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
      console.log(orderData);
      transak.close();
    });
  }

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
        setError(true);
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

  const formatAddress = () => {
    if(userAddress) {
      let formatted = userAddress.substring(0, 20);
      formatted += ' ...';
      setFormattedAddress(formatted);
      console.log({ formattedAddress });
    }
  }

  const displayPercentageBalances = () => {
    if (isFetched) {
      const sum = totalValues.reduce(function (a, b) {
        return a + b;
      }, 0);
      const amount = formatBalanceArray(totalValues);
      const names = formatBalanceArray(tokenSymbols);
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
    if (isFetched && totalValues.length !== 0) {
      return <Doughnutchart totalValues={tokenBalances} tokenSymbols={tokenSymbols} />;
    } 
  };

  displayDoughnutChart();
  displayTotalValue();

  return (
    <div className="dashboard-wrapper-main">
      <div className="heading">my dashboard</div>
      <div className="first-row-main-dash">
        <div className="left-col">
          <div className="above-row">
            <div className="inner-row">
              <div className="card-heading">artist performance</div>
              <a href="#">
                <img alt="" src={assetsImages.filter} />
              </a>
            </div>
            {/* <Slider
              tokenPrices={tokenPrices}
              // tokenNames={tokenData}
              profileImages={profileImages}
            /> */}
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

        <div className="right-col">
          <div className="inner-row">
            <div className="card-heading">wallet</div>
            <a href="#">
              <img alt="" src={assetsImages.filter} />
            </a>
          </div>

          <div className="artist-holdings">
            <div className="chart-row"></div>
            {isFetched ?  <div className="chart-row">{displayDoughnutChart()}</div> : null}

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
            {formattedAddress ? <div>{formattedAddress} </div> : <div>loading address ... </div>}
                <IconButton onClick={() => {navigator.clipboard.writeText(userAddress); setCopied(true)}} style={{paddingTop: 0}}>
                    <FileCopy fontSize="small"/>
                </IconButton>
                </span>
                <span className="small-heading">your address</span>
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
            </div>
          </div>
        </div>
      </div>
      <div className="token-chart">
        <div className="card-heading">
          <Button 
            variant="contained" 
            size="medium" 
            color="secondary"
            onClick={() => setSend(true)}
            style={{margin : 10}}>
              Send Tokens & NFTs
          </Button>
          <Button variant="contained" size="medium" color="primary">
              Recieve Tokens & NFTs
          </Button>
          
        </div>
      </div>
      <div className="token-chart">
        <div className="chart-header-row">
          <div className="token-info">
            <div className="card-heading">total wallet performance</div>
            <div className="dollar-price">
              <span>$</span> {displayTotalValue()}
            </div>
            <Button 
              style={{backgroundColor: "#3f7da6", color: "white", marginLeft: 5}} 
              variant="contained"
              onClick={launchTransak}>
              Buy USDC
          </Button> 
          </div>
         
          <div className="btn-filter">
            <a href="#">
              <img alt="" src={assetsImages.filter} />
            </a>
          </div>
        </div>
        <div className="total-bal-chart">{/* <Totalbalancechart /> */}</div>
        <div className="deposite-earning-row">
          <div className="deposits">
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
              </div>
        </div>
      </div>
      {send ? <div> 
                <SendModal 
                send={send} 
                setSend={setSend} 
                tokenMappings={tokenMappings}
                provider={walletProvider}
                getTokensBalAndPrice={getTokensBalAndPrice}
                /> 
                <div className="card-heading">Processing Transaction Please Wait </div>
                </div>
                 : null}

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