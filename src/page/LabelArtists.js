/* eslint-disable */
import React, { useState, useEffect, useContext } from "react"
// import { assetsImages } from "../constants/images"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from "../component/Loader";
// import { ethers } from 'ethers';
import { Inflow } from '../inflow-solidity-sdk/src/Inflow';
import SmallLoader from "../component/SmallLoader";
import { WalletProviderContext } from "../contexts/walletProviderContext";
import SweetAlert from 'react-bootstrap-sweetalert';
import { useSelector } from "react-redux";

// if (localStorage.getItem('oncereloadlabelartists') === null || localStorage.getItem('oncereloadlabelartists') === undefined) {
//     localStorage.setItem('oncereloadlabelartists',false);
// }

const LabelArtists = () => {
    const { walletProvider } = useContext(WalletProviderContext);
    const wallet = useSelector(state => state.wallet)
    const { labelid } = useParams();
    const [label, setlabel] = useState({})
    const [connectedwallet, setconnectedwallet] = useState(true);
    const [artists, setArtists] = useState([]);
    const [loading, setloading] = useState(false);
    // const [artistremain, setartistremain] = useState([]);
    const [tokenPrices, setTokenPrices] = useState({});
    const [testprice, settestprice] = useState(0.0)

    useEffect(() => {
        getlabelartists();
        if (!wallet.wallet_connected) {
            setconnectedwallet(false);
        }
    }, [walletProvider])

    

    const getlabelartists = async () => {
        try {
            setloading(true)
            const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/label/getlabelartists`, { labelid })
            setArtists(data.artists);
            // setartistremain(data.remainingartists);
            setlabel(data.label);
            setloading(false)
            await gettokenprices(data.artists);
        } catch (error) {
            setloading(false)
            // // console.log(error)
        }
    }

    const gettokenprices = async (artists) => {
        // console.log("HEERE")
        try {
            let temp = {}
            // console.log({ temp });
            // console.log({artists})
            await Promise.all(artists.map(async (artist) => {
                // console.log("HMM")
                const p = await fetchTokenPrice(artist.social_token_id);
                // console.log({p})
                temp[artist.social_token_id] = p;
                return null;
            }));
            setTokenPrices(temp);
        } catch (error) {
            // // console.log(error)
        }
    }

    // async function requestAccount() {
    //     await window.ethereum.request({ method: 'eth_requestAccounts' });
    // }

    const fetchTokenPrice = async (socialtoken) => {
        try {
            // await requestAccount();
            const provider = walletProvider;
            const inflow = new Inflow(provider, 4);
            // // console.log(localStorage.getItem('oncereloadlabelartists'))
            // if (!localStorage.getItem('oncereloadlabelartists')) {
            //     // console.log("HERE")
            //     localStorage.setItem('oncereloadlabelartists', true)
            //     window.location.reload();
            // }
            const mintPrice = await inflow.getMintPriceSocial(
                socialtoken,
                inflow.parseERC20('SocialToken', '1')
            );
            settestprice(mintPrice[0])
            return mintPrice[0];
        } catch (err) {
            // // console.log(err)

        }
    };

    const displayTokenPrice = (socialtoken) => {
        if (tokenPrices[socialtoken]) {
            return `$ ${tokenPrices[socialtoken]}`;
        }
        return <SmallLoader />
    }

    if (loading) {
        return <Loader />
    }
    return (
        <div className="dashboard-wrapper-main rocnations-artist-main">
            <div className="heading">{`${label.name ? label.name : ''}'s Artists`}</div>
            {/* <div className="small-descriptions">Lorem ipsums main</div> */}

            <div className="gray-cards-main">
                <div className="inner-first-card-row">
                    <img alt="" src={`${process.env.REACT_APP_SERVER_URL}/${label.image}`} width='80' />
                    <div className="col-rights-main">
                        <div className="first-headings">{label.name ? label.name : ''}</div>
                        <div className="songs-name">Artists</div>
                    </div>

                </div>
                <div className="table-main">
                    <table>
                        <thead>
                            <tr>
                                <th className="first-col"></th>
                                <th className="second-col">Name</th>
                                <th className="third-col">Token Price</th>
                                {/* <th className="fourth-col">Superfans</th>
                                <th className="fifth-col">NFTs</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                artists.map((artist, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className="first-col"><img alt="" src={`${process.env.REACT_APP_SERVER_URL}/${artist.profile_image}`} width="80" /> </td>
                                            <td className="second-col">{artist.name ? artist.name : `${artist.first_name} ${artist.last_name ? artist.last_name : ''}`}</td>
                                            <td className="third-col">{displayTokenPrice(artist.social_token_id)}</td>
                                        </tr>
                                    )
                                })
                            }
                            {/* <tr>
                                <td className="first-col"><img alt="" src={assetsImages.artist} /> </td>
                                <td className="second-col">Mike Posner</td>
                                <td className="third-col">$109.78</td>
                                <td className="fourth-col">75,670</td>
                                <td className="fifth-col">61</td>
                            </tr>
                            <tr>
                                <td className="first-col"><img alt="" src={assetsImages.artist} /> </td>
                                <td className="second-col">Meg Thee Stallion</td>
                                <td className="third-col">$105.31</td>
                                <td className="fourth-col">68,014</td>
                                <td className="fifth-col">68,014</td>
                            </tr> */}


                        </tbody>
                    </table>

                </div>


            </div>
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

export default LabelArtists
