/* eslint-disable */
import React from "react"
import { assetsImages } from "../constants/images"

const Labelscompo = (props) => {
    return (
        <div className="labels-cards-main">
            <div className="imgs-row-main">
                <img alt="" src={props.imglink} />
            </div>
            <div className="name-plate">
                <div className="names-of-artis">{props.labelname}</div>
                {/* <div className="new-things-happen">I took a pill </div> */}
            </div>

        </div>
    )
}

export default Labelscompo