import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PieChart = () => {
  const options = {
    chart: {
      type: "pie",
      backgroundColor: "#000",
    },
    title: {
      text: "",
    },
    tooltip: {
      pointFormat: '{point.name} {point.percentage:.1f}%' // Customize the tooltip format to show percentage

    },
    series: [
      {
        name: "Tokenomics",
        data: [
          { name: "CEX Listing", y: 5, color: "#eee" },
          { name: "Airdrop", y: 9, color: "#4c4c4c" },
          { name: "Uniswap Pool", y: 86, color: "#242427" },
        ],
        // dataLabels: {
        //   enabled: true,
        //   format: '{point.percentage:.1f}%' // Customize the label format to show percentage
        // },
        
      },
    ],
    credits: {
      enabled: false,
      href: 'https://www.highcharts.com',
      text: 'highcharts.com',
      style: {
        color: '#FF0000' // Change this to your desired color
      }
    }
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PieChart;
