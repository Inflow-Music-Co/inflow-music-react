import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import SmallLoader from './SmallLoader';

const GET_GRAPH_DATA = gql`
    query {
      minteds(orderBy:timestamp){
        timestamp
        mintPrice
      }
    }
`


const Totalbalancechart = () => {
  const { loading, data } = useQuery(GET_GRAPH_DATA);
  const [labels, setlabels] = useState([]);
  const [values, setvalues] = useState([]);

  useEffect(() => {
    if (data) {
      let templabels = [];
      let tempvalues = []
      data.minteds.forEach(item => {
        if (templabels.length > 0) {
          if ((templabels[templabels.length - 1].getMonth() === new Date(item.timestamp * 1000).getMonth() && templabels[templabels.length - 1].getDate() < new Date(item.timestamp * 1000).getDate()) || (templabels[templabels.length - 1].getMonth() !== new Date(item.timestamp * 1000).getMonth())) {
            templabels.push(new Date(item.timestamp * 1000));
            tempvalues.push(item.mintPrice / 1000000)
          }
        } else {
          templabels.push(new Date(item.timestamp * 1000));
          tempvalues.push(item.mintPrice / 1000000)
        }
      })
      setvalues(tempvalues);
      setlabels(templabels);
    }
  }, [data]);

  

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