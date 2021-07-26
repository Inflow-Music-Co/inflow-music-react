import React, { Component } from 'react';
import './component.css';
import { assetsImages } from '../constants/images';
import Dropdown from "react-bootstrap/Dropdown";

class Notification extends Component {
    render() {
        return (
            <div className="Dropdown-main-header">
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-custom-2">
                        <div className="Notification-main">
                            <img alt="" src={assetsImages.bell} />
                            <span className="badge-name">3</span>
                        </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="Notification-dropdown">
                        <div className='notification-dropdown-card'>
                            <div className='card-header'>
                                <h2 className='title'> Notifications </h2>
                                <span className='close'>X</span>
                            </div>

                            <div className='notification-dropdown-details'>
                                <div className='img-wrapper'>
                                    <img alt="" src={assetsImages.sale} />
                                </div>
                                <div className='notification-content-wrapper'>
                                    <div className='notification-content-title'>
                                        <h5>New Drop (Drake)</h5>
                                        <h5>Just now</h5>
                                    </div>
                                    <p>
                                        Drake has a new limited supply NFT drop coming this Thursday
                                    </p>
                                    <div className='notification-item-details'>
                                        <div className='item-details'>
                                            <div className='item'>
                                                <h6>Item</h6>
                                                <div className='details d-flex align-items-center'>
                                                    <img alt="" src={assetsImages.person} />
                                                    <div className='content'>
                                                        <h5>Find Your Love</h5>
                                                        <h6>NFT Single</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='qty'>
                                                <h6>Qty</h6>
                                                <h5>x35</h5>
                                            </div>
                                            <div className='total'>
                                                <h6>Total</h6>
                                                <h5>$75.99</h5>
                                            </div>
                                        </div>
                                        <div className='notification-item-content d-flex justify-content-between'>
                                            <h6>Time of drop</h6>
                                            <h5>7/1/2021 at midnight</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='notification-dropdown-details notification-alert'>
                                <div className='img-wrapper'>
                                    <img alt="" src={assetsImages.reports} />
                                </div>
                                <div className='notification-content-wrapper'>
                                    <div className='notification-content-title'>
                                        <h5>Saweeti Price Alert</h5>
                                        <h5>13min</h5>
                                    </div>
                                    <p>
                                        Your investment in Saweeti is surging today. Saweeti's token price is up 13%.
                                    </p>
                                    <div className='notification-item-details'>
                                        <div className='item-details'>
                                            <div className='item'>
                                                <div className='details d-flex align-items-center'>
                                                    <div className='content'>
                                                        <h5>+13%</h5>
                                                        <h6>SAWEETI</h6>
                                                    </div>
                                                    <img alt="" src={assetsImages.reportIcon} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='notification-dropdown-details notification-new-poll'>
                                <div className='img-wrapper'>
                                    <img alt="" src={assetsImages.reviews} />
                                </div>
                                <div className='notification-content-wrapper'>
                                    <div className='notification-content-title'>
                                        <h5>New Polls (Rihanna) </h5>
                                        <h5>1h</h5>
                                    </div>
                                    <p>
                                        Rihanna has posted two new polls. Check them out and cast your vote.
                                    </p>
                                    <div className='notification-item-details'>
                                        <div className='item-details'>
                                            <div className='item'>
                                                <div className='details'>
                                                    <div className='content'>
                                                        <h5>Location of next concert</h5>
                                                        <h5>Theme for the VR Room party</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='notification-dropdown-details notification-transfer'>
                                <div className='img-wrapper'>
                                    <img alt="" src={assetsImages.reports} />
                                </div>
                                <div className='notification-content-wrapper'>
                                    <div className='notification-content-title'>
                                        <h5>Transfer Complete</h5>
                                        <h5>2d</h5>
                                    </div>
                                    <p>
                                        Your requests to transfer funds have successfully been completed
                                    </p>
                                    <div className='notification-item-details'>
                                        <div className='item-details'>
                                            <div className='item'>
                                                <div className='details d-flex align-items-center'>
                                                    <img alt="" src={assetsImages.circle} />
                                                    <div className='d-flex align-items-center justify-content-between w-100'>
                                                        <div className='content'>
                                                            <h5>$1,781.90</h5>
                                                            <h6>Inbound</h6>
                                                        </div>
                                                        <div className='content'>
                                                            <h6>USDC</h6>
                                                            <h6>7/2/2021</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='item'>
                                                <div className='details d-flex align-items-center'>
                                                    <img alt="" src={assetsImages.circle} />
                                                    <div className='details-border-top d-flex align-items-center justify-content-between w-100'>
                                                        <div className='content'>
                                                            <h5>$589.05</h5>
                                                            <h6>Outbound</h6>
                                                        </div>
                                                        <div className='content'>
                                                            <h6>USDC</h6>
                                                            <h6>7/1/2021</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }
}



export default Notification
