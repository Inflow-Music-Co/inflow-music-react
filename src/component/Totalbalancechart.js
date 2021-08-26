/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import SmallLoader from './SmallLoader';
import Axios from 'axios'
import './chart.css'
import { id } from 'ethers/lib/utils';

const Totalbalancechart = ({ artist, historicalData }) => {
  const [labels, setlabels] = useState([]);
  const [values, setvalues] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    
    setLoading(false);

    if (historicalData) {
      console.log('historicalData', historicalData);
      let templabels = [];
      let tempvalues = [];
      historicalData.forEach(item => {
        if(item){
          delete item._id;
          item.price = parseFloat(item.price, 10).toFixed(2);
          console.log(item)
          if (templabels.length > 0) {
              templabels.push(new Date(item.timestamp * 1000));
              tempvalues.push(item.price)   
          } else {
            templabels.push(new Date(item.timestamp));
            tempvalues.push(item.price / 1000000)
            console.log(templabels, tempvalues);
          }   
        }
      })
      setvalues(tempvalues);
      setlabels(templabels);
    }
  },[]);

  console.log(values, labels)

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const getgraphdata = () => {
    const updatedLabels = labels.map(label => label.toLocaleDateString())
    const graphdata = {
      labels: updatedLabels,
  
      datasets: [
        {
          label: 'Price of Token',
          data: values,
          fill: true,
          backgroundColor: 'rgba(87, 47, 163, 1)',
  
          borderCapStyle: "round",
          borderJoinStyle: 'miter'
        },
      ],
    };
    return graphdata;
  }
  return (
    <>
      {
        loading ? <SmallLoader /> : <Line data={getgraphdata()} options={options} height={250} />
      }
    </>
  )
}


export default Totalbalancechart;