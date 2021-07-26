import React, { Component } from "react"
import { assetsImages } from "../constants/images"
import Dropdown from 'react-bootstrap/Dropdown';


class Leaderboard extends Component {
    render() {
        return (
            <div className="dashboard-wrapper-main">
                <div className="heading">Leaderboard</div>
                <div className="search-input-main">
                    <input placeholder="Search for a fan..." />
                    <button className="search-btn">
                        <img alt="" src={assetsImages.searchwhite} />
                    </button>
                </div>
                <div className="table-filter-btn-row">
                    <div className="left-col-fillter">
                        <div className="comman-btn">
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-custom-1">
                                    Top 50
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
                        <div className="comman-btn">
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-custom-1">
                                    Coins & Tokens
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

                    </div>
                    <div className="right-col-filter">
                        <div className="right-col-btn">
                            <button>Next 10</button>
                        </div>
                        <div className="right-col-btn">
                            <button>View All</button>
                        </div>
                    </div>

                </div>
                <div className="main-table-for-lader-board">
                    <table>
                        <thead>
                            <tr>
                                <th className="first-col">#</th>
                                <th className="second-col">Name</th>
                                <th className="third-col">Wallet Value</th>
                                <th className="fourth-col">Total Artist Tokens</th>
                                <th className="fifth-col">Total NFTs</th>
                                <th className="sixth-col">Inflow Net Worth Daily Change</th>
                                <th className="seventh-col">Roster Value</th>
                            </tr>

                        </thead>
                        <tbody>
                            <tr>
                                <td className="first-col">
                                    <div className="numbers">1</div>
                                </td>
                                <td className="second-col">
                                    <div className="artist-pic">
                                        <img alt="" src={assetsImages.person} />
                                    </div>
                                    <div className="name">Lorem Ipsum</div>
                                </td>
                                <td className="third-col">
                                    <div className="wallet-value">160000000</div>
                                </td>
                                <td className="fourth-col">
                                    <div className="total-artist">78</div>
                                </td>
                                <td className="fifth-col">
                                    <div className="total-artist">178</div>
                                </td>
                                <td className="sixt-col">
                                    <div className="green-light">0.92%</div>
                                </td>
                                <td className="seventh-col">
                                    <img alt="" src={assetsImages.imgchart} />
                                </td>

                            </tr>
                            <tr>
                                <td className="first-col">
                                    <div className="numbers">2</div>
                                </td>
                                <td className="second-col">
                                    <div className="artist-pic">
                                        <img alt="" src={assetsImages.person} />
                                    </div>
                                    <div className="name">Lorem Ipsum</div>
                                </td>
                                <td className="third-col">
                                    <div className="wallet-value">160000000</div>
                                </td>
                                <td className="fourth-col">
                                    <div className="total-artist">78</div>
                                </td>
                                <td className="fifth-col">
                                    <div className="total-artist">178</div>
                                </td>
                                <td className="sixt-col">
                                    <div className="red-light">0.05%</div>
                                </td>
                                <td className="seventh-col">
                                    <img alt="" src={assetsImages.imgchart} />
                                </td>

                            </tr>
                        </tbody>

                    </table>
                </div>
                <div className="next-btn-main">
                    <button>Next 10</button>
                </div>

            </div>
        )
    }
}

export default Leaderboard
