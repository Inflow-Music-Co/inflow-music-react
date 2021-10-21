import React, { Component } from 'react';
import { assetsImages } from '../constants/images';

class Banner extends Component {
    render() {
        return (
            <div className="banner-img-main">
                <div className="left-col-heading">
                    <h1 className="headings">Inflow Music</h1>
                    <p>The New Music Economy</p>
                    <p>Get Social Sokens and Access Artist vaults</p>
                </div>
                <div className="right-col-img">
                    <img alt="" src={assetsImages.logo} />
                </div>
            </div>
        );
    }
}

export default Banner;
