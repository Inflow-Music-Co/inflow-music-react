import React from 'react'
import { Link } from 'react-router-dom'

const AdminPanel = () => {

	return (
		<div className="dashboard-wrapper-main">
			<div className="heading">Admin Panel</div>
			<div className="tab-settings-main">

				{/* <nav>
				<div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
					<a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Admin Panel</a>
					<a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Accounts</a>
					<a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Socials</a>
					<a className="nav-item nav-link" id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-controls="nav-about" aria-selected="false">Activites</a>
					<a className="nav-item nav-link" id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-controls="nav-about" aria-selected="false">Personalization</a>
					<a className="nav-item nav-link" id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-controls="nav-about" aria-selected="false">Other</a>
				</div>
			</nav> */}
				<div className="tab-content pt-3" id="nav-tabContent">
					<div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
						<div className="account-setting-form">
							<div className="grids-main-inputs">
								<div className="comman-grids d-flex justify-content-center align-items-center">
									<Link to="/allartists">
										<div className="save-changes-main-button text-center">Manage Artists</div>
									</Link>
								</div>
								<div className="comman-grids d-flex justify-content-center align-items-center">
									<Link to="/managelabels">
										<div className="save-changes-main-button text-center">Manage Labels</div>
									</Link>
								</div>
								<div className="comman-grids d-flex justify-content-center align-items-center">
									<Link to="/addadmin">
										<div className="save-changes-main-button text-center">Add Admin</div>
									</Link>
								</div>
								<div className="comman-grids d-flex justify-content-center align-items-center">
									<Link to="/artistonboarding">
										<div className="save-changes-main-button text-center">Onboard Artist</div>
									</Link>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	)
}

export default AdminPanel;