import React, { useState, useEffect, useRef } from "react";
import './component.css';
import { assetsImages } from '../constants/images';

const Createcollectible = (props) => {
	const [quantity, setQuantity] = useState('');
	const [fileToMint, setFileToMint] = useState();
	const [previewUrl, setPreviewUrl] = useState();
	const [price, setPrice] = useState();
	const [feePrice, setFeePrice] = useState(0);
	const [splitRoyaltiesCounter, setSplitRoyaltiesCount] = useState(4)
	const [artistRoyalty, setArtistRoyalty] = useState(100)
	const [royalties, setRoyalties] = useState({})
	const [royaltyWallets, setRoyaltyWallets] = useState({})
	const [splitRoyaltiesArray, setSplitRoyaltiesArray] = useState([])
	const [pricingType, setPricingType] = useState('fixed-price') // fixed-price || unlimited-collection 
	const uploadButtonRed = useRef();

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
		for( var el in royalties ) {
			console.log(el)
		  if( royalties.hasOwnProperty( el ) ) {
			sum += parseFloat( royalties[el] );
		  }
		}
		setArtistRoyalty(100-sum);
	}, [royalties]);

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

				<div className='col-lg-6 col-md-6'>
                    <div className='card create-collectible'>
                        <div className='create-collectible-title'>
                            <span>Preview</span>
                        </div>
						<div className='create-collectible-preview-description'>
							{previewUrl ? (
								<img src={previewUrl} />
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
  									<input type="checkbox"/>
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
								<img src={assetsImages.graphicConstant}/>
								<div className="option graphic-option-check selected">
								<input type="radio" name="product" className="card-input-element" />
								<div className="graphic-option-text">
									<span className="title">Price Graph 1</span>
									<span className="description">Lorem Ipsum</span>
		  						</div>
							</div>
							</div>
							<div className='graphic-option'>
								<img src={assetsImages.graphicLinear}/>
								<div className="option graphic-option-check">
								<input type="radio" name="product" className="card-input-element" />
		  						<div className="graphic-option-text">
								  	<span className="title">Price Graph 2</span>
									<span className="description">Lorem Ipsum</span>
		  						</div>
							</div>
							</div>
							<div className='graphic-option'>
								<img src={assetsImages.graphicSigmoid}/>
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
							<input type="text" className="input" name="title" placeholder="Title" required/>
							<input type="text" className="input" name="description" placeholder="Description (Optional)"/>
							<input type="text" className="input" name="royalties-number" placeholder="Royalties (e.g. 10%, 20%, 30%)" required/>
							<input type="text" className="input" name="royalties" placeholder="Royalties" required/>
							<input type="text" className="input" name="properties" placeholder="Properties"/>
						</div>

						<div className='footer-btn'>
                            <button className='btn-gradiant'>
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
												royalties[`percentage${index+1}`] = e.target.value
												setRoyalties(royalties => ({...royalties}))
											}}
										/>
									<input type="text" className="wallet" name={`wallet${index+1}`} placeholder="Wallet address"
											onChange={(e) => {
												royalties[`wallet${index+1}`] = e.target.value
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
