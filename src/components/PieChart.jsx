import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PieChart = () => {
  const options = {
    chart: {
      type: "pie",
      backgroundColor: "#242424",
    },
    title: {
      text: "",
    },
    series: [
      {
        name: "Tokenomics",
        data: [
          { name: "Centralised Exchange", y: 5, color: "#e5e7eb" },
          { name: "Airdrop", y: 9, color: "#4c4c4c" },
          { name: "Uniswap Pool", y: 86, color: "#2f2f2f" },
        ],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PieChart;
