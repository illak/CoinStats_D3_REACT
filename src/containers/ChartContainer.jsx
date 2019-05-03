import React from "react";
import useData from "../hooks/useData";
import Chart from "../components/Chart";
import Control from "../components/Control";

const ChartContainer = () => {
  const data = useData();

  data ? console.log(data) : console.log("loading...");

  return (
    <div className="App">
      <Control />
      <Chart data={data} />
    </div>
  );
};

export default ChartContainer;
