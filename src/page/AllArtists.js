import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import Axios from 'axios';
import Loader from '../component/Loader';
import { assetsImages } from '../constants/images';


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


	useEffect(() => {
		getArtists();
	}, [])

	const getArtists = async () => {
		setloading(true)
		const { data } = await Axios.get(`${process.env.REACT_APP_SERVER_URL}/v1/artist/getall`)
		setartists(data.artists)
		setloading(false);
	}

	const openEditModal = (e) => {
		const id = e.target.id;
		const artist = artists.find(artist => artist._id === id)
		setmid(artist._id)
		setmfirstname(artist.first_name)
		setmlastname(artist.last_name)
		setmcity(artist.city)
		setmcountry(artist.country)
		setmemail(artist.email)
		setmphone(artist.phone)
		setmpincode(artist.pin_code)
		setmaddress(artist.address)
		setmsocialtokenaddress(artist.social_token_id)
		setmwalletaddress(artist.wallet_id)
		setmtokensymbol(artist.social_token_symbol)
		setmodal(true);
	}

	const displayArtists = () => {
		return artists.map((artist,i) => {
			return (
				<tr key={i}>
					<td>
						<img style={{ borderRadius: "50%", height: "80px", width: "80px" }} src={artist.profile_image !== '' ? `${process.env.REACT_APP_SERVER_URL}/${artist.profile_image}` : assetsImages.person} alt={artist.first_name ? artist.first_name : ''} />
					</td>
					<td>{artist.social_token_id}</td>
					<td>{artist.social_token_symbol}</td>
					<td>{`${artist.first_name ? artist.first_name : ''} ${artist.last_name ? artist.last_name : ''}`}</td>
					<td><Button variant="primary" id={artist._id} onClick={openEditModal}>EDIT</Button></td>
				</tr>
			)
		})
	}

	const deleteArtist = async () => {
		setloading(true);
		await Axios.patch(`${process.env.REACT_APP_SERVER_URL}/v1/artist/deactivate`, { id: mid })
		await getArtists();
		setmodal(false);
		setloading(false);
	}

	const updateDetails = async () => {
		const data = new FormData()
		data.append("id", mid)
		data.append("first_name", mfirstname)
		data.append("last_name", mlastname)
		data.append("address", maddress)
		data.append("city", mcity);
		data.append("country", mcountry)
		data.append("email", memail)
		data.append("phone", mphone)
		data.append("pin_code", mpincode)
		data.append("wallet_id", mwalletaddress)
		data.append("social_token_id", msocialtokenaddress)
		data.append("social_token_symbol",mtokensymbol)
		data.append("profile", mprofileimage)
		data.append("banner", mbannerimage);
		setloading(true)
		await Axios.patch(`${process.env.REACT_APP_SERVER_URL}/v1/artist/update`, data)
		setmodal(false)
		setartistupdate(true)
		setloading(false)
		window.location.href="/allartists"

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
							Token
						</th>
						<th>
							Token Symbol
						</th>
						<th>
							Artist
						</th>
						<th>

						</th>
					</tr>
				</thead>
				<tbody>
					{displayArtists()}
				</tbody>
			</Table>
			<Modal size="xl" show={modal} onHide={() => setmodal(modal => !modal)} centered>
				<Modal.Header closeButton>
					<Modal.Title>Edit Artist Details</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="grids-main-inputs">
						<div className="comman-grids">
							<Form.Group>
								<Form.Label>First Name</Form.Label>
								<Form.Control type="text" value={mfirstname} onChange={e => setmfirstname(e.target.value)} />
							</Form.Group>
						</div>
						<div className="comman-grids">
							<Form.Group>
								<Form.Label>Last Name</Form.Label>
								<Form.Control type="text" value={mlastname} onChange={e => setmlastname(e.target.value)} />
							</Form.Group>
						</div>
						<div className="comman-grids">
							<Form.Group>
								<Form.Label>Address</Form.Label>
								<Form.Control type="text" value={maddress} onChange={e => setmaddress(e.target.value)} />
							</Form.Group>
						</div>
						<div className="comman-grids">
							<Form.Group>
								<Form.Label>City</Form.Label>
								<Form.Control type="text" value={mcity} onChange={e => setmcity(e.target.value)} />
							</Form.Group>
						</div>
						<div className="comman-grids">
							<Form.Group>
								<Form.Label>Country</Form.Label>
								<Form.Control type="text" value={mcountry} onChange={e => setmcountry(e.target.value)} />
							</Form.Group>
						</div>
						<div className="comman-grids">
							<Form.Group>
								<Form.Label>Email</Form.Label>
								<Form.Control type="email" value={memail} onChange={e => setmemail(e.target.value)} />
							</Form.Group>
						</div>
						<div className="comman-grids">
							<Form.Group>
								<Form.Label>Phone</Form.Label>
								<Form.Control type="text" value={mphone} onChange={e => setmphone(e.target.value)} />
							</Form.Group>
						</div>
						<div className="comman-grids">
							<Form.Group>
								<Form.Label>Pin code</Form.Label>
								<Form.Control type="text" value={mpincode} onChange={e => setmpincode(e.target.value)} />
							</Form.Group>
						</div>
						<div className="comman-grids">
							<Form.Group>
								<Form.Label>Social Token Address</Form.Label>
								<Form.Control type="text" value={msocialtokenaddress} onChange={e => setmsocialtokenaddress(e.target.value)} />
							</Form.Group>
						</div>
						<div className="comman-grids">
							<Form.Group>
								<Form.Label>Wallet Address</Form.Label>
								<Form.Control type="text" value={mwalletaddress} onChange={e => setmwalletaddress(e.target.value)} />
							</Form.Group>
						</div>
						<div className="comman-grids">
							<Form.Group>
								<Form.Label>Token Symbol</Form.Label>
								<Form.Control type="text" value={mtokensymbol} onChange={e => setmtokensymbol(e.target.value)} />
							</Form.Group>
						</div>
						<div className="comman-grids">

						</div>
						<div className="comman-grids">
							Update Profile Image:
							<input
								onChange={(e) =>
									setmprofileimage(e.target.files[0])
								}
								placeholder="Profile Image"
								id="profileimage"
								type="file"
							/>
						</div>
						<div className="comman-grids">
							Update Banner Image:
							<input
								onChange={(e) =>
									setmbannerimage(e.target.files[0])
								}
								placeholder="Banner Image"
								id="bannerimage"
								type="file"
							/>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setmodal(modal => !modal)}>
						Close
					</Button>
					<Button variant="danger" onClick={deleteArtist}>
						Deactivate Artist
					</Button>
					<Button variant="primary" onClick={updateDetails}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
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