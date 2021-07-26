import React, { Component } from 'react';
import './component.css';
import Dropdown from 'react-bootstrap/Dropdown';


class Customdropdown extends Component{
    render() {
        return (
          <div className="customised-dashdrop">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">Date </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item> 
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>

                </Dropdown>
          </div>
        )
    }
}



export default Customdropdown