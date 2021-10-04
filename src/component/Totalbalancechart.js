import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import SmallLoader from './SmallLoader';
import './Totalbalancechart.css';

const Totalbalancechart = ({ artist, historicalData }) => {
    const [labels, setlabels] = useState([]);
    const [values, setvalues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(false);

            if (historicalData) {
                console.log('historicalData', historicalData);
                let templabels = [];
                let tempvalues = [];
                historicalData.forEach((item) => {
                    delete item._id;
                    item.price = parseFloat(item.price, 10).toFixed(2);
                    console.log(item);
                    const curDate = new Date(item.timestamp);

                    templabels.push(curDate);
                    tempvalues.push(item.price);
                });
                console.log(templabels, tempvalues);
                setvalues(tempvalues);
                setlabels(templabels);
            }
        };
        loadData();
    }, [historicalData]);

    console.log(values, labels);

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    };

    const getgraphdata = () => {
        const updatedLabels = labels.map((date) => moment(date).format('DD/MM'));
        // var ctx = document.getElementById("canvas").getContext("2d");
        // const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        // gradient.addColorStop(0, "rgba(151,187,205,0.7)");
        // gradient.addColorStop(1, "rgba(151,187,205,0)");

        const graphdata = {
            labels: updatedLabels,

            datasets: [
                {
                    label: 'Price of Token',
                    data: values,
                    fill: true,
                    borderCapStyle: 'round',
                    borderJoinStyle: 'miter',
                    backgroundColor: 'rgba(87, 47, 163, 1)',
                    // backgroundColor: gradient,
                    borderColor: 'rgba(151,187,205,1)',
                    pointBackgroundColor: 'rgba(151,187,205,1)',
                    pointBorderColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(151,187,205,1)'
                }
            ]
        };
        return graphdata;
    };
    return (
        <>
            {loading ? (
                <SmallLoader />
            ) : (
                <Line data={getgraphdata()} options={options} height={250} />
            )}
        </>
    );
};

export default Totalbalancechart;
