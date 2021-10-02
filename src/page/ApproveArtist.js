import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import Axios from 'axios';
import Loader from '../component/Loader';
import { assetsImages } from '../constants/images';
import { Inflow } from '../inflow-solidity-sdk/src/Inflow';
import SocialTokenFactory from '../artifacts/contracts/token/social/SocialTokenFactory.sol/SocialTokenFactory.json'
import { getEventData } from '../utils/blockchain';
import { Magic } from "magic-sdk";


const AllArtists = () => {
	const [artists, setartists] = useState([])
	const [loading, setloading] = useState(false)
	const [mid, setmid] = useState('')
	const [mfirstname, setmfirstname] = useState('')
	const [mlastname, setmlastname] = useState('')
	const [maddress, setmaddress] = useState('')
	const [mcity, setmcity] = useState('')
	const [mcountry, setmcountry] = useState('')
	const [memail, setmemail] = useState('')
	const [mphone, setmphone] = useState('')
	const [mpincode, setmpincode] = useState('')
	const [msocialtokenaddress, setmsocialtokenaddress] = useState('')
	const [mwalletaddress, setmwalletaddress] = useState('')
	const [mtokensymbol, setmtokensymbol] = useState('')
	const [modal, setmodal] = useState(false)
	const [artistupdate, setartistupdate] = useState(false);
	const [mprofileimage, setmprofileimage] = useState();
	const [mbannerimage, setmbannerimage] = useState();
	const [signer, setSigner] = useState();
	const [signerAddress, setSignerAddress] = useState();
	const [provider, setProvider] = useState();

	const customNodeOptions = {
		rpcUrl: 'https://rpc-mainnet.maticvigil.com/', // Polygon RPC URL
		chainId: 137, // Polygon chain id
	  }
	  
	const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY, { network: customNodeOptions });

	const socialTokenFactoryContract = "0xcb993CBb64290f8575637D7e52a7A8E6895c70eB";
	const usdc = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174";

	useEffect( async () => {
		const isLoggedIn = await magic.user.isLoggedIn();
    	console.log('isLoggedIn', isLoggedIn);

		if(isLoggedIn){
			const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
			const signer = provider.getSigner();
			const address = await signer.getAddress();
			setSigner(signer);
			setSignerAddress(address);
			setProvider(provider);
		}
		getArtists();
	}, [])

	const getArtists = async () => {
        try {
            setloading(true)
            const { data } = await Axios.get(`${process.env.REACT_APP_SERVER_URL}/v1/artist/getallapproval`, {params: {status: "pending"}})
            setartists(data.artists)
            setloading(false);
        } catch(error) {
            console.log(error)
        }
	}

	const handleApprove = async (e) => {
		console.log('approve fired')
        try {
            await Axios.patch(`${process.env.REACT_APP_SERVER_URL}/v1/artist/activate`, { id: e.target.id });
        } catch(e) {
			console.log(e)
        }  
	}

	const displayArtists = () => {
		return artists.map((artist,i) => {
			return (
				<tr key={i}>
					<td>
						<img style={{ borderRadius: "50%", height: "80px", width: "80px" }} src={artist.profile_image !== '' ? `${process.env.REACT_APP_SERVER_URL}/${artist.profile_image}` : assetsImages.person} alt={artist.first_name ? artist.first_name : ''} />
					</td>
					<td>{`${artist.first_name ? artist.first_name : ''} ${artist.last_name ? artist.last_name : ''}`}</td>
					<td><Button variant="primary" id={artist._id} onClick={handleApprove}>Approve</Button></td>
				</tr>
			)
		})
	}

	if (loading) {
		return <Loader />
	}
	return (
		<div className="dashboard-wrapper-main vw-100" style={{ minHeight: "100vh" }}>
			<Table striped bordered hover variant="dark">
				<thead>
					<tr>
						<th>

						</th>
						<th>
							Full Name
						</th>
						<th>

						</th>
					</tr>
				</thead>
				<tbody>
					{displayArtists()}
				</tbody>
			</Table>
            <SweetAlert
				success
				show={artistupdate}
				title="Artist Data Updated Succesfully"
				style={{ color: '#000' }}
				onConfirm={() => { setartistupdate(artistupdate => !artistupdate) }}
				onCancel={() => { setartistupdate(artistupdate => !artistupdate) }}
			/>
		</div>
	)
}

export default AllArtists;