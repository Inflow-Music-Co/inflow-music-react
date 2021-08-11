import React from "react";
import './component.css';
// import { assetsImages } from "../constants/images";

const Artistpic = (props) => {
    // console.log({ props })
    return (
        <div className="artist-main">
            <div className="artis-img">
                <img alt="" src={props.imglink} />
            </div>
            <div className="artist-name">
                {props.name ? props.name : 'Mike Posner'}
            </div>
            <div className="short-desrip">
                <div className="price-tag">$113.51</div>
                <div className="tags-up">+9.1%</div>
            </div>
        </div>
    )
}

export default Artistpic