import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import SmallLoader from "./SmallLoader";
import "./TokenChart.css";

const TokenChart = ({ artist, historicalData }) => {
  const [labels, setlabels] = useState([]);
  const [values, setvalues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(false);

      if (historicalData) {
        console.log("historicalData", historicalData);
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
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const graphData = (canvas) => {
    const updatedLabels = labels.map((date) => moment(date).format("DD/MM"));
    // var ctx = document.getElementById("canvas").getContext("2d");
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(125, 42, 221, 0.5)");
    gradient.addColorStop(0.1, "rgba(125, 42, 221, 0.8)");
    gradient.addColorStop(0.4, "rgba(125, 42, 221, 0.4)");
    // gradient.addColorStop(0.65, "rgba(59, 22, 111, 0)");
    gradient.addColorStop(0.75, "rgba(59, 72, 193, 0.6)");

    const graphdata = {
      labels: updatedLabels,

      datasets: [
        {
          label: "Token Price",
          data: values,
          fill: true,
          borderWidth: 1,
          borderColor: "rgba(107, 22, 209, 1)",
          borderCapStyle: "round",
          borderJoinStyle: "miter",
          backgroundColor: gradient,
          pointRadius: 2,
          pointHitRadius: 30,
          pointBorderWidth: 1,
          pointBorderColor: "#2a2e3b",
          pointBackgroundColor: "rgba(115, 44, 245, 1)",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(115, 44, 245, 1)",
          pointHoverRadius: 4,
          pointHighlightFill: "#fff",
          tension: 0.35,
        },
      ],
    };
    return graphdata;
  };
  return (
    <>
      {loading ? (
        <SmallLoader />
      ) : (
        <Line data={graphData} options={options} height={275} />
      )}
    </>
  );
};

export default TokenChart;
