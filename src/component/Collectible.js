import React, { useState, useEffect, useRef } from "react";
import './component.css';
import { assetsImages } from '../constants/images';
import { Modal } from "react-bootstrap";

const Collectible = (props) => {
	const [collectibleId, setCollectibleId] = useState(null);
	const [data, setData] = useState(null);

	useEffect(() => {
		setCollectibleId(props.match.params.collectibleId);		
	}, [props.match.params.collectibleId]);

	useEffect(() => {
		async function getData(){
			const response = await fetch(`https://ipfs.io/ipfs/${collectibleId}`)	
			const data = await response.json();
			setData(data)
		}

		if(collectibleId){
			getData()
		}
	}, [collectibleId]);

    return (
		<div className="dashboard-wrapper-main artist-management">
			<div className="collectible-heading">NFT: Nothing Was The Same (Drake)</div>
			<div className='row'>
				<div className='col-lg-12 col-md-12'>
					<div className='card-collectible'>
						<div className="nft">
							<img src={`https://ipfs.io/ipfs/${data?.assetHash}`} />
							<div className="details">
								<div className="info">
										<h3 className="title">NFT Info</h3>
										<h4 className="nft-name">{data?.name}</h4>
										<span className="nft-category">{data?.description}</span>
										<hr/>
										<h4 className="prints">{data?.supply} prints created  [max. {data?.maxSupply}]</h4>
								</div>
								<div className="creator">
									<h3 className="title">Creator</h3>
									<div className="creator-info">
										<img src={`https://ipfs.io/ipfs/${data?.assetHash}`} />
										<div className="artist">
											<span className="name">Drake</span>
											<span className="gender">Hip-Hop/Rap</span>
										</div>
									</div>
								</div>
								<div className="bid">
								<h3 className="title">Highest Bidder</h3>
									<div className="bid-info">
										<img src={assetsImages.imgchart} />
										<div className="bid">
											<span className="value">$31.07 - LolaKipp55</span>
											<span className="history">View Bid History (58 bids)</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="buy-print">
							<button className='btn btn-gradiant'>
								Buy print now   [35 USD]
		                	</button>
							<button className='btn btn-gradiant'>
								Sell print now   [35 USD]
		                	</button>
							{/* <h3>Or place a bid</h3>
							<div className="song-button">
                            		<img alt="" src={assetsImages.singleButton} />
                            		<div className="button">
                                		<button className="add-split" type="button">
											<span>Bid</span>
										</button>
                            		</div>
                        	</div>
							<p>Auction Ends: 7 hrs 38 mins</p> */}
						</div>
					</div>
				</div>
			</div>
			{/* <Modal show={true} className="edit-profile-modal newvote">
                <Modal.Header closeButton>
                    <span className='title'>
                        Buy NFT
                    </span>
                </Modal.Header>

                <Modal.Body>
                    <div className='form-group'>
                        <label>Number of Prints</label>
                        <input className='form-control mb-3' type='text' placeholder='Address' />
                    </div>

					<div className='form-group'>
                        <label>Price</label>
                        <input className='form-control mb-3' type='text' placeholder='Address' />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button className='save-btn btn-gradiant'>
                        Buy
                    </button>
                </Modal.Footer>
            </Modal> */}
						{/* <Modal show={true} className="edit-profile-modal newvote">
                <Modal.Header closeButton>
                    <span className='title'>
                        Sell NFT
                    </span>
                </Modal.Header>

                <Modal.Body>
                    <div className='form-group'>
                        <label>Number of Prints</label>
                        <input className='form-control mb-3' type='text' placeholder='Address' />
                    </div>

					<div className='form-group'>
                        <label>Price</label>
                        <input className='form-control mb-3' type='text' placeholder='Address' />
                    </div>

					<div className='sell-token-balance'>
                        <span>Drake Balance: $36.55</span>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button className='save-btn btn-gradiant'>
                        Sell
                    </button>
                </Modal.Footer>
            </Modal> */}
		</div>
    )
}

export default Collectible
