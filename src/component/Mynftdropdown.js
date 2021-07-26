import React, { Component } from 'react';
import './component.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { assetsImages } from '../constants/images';

class Mynftdropdown extends Component{
    render() {
        return (
          <div className="Mynft-drop-component-main">
              <div className="title-name">My NFTs</div>
              <Dropdown>
                    <Dropdown.Toggle id="dropdown-custom-1">
                        Recent
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="super-colors">
                    <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                    <Dropdown.Item eventKey="3" active>
                        Active Item
                    </Dropdown.Item>
                    </Dropdown.Menu>
              </Dropdown>
          </div>
        )
    }
}



export default Mynftdropdown