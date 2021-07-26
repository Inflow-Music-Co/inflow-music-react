import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Loader from '../component/Loader';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const ManageLabels = () => {
	const [labels, setlabels] = useState([])
	const [loading, setloading] = useState(false)
	const [mname, setmname] = useState('')
	const [mimage, setmimage] = useState('')
	const [addmodal, setaddmodal] = useState(false)

	let history = useHistory()

	useEffect(() => {
		getlabels();
	}, [])

	const getlabels = async () => {
		try {
			setloading(true);
			const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/v1/label/alldata`)
			if (data.labels) {
				setlabels(data.labels)
			}
			setloading(false);
		} catch (error) {
			setloading(false);
			// console.log(error);
		}
	}

	const deleteLabel = async (e) => {
		try {
			setloading(true)
			await axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/label/removelabel`, { labelid: e.target.id })
			await getlabels();
			setloading(false)
		} catch (error) {
			setloading(false)
			// console.log(error);
		}
	}

	const createLabel = async () => {
		try {
			setloading(true)
			const data = new FormData()
			data.append("name", mname)
			data.append("label", mimage)
			await axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/label/addlabel`, data)
			await getlabels();
			setaddmodal(false)
			setloading(false)
		} catch (error) {
			setloading(false)
			// console.log(error);
		}
	}

	const displayLabels = () => {
		return labels.map((label, i) => {
			return (
				<tr key={i}>
					<td className="text-center">{label.name}</td>
					<td className="text-center"><Button variant="primary" id={label.name} onClick={() => history.push(`/managelabelartists/${label._id}`)}>Manage Artists</Button></td>
					<td className="text-center"><Button variant="danger" id={label._id} onClick={deleteLabel}>Delete</Button></td>
				</tr>

			)
		})
	}

	if (loading) {
		<Loader />
	}

	return (
		<div className="dashboard-wrapper-main vw-100" style={{ minHeight: "100vh" }}>
			<div className="row mb-4 ml-2">
				<Button variant="primary" onClick={() => setaddmodal(addmodal => !addmodal)}>Add Label</Button>
			</div>
			<Table striped bordered hover variant="dark">
				<thead>
					<tr>
						<th className="text-center">
							Label
						</th>
						<th className="text-center">
							Manage Artists
						</th>
						<th className="text-center">
							Delete Label
						</th>
					</tr>
				</thead>
				<tbody>
					{displayLabels()}
				</tbody>
			</Table>
			<Modal style={{ color: "#000" }} show={addmodal} onHide={() => setaddmodal(addmodal => !addmodal)}>
				<Modal.Header closeButton>
					<Modal.Title>ADD LABEL</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group>
						<Form.Label>Label Name</Form.Label>
						<Form.Control type="text" value={mname} onChange={e => setmname(e.target.value)} />
					</Form.Group>
					<Form.Group>
						<Form.Label>Label Image</Form.Label><br />
						<input
							onChange={(e) =>
								setmimage(e.target.files[0])
							}
							placeholder="Label Image"
							type="file"
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={createLabel}>Add Label</Button>
				</Modal.Footer>
			</Modal>

		</div >
	)
}

export default ManageLabels;