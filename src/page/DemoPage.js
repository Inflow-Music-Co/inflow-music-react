import React, { Component } from "react"
import Header from "../base/Header";
import Sidebar from "../base/Sidebar";

class DemoPage extends Component {
    render(){
        return(
            <>
            <Header />
          <Sidebar />
            <div>demo</div>
            </>
        )
    }
}

export default DemoPage