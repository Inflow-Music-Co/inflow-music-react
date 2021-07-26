import React, { Component } from 'react';
import './component.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { assetsImages } from '../constants/images';


class Contentpost extends Component {
    render() {
        return (

            <div className="Main-post-grids-card">
                <div className="first-row-grids">
                    <div className="left-col-main">
                        <img alt="" src={assetsImages.artist} className="small-img" />
                        <div className="post-name-col">
                            <div className="artist-name-with-status">
                                <span className="aritist-name">Drake</span>  Shared a Post
                            </div>
                            <div className="date-and-time-man">Today at 12.35 PM</div>
                        </div>
                    </div>
                    <div className="share-post-drop">
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                <img alt="" src={assetsImages.threedot} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div className="third-row-description">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                </div>

                <div className="fourth-row">
                    <div className="comman-col">
                        <img alt="" src={assetsImages.like} className="comman-icon" />
                        561 Likes
                    </div>
                    <div className="comman-col">
                        <img alt="" src={assetsImages.commnet} className="comman-icon" />
                        91 Comments
                    </div>

                </div>


            </div>


        )
    }
}



export default Contentpost
