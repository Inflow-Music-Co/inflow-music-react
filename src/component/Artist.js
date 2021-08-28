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
import Totalbalancechart from "./Totalbalancechart";
// import Song from './Song';
// import Mynftdropdown from './Mynftdropdown';
import { Modal } from "react-bootstrap";
import Loader from "./Loader";
import SmallLoader from "./SmallLoader";
import { Inflow } from "../inflow-solidity-sdk/src/Inflow";
import { Contract, ethers } from "ethers";
import SocialToken from "../artifacts/contracts/token/social/SocialToken.sol/SocialToken.json";
import MockUSDC from "../artifacts/contracts/mocks/MockUSDC.sol/MockUSDC.json";
import SweetAlert from "react-bootstrap-sweetalert";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { RINKEBY_MOCKUSDC } from "../utils/addresses";
import { useSelector } from "react-redux";
import { WalletProviderContext } from "../contexts/walletProviderContext";

// import { Link } from '@material-ui/core';

let errcode = "";

const Artistpic = () => {
  const { walletProvider } = useContext(WalletProviderContext);
  const wallet = useSelector((state) => state.wallet);
  const token = useSelector((state) => state.auth.token);
  const uid = useSelector((state) => state.auth.data._id);
  const { id } = useParams();
  const [artist, setArtist] = useState({});
  const [profileModel, setprofileModel] = useState(false);
  const [sell, setsell] = useState(false);
  const [buy, setbuy] = useState(false);
  const [lessusdc, setlessusdc] = useState(false);
  const [MintPrice, setMintPrice] = useState("");
  // const [BurnPrice, setBurnPrice] = useState();
  const [TokensToMint, setTokensToMint] = useState(0);
  const [TokensToBurn, setTokensToBurn] = useState(0);
  // const [Balance, setBalance] = useState();
  const [loading, setLoading] = useState(false);
  const [successmint, setsuccessmint] = useState(false);
  const [failuremint, setfailuremint] = useState(false);
  const [successburn, setsuccessburn] = useState(false);
  const [failureburn, setfailureburn] = useState(false);
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
  const [playlistID, setPlaylistID] = useState("522897111");

  useEffect(() => {
    if (!wallet.wallet_connected) {
      setconnectedwallet(false);
    }
    const init = async () => {
      console.log({ walletProvider });
      setLoading(true);
      const { data } = await Axios.post(
        `${process.env.REACT_APP_SERVER_URL}/v1/artist/getbyid`,
        { id }
      );

      if (data.artist) {
        setArtist(data.artist);
        setSocialTokenAddress(data.artist.social_token_id);
        console.log(data.artist.social_token_id);
        fetchTokenPrice();
        const res = await Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/artist/gettxhistorybyartist`, artist)
        setHistoricalData(res.data.priceHistory);
        const tokenPrice = setInterval(() => {
            fetchTokenPrice();
        }, 10000);
        setLoading(false);
        // return () => {
        //     clearInterval(tokenPrice);
        // };
      }
    };
    if (id) {
      return init();
    }
  }, [id, socialTokenAddress, walletProvider]);

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
    const provider = new ethers.providers.JsonRpcProvider(
      "https://eth-rinkeby.alchemyapi.io/v2/Oq7yS7NdZbdW-beaojb1-8CuN_mjBpFc"
    );
    try {
      if (walletProvider) {
        const inflow = new Inflow(walletProvider, 4);
        const mintPrice = await inflow.getMintPriceSocial(
          socialTokenAddress,
          inflow.parseERC20("SocialToken", "1")
        );
        setMintPrice(mintPrice[0]);
      }
    } catch (err) {
      if (errcode === -32002) {
        errcode = "";
        window.location.reload();
      }
      errcode = err.code;
      console.log(err);
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
      return (
        <div className="dollor-price">
          <span>$</span> {MintPrice}
        </div>
      );
    } else {
      return <SmallLoader />;
    }
  };

  // const displayBalance = () => {
  //     if (MintPrice && MintPrice !== '') {
  //         return <div className="dollor-price">{Balance ? Balance : '0.0'}</div>;
  //     } else {
  //         return <SmallLoader />;
  //     }
  // };

  // const mint = async (social, usdc, amount) => {
  //     const mintPrice = await social.getMintPrice(amount);
  //     await (await usdc.mint(mintPrice)).wait(); // this line to be removed if the balance of usdc wallet issue is fixed
  //     await (await usdc.approve(social.address, mintPrice)).wait();
  //     await (await social.mint(amount)).wait();
  //     return mintPrice;
  // };

  const buyTokens = async () => {
    console.log(socialTokenAddress);
    console.log("WALLER PROVIDER ____", walletProvider);

    if (walletProvider) {
      console.log("wallet provider is true");
      try {
        await requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner();
        console.log("bla bla bla <><><><><><><><", socialTokenAddress, signer);
        const socialMinter = new Contract(
          socialTokenAddress,
          SocialToken.abi,
          signer
        );

        const usdcMinter = new Contract(RINKEBY_MOCKUSDC, MockUSDC.abi, signer);
        console.log({ usdcMinter });
        console.log("HEERREE");
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
          // await Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/user/buytoken`, { socialTokenAddress })
          setInterval(() => {
            window.location.reload();
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

        setbuymodalloading(false);
        setsuccessmint((successmint) => !successmint);
        // await Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/user/buytoken`, { socialTokenAddress, uid })
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
        // await requestAccount();
        // const provider = new ethers.providers.Web3Provider(
        //     window.ethereum
        // );
        const provider = walletProvider;
        // const admin = new Wallet(
        //     process.env.REACT_APP_ADMIN_PVT_KEY,
        //     provider
        // );
        const signer = provider.getSigner();
        const socialMinter = new Contract(
          socialTokenAddress,
          SocialToken.abi,
          signer
        );
        // const socialMinter = social.connect(signer);
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
        setsellmodalloading(false);
        setsuccessburn((successburn) => !successburn);
        setsell(false);
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
    // if (
    //     typeof window.ethereum !== 'undefined' &&
    //     socialTokenAddress &&
    //     socialTokenAddress !== ''
    // ) {
    //     // try {
    //     //     setsellmodalloading(true);
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
    //     //     const inflow = new Inflow(provider, 80001);
    //     //     await burn(
    //     //         socialMinter,
    //     //         inflow.parseERC20('SocialToken', String(TokensToBurn))
    //     //     );
    //     //     setsellmodalloading(false);
    //     //     setsuccessburn(successburn => !successburn)
    //     //     setInterval(() => {
    //     //         window.location.reload();
    //     //     }, 2000)
    //     //     // // console.log('BURN SUCCESSFULL');
    //     //     // getBalance();
    //     // } catch (err) {
    //     //     setsellmodalloading(false);
    //     //     setfailureburn(failureburn => !failureburn)
    //     //     // // console.log(err);
    //     // }
    // }
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

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="artist-background">
      <div className="artist-main">
        <div className="background">
          <img
            alt=""
            src={
              artist.banner_image
                ? `${process.env.REACT_APP_SERVER_URL}/${artist.banner_image}`
                : assetsImages.artistbg
            }
            className="background-blur"
          />
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
        <div className="artist-details">
          <div className="artist-main-details">
            <div className="artis-img mb-0">
              <img
                alt=""
                src={
                  artist.profile_image
                    ? `${process.env.REACT_APP_SERVER_URL}/${artist.profile_image}`
                    : assetsImages.artist
                }
              />
            </div>
            <div className="artist-content">
              <div className="artist-content-details">
                <div className="artist-name">{`${
                  artist.first_name ? artist.first_name : ""
                } ${artist.last_name ? artist.last_name : ""}`}</div>
                <div className="album-name">--</div>
                <ul>
                  <li>
                    <div className="song-total">--</div>
                    <div className="song-folder">Superfans</div>
                  </li>
                  <li>
                    <div className="song-total">--</div>
                    <div className="song-folder">NFTs</div>
                  </li>
                  <li>
                    <div className="song-total">{displayTokenPrice()}</div>
                    <div className="song-folder">Token Price</div>
                  </li>
                </ul>
              </div>
              {/* <div className="follow-btn">
                                <button>FOLLOW</button>
                            </div> */}
            </div>
          </div>
          <div className="artist-tag">
            <button className="tag-button">MERCH STORE</button>
            <button className="tag-button">LIVE STREAMS</button>
            <button className="tag-button">CONTENT</button>
            <button className="tag-button">EXPERIENCE</button>
            <button className="tag-button">VR ROOM</button>
          </div>
        </div>
      </div>
      <div className="dashboard-wrapper-main artist-main-wrapper">
        {/* ---------------Total-wallet-balance-------- */}
        <div className="Second-row-wave-chart">
          <div className="total-balance-row">
            <div className="heading-cols">
              <div className="card-heading">
                {artist.social_token_symbol} Price
              </div>
              <div className="dollor-price">{displayTokenPrice()}</div>
              <div className="small-heading">--</div>
            </div>
            <div className="btn-filter">
              <a href="#">
                <img alt="" src={assetsImages.filter} />
              </a>
            </div>
          </div>
          {/* <div className="total-balance-row">
                        <div className="heading-cols">
                            <div className="card-heading">
                                Available Balance
                            </div>
                            <div className="dollor-price">
                                <div className="dollor-price">
                                    {displayBalance()}
                                </div>
                            </div>
                            <div className="small-heading">
                                Available Balance
                            </div>
                        </div>
                    </div> */}
          <div className="total-bal-chart">
            <Totalbalancechart
              artist={artist}
              historicalData={historicalData}
            />
          </div>

          <div className="song-buy-sell">
            <div className="song-button">
              <img alt="" src={assetsImages.button} />
              <div className="button">
                {token && token.trim() === "" ? (
                  <button
                    className="btn sell-button test"
                    type="button"
                    onClick={() => {
                      window.location.href = "/login";
                    }}
                  >
                    Sell
                  </button>
                ) : walletProvider ? (
                  <button
                    className="btn sell-button"
                    type="button"
                    onClick={() => setsell((sell) => !sell)}
                  >
                    Sell
                  </button>
                ) : (
                  <button
                    className="btn sell-button"
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
                    className="btn buy-button test"
                    type="button"
                    onClick={() => {
                      window.location.href = "/login";
                    }}
                  >
                    Buy
                  </button>
                ) : walletProvider ? (
                  <button
                    className="btn buy-button"
                    type="button"
                    onClick={() => setbuy((buy) => !buy)}
                  >
                    Buy
                  </button>
                ) : (
                  <button
                    className="btn buy-button"
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
        </div>

        <div className="poll-play-song-details">
          <div className="row">
            <div className="col-lg-6">
              <div className="poll-details">
                <iframe
                  width="100%"
                  height="100%"
                  scrolling="no"
                  frameborder="no"
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
                Amount you'll spend: ${totalmintprice}
              </div>
            </>
          )}
          {buymodalloading && buyflag ? (
            <div className="d-flex justify-content-center align-items-center flex-column">
              Approve transaction on your wallet provider
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
              Approve transaction on your wallet provider
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

      <SweetAlert
        danger
        show={lessusdc}
        title="Transaction Denied"
        style={{ color: "#000" }}
        onConfirm={() => {
          setlessusdc((lessusdc) => !lessusdc);
        }}
        onCancel={() => {
          setlessusdc((lessusdc) => !lessusdc);
        }}
      >
        Insufficient USDC Balance
      </SweetAlert>
      <SweetAlert
        success
        show={successmint}
        title="Transaction Successfull"
        style={{ color: "#000" }}
        onConfirm={() => {
          setsuccessmint((successmint) => !successmint);
        }}
        onCancel={() => {
          setsuccessmint((successmint) => !successmint);
        }}
      />
      <SweetAlert
        danger
        show={failuremint}
        title="Transaction Denied"
        style={{ color: "#000" }}
        onConfirm={() => {
          setfailuremint((failuremint) => !failuremint);
        }}
        onCancel={() => {
          setfailuremint((failuremint) => !failuremint);
        }}
      >
        Error buying tokens
      </SweetAlert>
      <SweetAlert
        success
        show={successburn}
        title="Transaction Successfull"
        style={{ color: "#000" }}
        onConfirm={() => {
          setsuccessburn((successburn) => !successburn);
        }}
        onCancel={() => {
          setsuccessburn((successburn) => !successburn);
        }}
      />
      <SweetAlert
        danger
        show={failureburn}
        title="Transaction Denied"
        style={{ color: "#000" }}
        onConfirm={() => {
          setfailureburn((failureburn) => !failureburn);
        }}
        onCancel={() => {
          setfailureburn((failureburn) => !failureburn);
        }}
      >
        Error selling tokens
      </SweetAlert>
      <SweetAlert
        danger
        show={!connectedwallet}
        title="Please Connect Wallet"
        style={{ color: "#000" }}
        onConfirm={() => {
          setconnectedwallet((connectedwallet) => !connectedwallet);
        }}
        onCancel={() => {
          setconnectedwallet((connectedwallet) => !connectedwallet);
        }}
      ></SweetAlert>
      <SweetAlert
        danger
        show={insufficenttokens}
        title="Insufficient Tokens To Sell"
        style={{ color: "#000" }}
        onConfirm={() => {
          setconnectedwallet((connectedwallet) => !connectedwallet);
        }}
        onCancel={() => {
          setconnectedwallet((connectedwallet) => !connectedwallet);
        }}
      ></SweetAlert>
    </div>
  );
};

export default Artistpic;
