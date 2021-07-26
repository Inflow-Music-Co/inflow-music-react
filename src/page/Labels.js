import React, { useState, useEffect } from "react"
import Labelscompo from "../component/Labelscompo"
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from "../component/Loader";

const Labels = () => {
    const [labels, setlabels] = useState([])
    const [loading, setloading] = useState(false)
    useEffect(() => {
        getlabels();
    }, [])
    const getlabels = async () => {
        try {
            setloading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/v1/label/alldata`)
            if (data.labels) {
                setlabels(data.labels)
            }
            setloading(false);
        } catch (error) {
            setloading(false);
            // console.log(error);
        }
    }
    if (loading) {
        return <Loader />
    }
    return (
        <div className="dashboard-wrapper-main labels-mains">
            <div className="heading">Labels</div>

            <div className="inner-row-labels-main">
                <div className="small-row-heading">
                    <div className="small-headings">Labels</div>
                    {/* <div className="short-descriptions">Lorem Ipsum Lorem Ipsum Lorem Ipsum</div> */}
                </div>

                <div className="labels-grid-main">
                    {
                        labels.map((label, i) => {
                            return <Link key={i} to={`/labels/${label._id}`}> <Labelscompo labelname={label.name} imglink={`${process.env.REACT_APP_SERVER_URL}/${label.image}`} /></Link>
                        })
                    }
                    {/* <Link to={'/rocnations'}> <Labelscompo /></Link>
                    <Link to={'/rocnations'}> <Labelscompo /></Link>
                    <Link to={'/rocnations'}> <Labelscompo /></Link>
                    <Link to={'/rocnations'}> <Labelscompo /></Link>
                    <Link to={'/rocnations'}> <Labelscompo /></Link>
                    <Link to={'/rocnations'}> <Labelscompo /></Link>
                    <Link to={'/rocnations'}> <Labelscompo /></Link>
                    <Link to={'/rocnations'}> <Labelscompo /></Link>
                    <Link to={'/rocnations'}> <Labelscompo /></Link>
                    <Link to={'/rocnations'}> <Labelscompo /></Link> */}

                </div>

            </div>

        </div>
    )
}

export default Labels
