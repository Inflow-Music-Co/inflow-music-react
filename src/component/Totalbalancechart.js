import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import SmallLoader from './SmallLoader';
import Axios from 'axios'

const Totalbalancechart = ({ artist }) => {
  const [labels, setlabels] = useState([]);
  const [values, setvalues] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const res = await Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/artist/gettxhistorybyartist`, artist)
    setData(res);
    setLoading(false);

    if (data) {
      console.log('data', data);
      let templabels = [];
      let tempvalues = []
      // data.data.priceHistory.forEach(item => {
      //   if (templabels.length > 0) {
      //     if ((templabels[templabels.length - 1].getMonth() === new Date(item.timestamp * 1000).getMonth() && templabels[templabels.length - 1].getDate() < new Date(item.timestamp * 1000).getDate()) || (templabels[templabels.length - 1].getMonth() !== new Date(item.timestamp * 1000).getMonth())) {
      //       templabels.push(new Date(item.timestamp * 1000));
      //       tempvalues.push(item.mintPrice / 1000000)
      //     }
      //   } else {
      //     templabels.push(new Date(item.timestamp * 1000));
      //     tempvalues.push(item.mintPrice / 1000000)
      //   }
      // })
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