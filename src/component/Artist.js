/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import "./component.css";
import "./Artist.css";
import { assetsImages } from "../constants/images";
// import artistbg from "../assets/images/artist-background.jpg";
// import Customdropdown from "./Customdropdown";
// import Performbar from "./Performbar";
// import ProgressBar from "react-bootstrap/ProgressBar";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import Song from './Song';
// import Mynftdropdown from './Mynftdropdown';
import { Modal } from "react-bootstrap";
import Loader from "./Loader";
import SmallLoader from "./SmallLoader";
import { Inflow } from "../inflow-solidity-sdk/src/Inflow";
import { Contract, ethers } from "ethers";
import SocialToken from "../artifacts/contracts/token/social/SocialToken.sol/SocialToken.json";
import MockUSDC from "../artifacts/contracts/mocks/MockUSDC.sol/MockUSDC.json";
import { useParams, useHistory } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import Axios from "axios";
import { RINKEBY_MOCKUSDC } from "../utils/addresses";
import { useSelector } from "react-redux";
import { WalletProviderContext } from "../contexts/walletProviderContext";
import TokenChart from "./TokenChart";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// import { Link } from '@material-ui/core';

let errcode = "";

const Artist = () => {
  const history = useHistory();
  const MySwal = withReactContent(Swal);
  const { walletProvider } = useContext(WalletProviderContext);
  const wallet = useSelector((state) => state.wallet);
  const provider = useSelector((state) => state.wallet.provider);
  const token = useSelector((state) => state.auth.token);
  const uid = useSelector((state) => state.auth.data._id);
  const { id } = useParams();
  const [artist, setArtist] = useState({});
  const [profileModel, setprofileModel] = useState(false);
  const [sell, setsell] = useState(false);
  const [buy, setbuy] = useState(false);
  const [MintPrice, setMintPrice] = useState("");
  // const [BurnPrice, setBurnPrice] = useState();
  const [TokensToMint, setTokensToMint] = useState(0);
  const [TokensToBurn, setTokensToBurn] = useState(0);
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(false);
  const [successmint, setsuccessmint] = useState(false);
  const [successburn, setsuccessburn] = useState(false);
  const [failuremint, setfailuremint] = useState(false);
  const [failureburn, setfailureburn] = useState(false);
  const [lessusdc, setlessusdc] = useState(false);
  const [connectedwallet, setconnectedwallet] = useState(true);
  const [socialTokenAddress, setSocialTokenAddress] = useState("");
  const [sellflag, setsellflag] = useState(false);
  const [buyflag, setbuyflag] = useState(false);
  const [totalmintprice, settotalmintprice] = useState(0.0);
  const [totalburnprice, settotalburnprice] = useState(0.0);
  const [buymodalloading, setbuymodalloading] = useState(false);
  const [sellmodalloading, setsellmodalloading] = useState(false);
  const [insufficenttokens, setinsufficenttokens] = useState(false);
  const [historicalData, setHistoricalData] = useState([]);
  const [playlistID, setPlaylistID] = useState("529230339");
  const [mintGateUrl, setMintGateUrl] = useState("");

  useEffect(() => {

    if (!wallet.wallet_connected) {
      setconnectedwallet(false);
    }

    if (balance !== ''){
      console.log(balance);
      getUserBalance();
    }

    const init = async () => {
      console.log({ provider });
      setLoading(true);
      const { data } = await Axios.post(
        `${process.env.REACT_APP_SERVER_URL}/v1/artist/getbyid`,
        { id }
      );

      if (data.artist) {
        setArtist(data.artist);
        setSocialTokenAddress(data.artist.social_token_id);
        fetchTokenPrice();
        const res = await Axios.post(
          `${process.env.REACT_APP_SERVER_URL}/v1/artist/gettxhistorybyartist`,
          artist
        );
        setHistoricalData(res.data.priceHistory);
        getUserBalance();
        setLoading(false);
        // const tokenPrice = setInterval(() => {
        //   fetchTokenPrice();
        // }, 10000);
        // return () => {
        //     clearInterval(tokenPrice);
        // };
      }

      Axios.post(
        `${process.env.REACT_APP_SERVER_URL}/v1/artist/getmintgateurlsbyid`,
        { id }
      ).then((response) => {
        setMintGateUrl(response.data.mintGatedUrls[0]);
        console.log("response", response);
      });
    };
    
    console.log("uid", uid);
    
    if (uid) {
      return init();
    } else {
      console.log("NOT LOGGED IN");
      setconnectedwallet(false);
    }
  }, [id, socialTokenAddress, provider]);

  useEffect(() => {
    !connectedwallet &&
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
          console.log("need to implement magiclink login");
          // setconnectedwallet((connectedwallet) => !connectedwallet);
        }
      });
  }, [connectedwallet]);
  useEffect(() => {
    lessusdc &&
      MySwal.fire({
        title: <p style={{ color: "white" }}>Transaction Denied</p>,
        icon: "error",
        html: <span style={{ color: "white" }}>Insufficient USDC Balance</span>,
        customClass: {
          confirmButton: "btn-gradiant",
        },
        buttonsStyling: false,
        background: "#303030",
      }).then(() => {
        setlessusdc((lessusdc) => !lessusdc);
      });
  }, [lessusdc]);
  useEffect(() => {
    insufficenttokens &&
      MySwal.fire({
        title: <p style={{ color: "white" }}>Insufficient Tokens To Sell</p>,
        icon: "error",
        customClass: {
          confirmButton: "btn-gradiant",
        },
        buttonsStyling: false,
        background: "#303030",
      }).then(() => {
        setinsufficenttokens((insufficenttokens) => !insufficenttokens);
      });
  }, [insufficenttokens]);
  useEffect(() => {
    failureburn &&
      MySwal.fire({
        title: <p style={{ color: "white" }}>Transaction Denied</p>,
        icon: "error",
        html: <span style={{ color: "white" }}>Error selling tokens</span>,
        customClass: {
          confirmButton: "btn-gradiant",
        },
        buttonsStyling: false,
        background: "#303030",
      }).then(() => {
        setfailureburn((failureburn) => !failureburn);
      });
  }, [failureburn]);
  useEffect(() => {
    successburn &&
      MySwal.fire({
        title: <p style={{ color: "white" }}>Transaction Successfull</p>,
        icon: "success",
        customClass: {
          confirmButton: "btn-gradiant",
        },
        buttonsStyling: false,
        background: "#303030",
      }).then(() => {
        setsuccessburn((successburn) => !successburn);
      });
  }, [successburn]);
  useEffect(() => {
    failuremint &&
      MySwal.fire({
        title: <p style={{ color: "white" }}>Transaction Denied</p>,
        icon: "error",
        html: <span style={{ color: "white" }}>Error buying tokens</span>,
        customClass: {
          confirmButton: "btn-gradiant",
        },
        buttonsStyling: false,
        background: "#303030",
      }).then(() => {
        setfailuremint((failuremint) => !failuremint);
      });
  }, [failuremint]);
  useEffect(() => {
    successmint &&
      MySwal.fire({
        title: <p style={{ color: "white" }}>Transaction Successful</p>,
        icon: "success",
        customClass: {
          confirmButton: "btn-gradiant",
        },
        buttonsStyling: false,
        background: "#303030",
      }).then(() => {
        setsuccessmint((successmint) => !successmint);
      });
  }, [successmint]);

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  // const getBalance = async () => {
  //     if (
  //         typeof window.ethereum !== 'undefined' &&
  //         socialTokenAddress &&
  //         socialTokenAddress !== ''
  //     ) {
  //         try {
  // const provider = new ethers.providers.Web3Provider(
  //     window.ethereum
  // );
  // const signer = provider.getSigner();
  // const signerAddress = await signer.getAddress();
  // const inflow = new Inflow(provider, 80001);
  // const balance = await inflow.balanceOf(
  //     'SocialToken',
  //     signerAddress,
  //     socialTokenAddress
  // );
  // setBalance(balance[0]);
  //             // // console.log(`BALANCE: ${balance[0]}`);
  //         } catch (err) {
  //             // // console.log(err);
  //         }
  //     }
  // };

  const fetchTokenPrice = async () => {
    try {
      if (provider) {
        const inflow = new Inflow(provider, 4);
        const mintPrice = await inflow.getMintPriceSocial(
          socialTokenAddress,
          inflow.parseERC20("SocialToken", "1")
        );
        setMintPrice(mintPrice[0]);
      }
    } catch (err) {
      if (errcode === -32002) {
        errcode = "";
        history.go(0);
      }
      errcode = err.code;
    }
  };

  // const fetchBurnPrice = async () => {
  //     if (
  //         typeof window.ethereum !== 'undefined' &&
  //         socialTokenAddress &&
  //         socialTokenAddress !== ''
  //     ) {
  //         try {
  //             // await requestAccount();
  //             const provider = new ethers.providers.Web3Provider(
  //                 window.ethereum
  //             );
  //             const inflow = new Inflow(provider, 80001);
  //             const burnPrice = await inflow.getBurnPriceSocial(
  //                 socialTokenAddress,
  //                 inflow.parseERC20('SocialToken', '1')
  //             );
  //             setBurnPrice(burnPrice[0]);
  //             // // console.log(`BURN PRICE: ${burnPrice[0]}`);
  //         } catch (err) {
  //             // // console.log(err);
  //         }
  //     }
  // };

  const displayTokenPrice = () => {
    if (MintPrice && MintPrice !== "") {
      // const converted = Number(MintPrice).toFixed(4);
      return (
        <div className="dollar-price">
          <span>$</span> {MintPrice}
        </div>
      );
    } else {
      return <SmallLoader />;
    }
  };

  const displayBalance = () => {
    let balanceInUSD = MintPrice * balance;
    balanceInUSD = balanceInUSD.toFixed(2)
      if (MintPrice && MintPrice !== '') {
          return <div className="dollar-price">
          {balance ? `${balance} ${artist.social_token_symbol}
          \u00A0\u00A0\u00A0($${balanceInUSD})` 
          :`0.0 ${artist.social_token_symbol}`}
          </div>
      } else {
          return <SmallLoader />;
      }
  };

  const getUserBalance = async () => {
    if (provider){
      const provider = walletProvider;
      const signer = provider.getSigner();

      const inflow = new Inflow(provider, 4);
      const signerAddress = await signer.getAddress();
      const userBalance = await inflow.balanceOf(
        "SocialToken",
        signerAddress,
        socialTokenAddress
      );
      
      setBalance(userBalance[0]);
      console.log('BALANCE MFFF', balance)

      //if balance is zero, remove token address from user record in DB
      if(balance === undefined || balance === '0.0'){
        await Axios.post(
          `${process.env.REACT_APP_SERVER_URL}/v1/user/selltoken`,
          { socialTokenAddress, uid }
        )
          .then((resp) => {
            console.log(resp.data);
          })
          .catch((err) => {
            console.error(err);
          });
        console.log("reduced user token balance from DB successfully");
      }
    } 
  }

  // const mint = async (social, usdc, amount) => {
  //     const mintPrice = await social.getMintPrice(amount);
  //     await (await usdc.mint(mintPrice)).wait(); // this line to be removed if the balance of usdc wallet issue is fixed
  //     await (await usdc.approve(social.address, mintPrice)).wait();
  //     await (await social.mint(amount)).wait();
  //     return mintPrice;
  // };

  const buyTokens = async () => {
    console.log(socialTokenAddress);
    console.log("MAGIC PROVIDER ____", provider);
    if (!provider) {
      alert("Please log in");
      return;
    }

    if (provider) {
      console.log("wallet provider is true");
      try {
          const signer = provider.getSigner();
          const socialMinter = new Contract(
            socialTokenAddress,
            SocialToken.abi,
            signer
          );

        const usdcMinter = new Contract(RINKEBY_MOCKUSDC, MockUSDC.abi, signer);
        console.log({ usdcMinter });

        // const usdcMinter = usdc.connect(signer);
        const inflow = new Inflow(provider, 4);
        setbuymodalloading(true);
        const signerAddress = await signer.getAddress();
        const usdcBalance = await inflow.balanceOf("USDC", signerAddress);
        console.log("usdc Balance", usdcBalance);
        await fetchTokenPrice();
        console.log("fetched token price");
        if (parseFloat(usdcBalance[0]) < parseFloat(totalmintprice)) {
          console.log("HELLO");
          setLoading(false);
          setlessusdc((lessusdc) => !lessusdc);
          return;
        }
        const allowance = await inflow.allowance(
          "SocialToken",
          signerAddress,
          socialTokenAddress,
          socialTokenAddress
        );
        console.log({ allowance });
        if (parseFloat(allowance) >= parseFloat(totalmintprice)) {
          console.log("ALLOWANCE GREATER SO MINTING DIRECTLY");
          await (
            await socialMinter.mint(
              inflow.parseERC20("SocialToken", String(TokensToMint))
            )
          ).wait();
          setLoading(false);
          setsuccessmint((successmint) => !successmint);
          await Axios.post(
            `${process.env.REACT_APP_SERVER_URL}/v1/user/buytoken`,
            { 
              socialTokenAddress,
              symbol : artist.social_token_symbol ,
              uid 
            })
            .then((resp) => {
              console.log(resp.data);
            })
            .catch((err) => {
              console.error(err);
            });
          setInterval(() => {
            // window.location.reload();
            history.go(0);
          }, 2000);
          return;
        }
        const mintPrice = await socialMinter.getMintPrice(
          inflow.parseERC20("SocialToken", String(TokensToMint))
        );
        console.log("ALLOWANCE LESS SO GETTING APPROVAL");
        await (
          await usdcMinter.approve(socialMinter.address, mintPrice)
        ).wait();
        await (
          await socialMinter.mint(
            inflow.parseERC20("SocialToken", String(TokensToMint))
          )
        ).wait();
        console.log("MINT SUCCESSFULL");
        console.log({ socialTokenAddress });
        await Axios.post(
          `${process.env.REACT_APP_SERVER_URL}/v1/user/buytoken`,
          { socialTokenAddress, uid }
        )
          .then((resp) => {
            console.log(resp.data);
          })
          .catch((err) => {
            console.error(err);
          });
        console.log("added user token association to DB successfully");

        await updatePriceHistory();

        setbuymodalloading(false);
        setsuccessmint((successmint) => !successmint);
        // setInterval(() => {
        //     window.location.reload();
        // }, 2000)
        // getBalance();
        setbuy(false);
      } catch (err) {
        setbuymodalloading(false);
        setfailuremint((failuremint) => !failuremint);
        setbuy(false);
        console.log(err);
      }
    } else {
      setconnectedwallet(false);
    }
    // if (
    //     typeof window.ethereum !== 'undefined' &&
    //     socialTokenAddress &&
    //     socialTokenAddress !== ''
    // ) {
    //     // try {
    //     //     // // console.log("HEERREE")
    //     //     await requestAccount();
    //     //     const provider = new ethers.providers.Web3Provider(
    //     //         window.ethereum
    //     //     );
    //     //     // const admin = new Wallet(
    //     //     //     process.env.REACT_APP_ADMIN_PVT_KEY,
    //     //     //     provider
    //     //     // );
    //     //     const signer = provider.getSigner();
    //     //     const social = new Contract(
    //     //         socialTokenAddress,
    //     //         SocialToken.abi,
    //     //         signer
    //     //     );
    //     //     const socialMinter = social.connect(signer);
    //     //     const usdc = new Contract(
    //     //         MOCKUSDC,
    //     //         MockUSDC.abi,
    //     //         signer
    //     //     );
    //     //     const usdcMinter = usdc.connect(signer);
    //     //     const inflow = new Inflow(provider, 80001);
    //     //     setbuymodalloading(true);
    //     //     const signerAddress = await signer.getAddress();
    //     //     const usdcBalance = await inflow.balanceOf(
    //     //         'USDC',
    //     //         signerAddress
    //     //     );
    //     //     await fetchTokenPrice();
    //     //     if (parseFloat(usdcBalance[0]) < parseFloat(totalmintprice)) {
    //     //         // // console.log("HELLO")
    //     //         setLoading(false)
    //     //         setlessusdc((lessusdc) => !lessusdc);
    //     //         return;
    //     //     }
    //     //     const allowance = await inflow.allowance(
    //     //         'SocialToken',
    //     //         socialTokenAddress,
    //     //         signer.getAddress(),
    //     //         socialTokenAddress
    //     //     );
    //     //     // // console.log({ allowance });
    //     //     if (parseFloat(allowance) > parseFloat(totalmintprice)) {
    //     //         // // console.log('ALLOWANCE GREATER SO MINTING DIRECTLY');
    //     //         await (
    //     //             await socialMinter.mint(
    //     //                 inflow.parseERC20(
    //     //                     'SocialToken',
    //     //                     String(TokensToMint)
    //     //                 )
    //     //             )
    //     //         ).wait();
    //     //         setLoading(false)
    //     //         setsuccessmint(successmint => !successmint)
    //     //         setInterval(() => {
    //     //             window.location.reload();
    //     //         }, 2000)
    //     //         return;
    //     //     }
    //     //     const mintPrice = await socialMinter.getMintPrice(
    //     //         inflow.parseERC20('SocialToken', String(TokensToMint))
    //     //     );
    //     //     // // console.log('ALLOWANCE LESS SO GETTING APPROVAL');
    //     //     await (
    //     //         await usdcMinter.approve(socialMinter.address, mintPrice)
    //     //     ).wait();
    //     //     await (
    //     //         await socialMinter.mint(
    //     //             inflow.parseERC20('SocialToken', String(TokensToMint))
    //     //         )
    //     //     ).wait();
    //     //     // // console.log('MINT SUCCESSFULL');
    //     //     setbuymodalloading(false);
    //     //     setsuccessmint(successmint => !successmint)
    //     //     setInterval(() => {
    //     //         window.location.reload();
    //     //     }, 2000)
    //     //     // getBalance();
    //     // } catch (err) {
    //     //     setbuymodalloading(false);
    //     //     setfailuremint(failuremint => !failuremint)
    //     //     // // console.log(err);
    //     // }
    // }
  };

  const burn = async (social, amount) => {
    const burnPrice = await social.getBurnPrice(amount);
    await (await social.burn(amount)).wait();
    return burnPrice;
  };

  const sellTokens = async () => {
    if (walletProvider) {
      try {
        setsellmodalloading(true);
       
        const provider = walletProvider;
        
        const signer = provider.getSigner();
        const socialMinter = new Contract(
          socialTokenAddress,
          SocialToken.abi,
          signer
        );

        const inflow = new Inflow(provider, 4);
        const signerAddress = await signer.getAddress();
        const balance = await inflow.balanceOf(
          "SocialToken",
          signerAddress,
          socialTokenAddress
        );

        if (balance[0] < TokensToBurn) {
          setinsufficenttokens(true);
        }
        await burn(
          socialMinter,
          inflow.parseERC20("SocialToken", String(TokensToBurn))
        );

        setBalance(balance[0]);

        //check user balance, if zero, remove tokenAddress from DB 
        getUserBalance();

        setsellmodalloading(false);
        setsuccessburn((successburn) => !successburn);
        setsell(false);
        await updatePriceHistory();
        // getBalance();
      } catch (err) {
        setsellmodalloading(false);
        setfailureburn((failureburn) => !failureburn);
        setsell(false);
        // // console.log(err);
      }
    } else {
      setconnectedwallet(false);
    }
   
  };

  const fetchtotalburnprice = async () => {
    if (walletProvider) {
      try {
        setsellmodalloading(true);
        // await requestAccount();
        // const provider = new ethers.providers.Web3Provider(
        //     window.ethereum
        // );
        const provider = walletProvider;
        const inflow = new Inflow(provider, 4);
        const burnPrice = await inflow.getBurnPriceSocial(
          socialTokenAddress,
          inflow.parseERC20("SocialToken", String(TokensToBurn))
        );
        settotalburnprice(burnPrice[0]);
        // // console.log(`BURN PRICE: ${burnPrice[0]}`);
        setsellmodalloading(false);
        setsellflag(true);
      } catch (err) {
        setsellmodalloading(false);
        // // console.log(err);
      }
    }
  };

  const fetchtotalmintprice = async () => {
    if (walletProvider) {
      try {
        setbuymodalloading(true);
        // // console.log({ socialTokenAddress })
        // await requestAccount();
        const provider = walletProvider;
        const inflow = new Inflow(provider, 4);
        const mintPrice = await inflow.getMintPriceSocial(
          socialTokenAddress,
          inflow.parseERC20("SocialToken", String(TokensToMint))
        );
        settotalmintprice(mintPrice[0]);
        setbuymodalloading(false);
        setbuyflag(true);
        // // console.log(`MINT PRICE: ${mintPrice[0]}`);
      } catch (err) {
        setbuymodalloading(false);
        // // console.log(err);
      }
    }
  };

  const redirectToTokenGate = async () => {
    if (mintGateUrl !== "") {
      window.location.assign(mintGateUrl);
    }
  };

  if (loading) {
    return <Loader />;
  }

  const updatePriceHistory = async () => {
    await Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/artist/tokentx`, {
      mint_price_history: {
        price: MintPrice,
        timestamp: Date.now(),
      },
      socialTokenAddress,
      first_name: artist.first_name,
      last_name: artist.last_name,
      social_token_id: artist.social_token_id,
    });
  };

  return (
    <div className="artist-background">
      <div className="artist-main">
        <div className="background">
          <img
            alt=""
            src={
              artist.banner_image
                ? `${process.env.REACT_APP_SERVER_URL}/${artist.banner_image}`
                : null
            }
            className="background-blur"
          />
        </div>
        <div className="artist-details">
          <div className="artist-main-details">
            <div className="artis-img mb-0">
              <img
                alt=""
                src={
                  artist.profile_image
                    ? `${process.env.REACT_APP_SERVER_URL}/${artist.profile_image}`
                    : null
                }
              />
            </div>
            <div className="artist-content">
              <div className="artist-content-details">
                <div className="artist-name">{`${
                  artist.first_name ? artist.first_name : ""
                } ${artist.last_name ? artist.last_name : ""}`}</div>
                {/* <div className="album-name">--</div> */}
                <ul>
                  <li>
                    <div className="song-total">325</div>
                    <div className="song-folder">Superfans</div>
                  </li>
                  <li>
                    <div className="song-total">28</div>
                    <div className="song-folder">NFTs</div>
                  </li>
                  <li>
                    <div className="song-total">{displayTokenPrice()}</div>
                    <div className="song-folder">Token Price</div>
                  </li>
                </ul>
              </div>
              <div className="">
                {/* <button className="follow-button">FOLLOW</button> */}
                {/* <button
                  className="edit-profile"
                  type="button"
                  onClick={() =>
                    setprofileModel((profileModel) => !profileModel)
                  }
                >
                  EDIT PROFILE
                </button> */}
              </div>
            </div>
          </div>
          <div className="artist-tag">
            <button
              className="tag-button"
              onClick={() => redirectToTokenGate()}
            >
              {" "}
              UNRELEASED MUSIC VIDEO{" "}
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-wrapper-main artist-main-wrapper">
        {/* ---------------Total-wallet-balance-------- */}
        <div className="token-chart">
          <div className="chart-header-row d-flex flex-row justify-content-between col-12">
            <div className="token-info">
              <div className="card-heading">
                {artist.social_token_symbol} Price
              </div>
              <div className="dollar-price">{displayTokenPrice()}</div>
              <div className="small-heading">--</div>
            </div>
            <div className="btn-filter mt-2"></div>
          </div>
          <div className="total-balance-row">
            <div className="token-info">
              <div className="card-heading">Available Balance</div>
              <div className="dollar-price">
                <div className="dollar-price">{displayBalance()}</div>
              </div>
            </div>
          </div>

          <div className="total-bal-chart">
            <TokenChart artist={artist} historicalData={historicalData} />
          </div>

          <div className="buy-sell-buttons col-4 offset-4">
            <div className="d-flex justify-content-around align-items-center mt-5">
              {/* <img alt="" src={assetsImages.button} /> */}

              {token && token.trim() === "" ? (
                <button
                  className="buy-button"
                  type="button"
                  onClick={() => {
                    // window.location.href = "/login";
                    history.push("/");
                  }}
                >
                  Sell
                </button>
              ) : walletProvider ? (
                <button
                  className="buy-button"
                  type="button"
                  onClick={() => setsell((sell) => !sell)}
                >
                  Sell
                </button>
              ) : (
                <button
                  className="buy-button"
                  type="button"
                  onClick={() =>
                    setconnectedwallet((connectedwallet) => !connectedwallet)
                  }
                >
                  Sell
                </button>
              )}

              {token && token.trim() === "" ? (
                <button
                  className="sell-button"
                  type="button"
                  onClick={() => {
                    // window.location.href = "/login";
                    history.push("/");
                  }}
                >
                  Buy
                </button>
              ) : walletProvider ? (
                <button
                  className="sell-button"
                  type="button"
                  onClick={() => setbuy((buy) => !buy)}
                >
                  Buy
                </button>
              ) : (
                <button
                  className="sell-button"
                  type="button"
                  onClick={() =>
                    setconnectedwallet((connectedwallet) => !connectedwallet)
                  }
                >
                  Buy
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="poll-play-song-details">
          <div className="row">
            <div className="col-lg-6">
              <div className="poll-details">
                <iframe
                  width="100%"
                  height="100%"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${playlistID}&color=%237d2add&auto_play=false&visual=true`}
                ></iframe>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="song-play-list">
                <div className="playlist-header">
                  <span className="like">
                    <img alt="" src={assetsImages.like} />
                    557
                  </span>
                  <button className="limited-song-btn">
                    <img alt="" src={assetsImages.verifed} />
                    Limited
                  </button>
                </div>

                <div className="playlist-details">
                  <div className="playlist-price">
                    <span>$</span>37.99
                  </div>
                  <div className="img-wrapper">
                    <img alt="" src={assetsImages.poster} />
                  </div>
                  <div className="playlist-title">Nothing Was The Same</div>
                  <div className="album-title">Drake: Album NFT</div>

                  <div className="playlist-start">
                    <span>Tier:</span>
                    <ul>
                      <li>
                        <img alt="" src={assetsImages.star} />
                      </li>
                      <li>
                        <img alt="" src={assetsImages.star} />
                      </li>
                      <li>
                        <img alt="" src={assetsImages.star} />
                      </li>
                      <li>
                        <img alt="" src={assetsImages.star} />
                      </li>
                      <li>
                        <img alt="" src={assetsImages.starwhite} />
                      </li>
                    </ul>
                  </div>
                  <div className="playlist-time">
                    Auction Ends: 7 hrs 38 mins
                  </div>

                  <div className="playlist-card-footer">
                    <div className="prev-button">
                      <button className="btn prev-icon">
                        <img alt="" src={assetsImages.prev} />
                      </button>
                    </div>
                    <div className="center-button">
                      <div className="bid-button">
                        <button className="bid-icon btn">Bid</button>
                      </div>
                      <div className="bid-amount d-none">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter bid amount"
                        />
                        <div className="next-icon">
                          <img alt="" src={assetsImages.next} />
                        </div>
                      </div>
                      <div className="bid-text d-none">
                        You are the high bidder!
                      </div>
                    </div>
                    <div className="next-button">
                      <button className="next-icon btn">
                        <img alt="" src={assetsImages.next} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                </div>

                <div className="songs-grid-main">
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

      <Modal
        show={profileModel}
        className="edit-profile-modal"
        onHide={() => setprofileModel((profileModel) => !profileModel)}
      >
        <Modal.Header closeButton>
          <span className="title">Edit Profile</span>
        </Modal.Header>

        <Modal.Body>
          <div className="form-group">
            <label>Name</label>
            <input className="form-control" type="text" placeholder="" />
          </div>

          <div className="user-profile">
            <img alt="" src={assetsImages.artist} />
            <button className="upload-profile btn-gradiant">
              Upload New Profile Picture
            </button>
          </div>

          <div className="user-profile-background">
            <img alt="" src={assetsImages.artistbg} />
            <button className="upload-profile-background btn-gradiant">
              Upload New Background Picture
            </button>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button className="save-btn btn-gradiant">Save Edits</button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={buy}
        className="edit-profile-modal sell"
        onHide={() => setbuy((buy) => !buy)}
      >
        <Modal.Header closeButton>
          <span className="title">Buy {artist.social_token_symbol} Token</span>
        </Modal.Header>

        <Modal.Body>
          {buymodalloading ? (
            <div className="d-flex justify-content-center align-items-center flex-column">
              <SmallLoader />
            </div>
          ) : (
            <>
              <div className="form-group">
                <label>Number of Tokens</label>
                <input
                  className="form-control"
                  type="number"
                  value={TokensToMint}
                  placeholder=""
                  onChange={(e) => {
                    setTokensToMint(e.target.value);
                    setbuyflag(false);
                  }}
                />
              </div>

              <div className="sell-total-amount">
                {/* Amount you'll spend: ${totalmintprice} */}
                Amount you'll spend: ${MintPrice * TokensToMint}
              </div>
            </>
          )}
          {buymodalloading && buyflag ? (
            <div className="d-flex justify-content-center align-items-center flex-column">
              Processing Transaction, Please Wait
            </div>
          ) : null}
        </Modal.Body>

        <Modal.Footer>
          <button
            disabled={buymodalloading}
            className="save-btn btn-gradiant"
            onClick={buyflag ? buyTokens : fetchtotalmintprice}
          >
            {buyflag ? "Buy" : "Get Buying Price"}
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={sell}
        className="edit-profile-modal buy"
        onHide={() => setsell((sell) => !sell)}
      >
        <Modal.Header closeButton>
          <span className="title">Sell {artist.social_token_symbol} Token</span>
        </Modal.Header>

        <Modal.Body>
          {sellmodalloading ? (
            <div className="d-flex justify-content-center align-items-center flex-column">
              <SmallLoader />
            </div>
          ) : (
            <>
              <div className="form-group">
                <label>Number of Tokens</label>
                <input
                  className="form-control"
                  type="number"
                  value={TokensToBurn}
                  placeholder=""
                  onChange={(e) => {
                    setTokensToBurn(e.target.value);
                    setsellflag(false);
                  }}
                />
              </div>

              <div className="buy-total-amount">
                Amount you'll earn: ${totalburnprice}
              </div>
            </>
          )}
          {sellmodalloading && sellflag ? (
            <div className="d-flex justify-content-center align-items-center flex-column">
              Processing Transaction Please Wait 
            </div>
          ) : null}
        </Modal.Body>

        <Modal.Footer>
          <button
            disabled={sellmodalloading}
            className="save-btn btn-gradiant"
            onClick={sellflag ? sellTokens : fetchtotalburnprice}
          >
            {sellflag ? "Sell" : "Get Selling Price"}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Artist;
