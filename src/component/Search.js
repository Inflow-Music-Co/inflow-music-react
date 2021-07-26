import React, { Component } from 'react';
import './component.css';


class Search extends Component{
    render() {
        return (
            <div className="search-bar">
                <input  placeholder="Search for Artist..."/>
            </div>
        )
    }
}



export default Search
