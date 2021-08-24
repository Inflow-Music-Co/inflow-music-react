/* eslint-disable */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Table, Modal } from 'react-bootstrap';
import Loader from '../component/Loader';

const ManageLabelArtists = () => {
	const { labelid } = useParams();
	const [artists, setArtists] = useState([]);
	const [loading, setloading] = useState(false)
	const [addmodal, setaddmodal] = useState(false);
	const [artistremain, setartistremain] = useState([]);
	const [sartistid, setsartistid] = useState('');

	useEffect(() => {
		getlabelartists();
	}, [])

	const getlabelartists = async () => {
		try {
			setloading(true)
			const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/label/getlabelartists`, { labelid })
			// console.log({data})
			setArtists(data.artists);
			setartistremain(data.remainingartists);
			setloading(false)
		} catch (error) {
			setloading(false)
			// console.log(error)
		}
	}

	const removelabelartist = async (e) => {
		try {
			setloading(true)
			const artistid = e.target.id;
			await axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/label/removeartist`, { labelid, artistid })
			await getlabelartists();
			setloading(false)
		} catch (error) {
			setloading(false)
			// console.log(error)
		}
	}

	const displayArtists = () => {
		return artists.map((artist, i) => {
			return (
				<tr key={i}>
					<td className="text-center">{artist.social_token_id}</td>
					<td className="text-center">{artist.first_name ? `${artist.first_name} ${artist.last_name ? artist.last_name : ''}` : artist.name}</td>
					<td className="text-center"><Button variant="danger" id={artist._id} onClick={removelabelartist}>Remove</Button></td>
				</tr>
			)
		})
	}

	const addArtistToLabel = async () => {
		try {
			// console.log({ sartistid });
			setloading(true)
			await axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/label/addartist`, { labelid, artistid: sartistid })
			await getlabelartists();
			setloading(false)
		} catch (error) {
			setloading(false)
			// console.log(error)
		}
	}

	if (loading) {
		return <Loader />
	}

	return (
		<div className="dashboard-wrapper-main vw-100" style={{ minHeight: "100vh" }}>
			<div className="row mb-4 ml-2">
				<Button variant="primary" onClick={() => setaddmodal(addmodal => !addmodal)}>Add Artist</Button>
			</div>
			<Table striped bordered hover variant="dark">
				<thead>
					<tr>
						<th className="text-center">
							Social Token
						</th>
						<th className="text-center">
							Artist Name
						</th>
						<th className="text-center">
							Remove Artist
						</th>
					</tr>
				</thead>
				<tbody>
					{displayArtists()}
				</tbody>
			</Table>
			<Modal style={{ color: "#000" }} show={addmodal} onHide={() => setaddmodal(addmodal => !addmodal)}>
				<Modal.Header closeButton>
					<Modal.Title>ADD ARTIST TO LABEL</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<select name="addartists" id="addartists" onChange={(e) => setsartistid(e.target.value)}>
						<option value="">Choose Artist</option>
						{artistremain.map((artist, i) => {
							return <option key={i} value={artist._id}>{artist.first_name ? `${artist.first_name} ${artist.last_name ? artist.last_name : ''}` : artist.name}</option>
						})}

					</select>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={addArtistToLabel}>Add Artist</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default ManageLabelArtists;