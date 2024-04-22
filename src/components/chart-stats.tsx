import { stat } from "fs/promises";
import React from "react";

import Chart from "react-apexcharts";

const ApexChart = ({
  categories,
  options,
  stats_base,
  stats_efforts,
}: {
  categories: string[];
  options: string[];
  stats_base: number[];
  stats_efforts: number[];
}) => {
  const options1 = {
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: "white",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "white",
        },
      },
    },
    legend: {
      labels: {
        colors: "white",
      },
    },
  };

  const series = [
    {
      name: "Base Stats",
      data: stats_base,
    },
    {
      name: "Efforts Stats",
      data: stats_efforts,
    },
  ];

  return (
    <div
      className="hidden md:block rounded-lg"
      style={{
        backgroundColor: "rgb(229, 228, 226,0.4)",
      }}
    >
      <h2 className="text-white pt-3 mx-auto text-center">Stats Chart</h2>
      <Chart series={series} type="bar" options={options1} />
    </div>
  );
};
export default ApexChart;
