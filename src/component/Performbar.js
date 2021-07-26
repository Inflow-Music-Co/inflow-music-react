import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2';



const data = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11' , '12' , '13' ,'14', '1'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3, 10, 13, 20, 22, 44, 5, 50, 20, 22],
        backgroundColor: [
            'rgba(85, 148, 235, 1)',
        ],
        
        
      },
    ],
  };
  
  const options = {
    scales: {

        xAxes: [{
            barPercentage: 0.4
        }]
    },
};

class Performbar extends Component{
    render() {
        return(
            <Bar data={data} options={options} />
        )
    }
}


export default Performbar