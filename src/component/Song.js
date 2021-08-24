/* eslint-disable */
import React, { Component } from 'react';
import './component.css';
import { assetsImages } from '../constants/images';


class Song extends Component {
    render() {
        return (
            <div className="song-card-main">
                <div className="imag-fors-poster">
                    <img alt="" src={assetsImages.songposter} />
                    <a href="#" className="play-btn">
                        <img alt="" src={assetsImages.playbtn} />
                    </a>
                </div>
                <div className="song-details">
                    <div className="song-name">FearLess</div>
                    <div className="artist-name"> Eminem</div>
                </div>

            </div>
        )
    }
}



export default Song
