import React from "react";

import { ChartContextProvider } from "./ChartContext";
import Chart from "./components/Chart";
import Control from "./components/Control";
import useData from "./hooks/useData";

import Spinner from "./utils/Spinner";

import styled from "styled-components";

const StyledContainer = styled.div`
  width: 900px;
  text-align: center;
  margin: 30px auto;
`;

const App = () => {
  const data = useData();
  const chartWidth = 900;
  const chartHeight = 550;
  const margin = { top: 10, right: 10, bottom: 70, left: 70 };

  return (
    <StyledContainer>
      {data ? (
        <ChartContextProvider data={data}>
          <Control />
          <Chart width={chartWidth} height={chartHeight} margin={margin} />
        </ChartContextProvider>
      ) : (
        <Spinner margin={{ top: 200 }} />
      )}
    </StyledContainer>
  );
};

export default App;
