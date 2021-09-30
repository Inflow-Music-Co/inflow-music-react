/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import { assetsImages } from "../constants/images";
import Slider from "../component/Slider";
// import Performbar from '../component/Performbar';
import ProgressBar from "react-bootstrap/ProgressBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Doughnutchart from "../component/Doughnutchart";
import MyBalanceChart from "../component/MyBalanceChart";
import CreateArtistModal from "../component/CreateArtistModal";
import { ethers } from 'ethers'
import { connected, setProvider } from "../store/reducers/walletSlice";
// import Mynftdropdown from '../component/Mynftdropdown';
// import Song from '../component/Song';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Inflow } from "../inflow-solidity-sdk/src/Inflow";
import SmallLoader from "../component/SmallLoader";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import "../component/Artist.css";
import SendModal from "../component/SendModal"
import Swal from "sweetalert2";
import { Magic } from "magic-sdk";
import withReactContent from "sweetalert2-react-content";
import { updateActivePage } from "../store/reducers/appSlice";
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
  const isArtist = useSelector((state) => state.auth.isArtist);
  const [walletProvider, setWalletProvider] = useState();
  const [connectedWallet, setConnectedWallet] = useState(true);
  const [isFetched, setIsFetched] = useState(false);
  const [tokenBalances, setTokenBalances] = useState([]);
  const [tokenPrices, setTokenPrices] = useState([]);
  const [tokenAddresses, setTokenAddresses] = useState([]);
  const [totalValues, setTotalValues] = useState([]);
  const [tokenSymbols, setTokenSymbols] = useState([]);
  const [tokenMappings, setTokenMappings] = useState();
  const [userAddress, setUserAddress] = useState();
  const [send, setSend] = useState(false);
  const [copied, setCopied] = useState(false);
  const [usdcBalance, setUsdcBalance] = useState();
  const [formattedAddress, setFormattedAddress] = useState();
  const [recieve, setRecieve] = useState(false);
  const [addedUsdc, setAddedUsdc] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const [createArtistAccount, setCreateArtistAccount] = useState(false);

  useEffect(async () => {
    
    const isLoggedIn = await magic.user.isLoggedIn();
    console.log('isLoggedIn', isLoggedIn);
   
    if(isLoggedIn) {
      const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
      const { email, publicAddress } = await magic.user.getMetadata();
      setUserAddress(publicAddress);
      setUserEmail(email);
      dispatch(connected({ address: publicAddress }));
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

  useEffect(async () => {
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
    recieve &&
      MySwal.fire({
        title: <p style={{ color: "white" }}>copy your address to recieve tokens in your wallet address : {`${userAddress}`}</p>,
        icon: "info",
        background: "#303030",
      }).then((result) => {
        if (result.isConfirmed) {
          setCopied((recieve) => !recieve);
        }
      });
  }, [recieve])

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

      await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/v1/artist/gettokensbought`, {
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

  const displayTotalUSDC = async () => {
    console.log('displayTotalUSD fired');
    if(walletProvider){
      const inflow = new Inflow(walletProvider, 4);
      const signer = walletProvider.getSigner();
      const signerAddress = await signer.getAddress();
      const usdcBalance = await inflow.balanceOf("USDC", signerAddress);
      let formattedBalance = parseInt(usdcBalance[0]).toFixed(2);
      setUsdcBalance(formattedBalance);
      console.log('usdc Balance', formattedBalance);
    } 
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

  const onCreate = () => {
    setCreateArtistAccount((createArtistAccount) => !createArtistAccount)
  }

  displayTotalUSDC();
  displayDoughnutChart();
  displayTotalValue();

  return (
    <div className="dashboard-wrapper-main">
      <Grid container direction="row">
        <Grid item xs={9}>
      <div className="heading">my dashboard</div>
        </Grid>
        <Grid item xs={3}>

      {isArtist ? <h5> approved artist account </h5>
        : <Button 
        variant="contained" 
        style={{borderRadius: 40}}
        onClick={onCreate}>Create Artist Account</Button> }
        </Grid>
      </Grid> 
      {createArtistAccount ? 
        <CreateArtistModal 
          createArtistAccount={createArtistAccount} 
          setCreateArtistAccount={setCreateArtistAccount}
          userEmail={userEmail}
          userAddress={userAddress}
          /> 
          : null}
      <div className="first-row-main-dash">
        <div className="left-col">
          <div className="above-row">
            <div className="inner-row">
              <div className="card-heading">artist performance</div>
              <a href="#">
                <img alt="" src={assetsImages.filter} />
              </a>
            </div>
            <Slider
              tokenPrices={tokenPrices}
              tokenSymbols={tokenSymbols}
              tokenAddresses={tokenAddresses}
            />
          </div>
          <div className="below-row">
            <div className="date-row-main">
              <div className="left-pricing">
                <div className="price-tag">
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
            {isFetched ?  <div className="chart-row">{displayDoughnutChart()}</div> : null}
            <div className="chart-row">{displayPercentageBalances()}</div>
            <div className="artist-holdings-total m-auto col-12 d-flex align-items-center">
              <div
                className="artist-holdings-inner d-flex flex-column"
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
              >
                <span className="d-flex flex-row"></span>
                <span className="small-heading">Total Wallet Balance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="token-chart">
        <div className="card-heading">
        <Grid container direction="row">
          {walletProvider ? 
          <Grid item container xs={9} direction="row" alignItems="flex-end" justify="flex-end">
          <Button 
            variant="contained" 
            size="medium" 
            color="secondary"
            onClick={() => setSend(true)}
            style={{margin : 10}}>
              Send Tokens & NFTs
          </Button>
          </Grid> : <div> connecting wallet ... </div>}
          <Grid Grid item container xs={3} direction="row" alignItems="flex-end" justify="flex-end">
          <Button 
            onClick={() => setRecieve(true)}
            variant="contained" 
            size="medium" 
            color="primary"
            style={{margin : 10}}>
              Recieve Tokens & NFTs
          </Button>
          </Grid>
          </Grid>
        </div>
      </div>
      <div className="token-chart">
        <div className="chart-header-row">
        <Grid container direction="column" alignItems="center" justify="center">
          <Grid item style={{paddingBottom: 10}}>
               {tokenSymbols.length > 0 ? <div className="right-side-value">total usdc : ${usdcBalance}</div> : <span>loading ... </span>}
          </Grid>
            <Button 
              style={{backgroundColor: "#3f7da6", color: "white", marginLeft: 5}} 
              variant="contained"
              onClick={launchTransak}
              size="large">
              Buy USDC
          </Button>          
          </Grid>
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
                addedUsdc={addedUsdc}
                setAddedUsdc={setAddedUsdc}
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