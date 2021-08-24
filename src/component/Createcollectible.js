/* eslint-disable */
import React, { useState, useEffect, useContext, useRef } from "react";
import './component.css';
import { assetsImages } from '../constants/images';
import { useSelector } from 'react-redux';
import { ethers, Contract } from 'ethers';
import Inflow1155ABI from '../artifacts/contracts/token/nft/Inflow1155.sol/Inflow1155.json';
import Inflow721ABI from '../artifacts/contracts/token/nft/Inflow721.sol/Inflow721.json';
import { Inflow } from '../inflow-solidity-sdk/src/Inflow';
import axios from 'axios'
import { Redirect } from 'react-router'

const Createcollectible = (props) => {
    const uid = useSelector((state) => state.auth.data._id);
    const wallet = useSelector(state => state.wallet);
	const [quantity, setQuantity] = useState('');
	const [fileToMint, setFileToMint] = useState();
	const [redirect, setRedirect] = useState(false);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [royalty, setRoyalty] = useState('');
	const [properties, setProperties] = useState('');

	const [previewUrl, setPreviewUrl] = useState();
	const [price, setPrice] = useState();
	const [unlockOncePurchased, setUnlockOncePurchased] = useState(false);
	const [feePrice, setFeePrice] = useState(0);
	const [splitRoyaltiesCounter, setSplitRoyaltiesCount] = useState(4)
	const [connectedwallet, setconnectedwallet] = useState(true);
	const [supply, setSupply] = useState()
	const [maxSupply, setMaxSupply] = useState()
	const [artistRoyalty, setArtistRoyalty] = useState(100)
	const [royaltySplits, setRoyaltySplits] = useState({})
	const [firstName, setfirstname] = useState({})
	const [profileImage, setprofileimage] = useState({})
	const [royaltyWallets, setRoyaltyWallets] = useState({})
	const [splitRoyaltiesArray, setSplitRoyaltiesArray] = useState([])
	const [pricingType, setPricingType] = useState('fixed-price') // fixed-price || unlimited-collection 
	const uploadButtonRed = useRef();

    useEffect(() => {
        getdata();
    }, [])

    const getdata = async () => {
        const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/user/profile/get`, { uid })
        const { user } = data
        if (user) {
			
            setfirstname(user.first_name ? user.first_name : user.name);
            setprofileimage(user.profile_image)
        }
    }

    useEffect(() => {
        if (!wallet.wallet_connected) {
            setconnectedwallet(false);
        }
    }, [wallet])

	useEffect(() => {
		setQuantity(props.match.params.quantity);
	}, [props.match.params.quantity]);
	
	useEffect(() => {
		if(fileToMint){
			setPreviewUrl(URL.createObjectURL(fileToMint));
		}
	}, [fileToMint]);

	useEffect(() => {
		var sum = 0;
		for( var el in royaltySplits ) {
		  if( royaltySplits.hasOwnProperty( el ) ) {
			sum += parseFloat( royaltySplits[el] || 0 );
		  }
		}
		setArtistRoyalty(100-sum);
	}, [royaltySplits]);

	const convertRoyalties = () => {
		var royalities = [];
		for( var el in royaltySplits ) {
			royalities.push({address: royaltyWallets[el], value: parseFloat(royaltySplits[el])})
		}
		return royalities
	}

	useEffect(() => {
		const arr = new Array(splitRoyaltiesCounter);
		for(let i = 0; i < splitRoyaltiesCounter; i++){
			arr[i] = i+1
		}
		setSplitRoyaltiesArray(arr);
	}, [splitRoyaltiesCounter]);

	useEffect(() => {
		if(price && price > 0){
			setFeePrice(price * 0.015);
			return
		}
	}, [price]);

    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

	const createERC721 = async (ipfsHash) => {
		// const send = {
		// 	price,
		// 	unlockOncePurchased,
		// 	pricingType,

		// 	royalty,
		// 	royaltySplits,
		// 	royaltyWallets,				
		// }

        // if (typeof window.ethereum !== 'undefined' ) {
        //     try {
        //         await requestAccount();
				
        //         const provider = new ethers.providers.Web3Provider(
        //             window.ethereum
        //         );
		// 		const signer = provider.getSigner();
        //         const inflow = new Inflow(provider, 80001);

        //         const inflow721Address = await inflow.addresses.Inflow721
        //         const inflow721 = new Contract(
        //             inflow721Address,
        //             Inflow721ABI.abi,
        //             signer
        //         )

		// 		const royalitiesToSend = convertRoyalties()
				
		// 		const mintERC721= await inflow721.mint(`https://ipfs.io/ipfs/${ipfsHash}`, royalitiesToSend);

        //         console.log({mintERC721});
		// 		return  mintERC721
        //     } catch (err) {
        //         console.error(err);
        //     }
        // }
		window.location.replace(`/collectible/${ipfsHash}`)

    };

	const createERC1155 = async (ipfsHash) => {
		// const send = {
		// 	price,
		// 	unlockOncePurchased,
		// 	pricingType,

		// 	royalty,
		// 	royaltySplits,
		// 	royaltyWallets,				
		// }

        // if (typeof window.ethereum !== 'undefined' ) {
        //     try {				
        //         const provider = new ethers.providers.Web3Provider(
        //             window.ethereum
        //         );
		// 		const signer = provider.getSigner();
		// 		const signerAddress = await signer.getAddress()
        //         const inflow = new Inflow(provider, 80001);

                // const inflow1155Address = await inflow.addresses.Inflow1155
                // const inflow1155 = new Contract(
                //     inflow1155Address,
                //     Inflow1155ABI.abi,
                //     signer
                // )
				// const royalitiesToSend = convertRoyalties()

				// const whitelistAddress = await inflow1155.whitelist(
                //     signerAddress
                // );

                // whitelistAddress.wait();
				// const mintERC1155 = await inflow1155.create({
				// 	supply: parseInt(supply),
				// 	maxSupply: parseInt(maxSupply),
				// 	uri: `http://localhost:3000/collectible/${ipfsHash}`,
				// 	royalties: royalitiesToSend,
				//   });

                window.location.replace(`/collectible/${ipfsHash}`)
				// return  mintERC1155
            // } catch (err) {
            //     console.error(err);
            // }
        // }
    };

	const sendToIPFS = async (type) => {
		const metadata = {
			name: title,
			title,
			description,
			properties,
			supply,
			maxSupply,
			type,
			firstName,
			profileImage
		}


		let fileToBlob = async (file) => new Blob([new Uint8Array(await file.arrayBuffer())], {type: file.type });

		const file = await fileToBlob(fileToMint)
		const urlFile = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
		const urlJSON = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

		let data = new FormData();
		data.append('file', file, 'file');
		
		return axios.post(urlFile,
				data,
				{
					headers: {
						'Content-Type': `multipart/form-data; boundary= ${data._boundary}`,
						'pinata_api_key': process.env.REACT_APP_PINATA_API_KEY,
						'pinata_secret_api_key': process.env.REACT_APP_PINATA_SECRET_API_KEY
					}
				}
			).then(function (response) {
				const assetHash = response.data.IpfsHash;

				axios.post(urlJSON,
					{assetHash, ...metadata},
					{
						headers: {
							'Content-Type': `application/json`,
							'pinata_api_key': process.env.REACT_APP_PINATA_API_KEY,
							'pinata_secret_api_key': process.env.REACT_APP_PINATA_SECRET_API_KEY
						}
					},
				).then(async function (response) {
					if(quantity === 'single'){
						await createERC721(response.data.IpfsHash)
						return;
					}

					await createERC1155(response.data.IpfsHash)
					return
				}).catch(function (error) {
					console.error(error)
					return null;
				});
			}).catch(function (error) {
				//handle error here
				console.error(error)
				return null;
			});
    };

    return (
        <div className="dashboard-wrapper-main artist-management">
            <div className="heading">{`Create ${quantity} Collectible`}</div>
            <div className='row'>
                <div className='col-lg-6 col-md-6'>
                    <div className='card create-collectible'>
                        <div className='create-collectible-title'>
                            <span>Upload File</span>
                        </div>
						<div className='create-collectible-upload-description'>
							<h3>
								PNG, GIF, WEBP, MP4 or MP3
							</h3>
							<p>
								Max 50 MB
							</p>
						</div>
                        <div className='footer-btn'>
                            <button className='btn-gradiant' onClick={() => uploadButtonRed.current.click()}>
                                Choose File
                            </button>
							<input
								style={{display: 'none'}}
								ref={uploadButtonRed}
                                onChange={(e) => {
									setFileToMint(e.target.files[0]);
								}}
                                id="imageToMint"
                            	type="file"
                            />
                        </div>
                    </div>
                </div>

				<div className='col-lg-6 col-md-6 mt-4 mt-md-0'>
                    <div className='card create-collectible'>
                        <div className='create-collectible-title'>
                            <span>Preview</span>
                        </div>
						<div className='create-collectible-preview-description'>
							{previewUrl ? (
								<img src={previewUrl} alt="NFT Preview"/>
							) : (
								<h3>
									Upload file to preview your NFT
								</h3>
							)}
						</div>
                        {!previewUrl && <div />}
                    </div>
                </div>
			</div>

			<div className="row row-wrap">
				<div className='col-lg-6 col-md-6 mt-4'>
                    <div className='card create-collectible collectible-data'>
                        <div className='create-collectible-title'>
                            <span>Put on marketplace</span>
							<p>Enter a price to allow users to instantly purchase your NFT</p>
                        </div>

						<div className="switch-top">
							<label className="switch">
  								<input type="checkbox"/>
  								<span className="slider round"></span>
							</label>
						</div>

						<div className="pricing">
							<div className={`option ${pricingType === 'fixed-price' && 'selected'}`} 
								onClick={() => setPricingType('fixed-price')}
								>
								<input type="radio" name="product" className="card-input-element" />
		  						<div className="panel panel-default card-input">
									<span>Fixed Price</span>
		  						</div>
							</div>
							<div className={`option ${pricingType === 'unlimited-collection' && 'selected'}`} 
								onClick={() => setPricingType('unlimited-collection')}
								>
								<input type="radio" name="product" className="card-input-element" />
		  						<div className="panel panel-default card-input">
									<span>Unlimited Collection</span>
		  						</div>
							</div>
						</div>

						<div className="input-price">
							<div className="data">
								<input type="number" placeholder="Enter price of one piece" 
									   onChange={(e) => setPrice(e.target.value)}/>
								<select>
									<option>USDC</option>
								</select>
							</div>	
							<div className="info">
								<div>Service fee is <span>1.5%</span></div>
								<div>You will receive <span>${feePrice.toFixed(2)} USD</span></div>
							</div>
						</div>

						<div className="unlock-purchased">
							<div className="title">
								<p className="text">Unlock once purchased</p>
								<label className="switch">
  									<input type="checkbox" value={unlockOncePurchased} onChange={() => setUnlockOncePurchased(unlockOncePurchased => !unlockOncePurchased)}/>
  									<span className="slider round"></span>
								</label>
							</div>
							<p className="description">
								Content will be unlocked after successful transaction
							</p>
						</div>

						{quantity === 'multiple' && <span className="graphic-title">Choose Price Graph</span>}
						{quantity === 'multiple' &&
						<div className="graphic">
							<div className='graphic-option'>
								<img src={assetsImages.graphicConstant} alt="Constant"/>
								<div className="option graphic-option-check selected">
								<input type="radio" name="product" className="card-input-element" />
								<div className="graphic-option-text">
									<span className="title">Price Graph 1</span>
									<span className="description">Lorem Ipsum</span>
		  						</div>
							</div>
							</div>
							<div className='graphic-option'>
								<img src={assetsImages.graphicLinear} alt="Linear"/>
								<div className="option graphic-option-check">
								<input type="radio" name="product" className="card-input-element" />
		  						<div className="graphic-option-text">
								  	<span className="title">Price Graph 2</span>
									<span className="description">Lorem Ipsum</span>
		  						</div>
							</div>
							</div>
							<div className='graphic-option'>
								<img src={assetsImages.graphicSigmoid} alt="Sigmoid"/>
								<div className="option graphic-option-check">
								<input type="radio" name="product" className="card-input-element" />
								<div className="graphic-option-text">
									<span className="title">Price Graph 3</span>
									<span className="description">Lorem Ipsum</span>
		  						</div>
							</div>
							</div>
						</div>}

						<div className="additional-data">
							<input type="text" className="input" name="title" placeholder="Title" required value={title} onChange={(e) => setTitle(e.target.value)}/>
							<input type="text" className="input" name="description" placeholder="Description (Optional)" value={description} onChange={(e) => setDescription(e.target.value)}/>
							<input type="number" className="input" name="royalties-number" placeholder="Royalties (e.g. 10%, 20%, 30%)" required value={royalty} onChange={(e) => setRoyalty(e.target.value)}/>
							{quantity === 'multiple' && <input type="number" className="input" name="supply" placeholder="Max. Supply (e.g. 1000)" required value={maxSupply} onChange={(e) => setMaxSupply(e.target.value)}/>}
							{quantity === 'multiple' && <input type="number" className="input" name="max-supply" placeholder="Supply (e.g. 120)" required value={supply} onChange={(e) => setSupply(e.target.value)}/>}
							<input type="text" className="input" name="properties" placeholder="Properties" value={properties} onChange={(e) => setProperties(e.target.value)}/>
						</div>

						<div className='footer-btn'>
                            <button className='btn-gradiant' onClick={() => { 
								quantity === 'multiple' ? sendToIPFS('erc1155') : sendToIPFS('erc721')
							}}>
                                Create Item
                            </button>
                        </div>
                    </div>
                </div>
				
				<div className='col-lg-6 col-md-6 mt-4'>
                    <div className='card create-collectible'>
                        <div className='create-collectible-title'>
                            <span>Split Royalties</span>
                        </div>

						<div className='create-collectible-preview-description'>
							<h4>Your Royalty</h4>
							<h3>{artistRoyalty}%</h3>
						</div>

						<div className="split-royalties">
							{splitRoyaltiesArray.map((item, index) => (
								<div key={item} className="royalty-input-wrapper">
									<input type="number" className="percentage" name={`percentage${index+1}`} placeholder="%"
											onChange={(e) => {
												royaltySplits[`percentage${index+1}`] = e.target.value
												setRoyaltySplits(royalties => ({...royalties}))
											}}
										/>
									<input type="text" className="wallet" name={`percentage${index+1}`} placeholder="Wallet address"
											onChange={(e) => {
												royaltyWallets[`percentage${index+1}`] = e.target.value
												setRoyaltyWallets(wallets => ({...wallets}))
											}}
									/>
								</div>
							))}
					
							<div className="song-buy-sell">
                        		<div className="song-button">
                            		<img alt="" src={assetsImages.singleButton} />
                            		<div className="button">
                                		<button className="add-split" type="button" 
												onClick={() => setSplitRoyaltiesCount((counter) => counter+1)}>
											<span>+</span>
										</button>
                            		</div>
                        		</div>
                    		</div>
						</div>

						<div className='footer-btn'>
                            <button className='btn-gradiant'>
                                Save Split
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Createcollectible
