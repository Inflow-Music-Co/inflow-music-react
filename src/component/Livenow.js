/* eslint-disable */
import React, { Component } from 'react';
import './component.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { assetsImages } from '../constants/images';


class Livenow extends Component {
    render() {
        return (

            <div className="Live-now-mains">
                <img alt="" className="live-video" src={assetsImages.artist} />
                <div className="live-nows-main">Live now</div>
                <div className="main-rows-main">
                    <div className="heading-text">Weezer</div>
                    <div className="fourth-row">
                        <div className="comman-col live-user">
                            <img alt="" src={assetsImages.userWhite} className="comman-icon" />
                            784
                        </div>
                        <div className="comman-col live-like">
                            <img alt="" src={assetsImages.heartWhite} className="comman-icon" />
                            189
                        </div>

                    </div>
                </div>

            </div>


        )
    }
}



export default Livenow
