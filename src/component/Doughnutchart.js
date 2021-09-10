/* eslint-disable */
import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs-2';

const backgroundColor = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
]

const Doughnutchart = ({ totalValues, tokenSymbols }) => {
  console.log({ tokenSymbols })
  const bgcolor = totalValues.length > 0 ? backgroundColor.slice(-totalValues.length) : []
  const data = {
    labels: tokenSymbols,
    datasets: [
      {
        label: 'portfolio',
        data: totalValues,
        backgroundColor: bgcolor,
        borderColor: bgcolor,
        borderWidth: 0,
      },
    ],
  };
  console.log('DATA', data);
  return (
    <Doughnut data={data} />
  )
}


export default Doughnutchart