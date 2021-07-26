import React, { Component } from "react"
import Postgrid from "../component/Postgrid"
import Livenow from "../component/Livenow"
import Contentpost from "../component/Contentpost"


class News extends Component {
    render(){
        return(
            <div className="News-main">
                <div className="inner-wrapper-news">
                    <div className="heading">News</div>
                    <div className="post-grids-wrap">
                        <Postgrid />
                        <Livenow />
                        <Contentpost />
                    </div>
                   
                </div>
            </div>
        )
    }
}

export default News