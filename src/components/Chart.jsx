import React, { useMemo, useCallback } from "react";
import * as d3 from "d3";
import styled from "styled-components";

import useChartContext from "../hooks/useChartContext";
import Tooltip from "./Tooltip";

const StyledPath = styled.path`
  fill: none;
  stroke: grey;
  stroke-width: 1.5px;
  transition: all 1s;
`;

const StyledText = styled.text`
  text-anchor: middle;
`;

const Chart = ({ width, height, margin }) => {
  const { data, coin, value, newMinDate, newMaxDate } = useChartContext();

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const dataFiltered = useMemo(
    () =>
      newMinDate && newMaxDate
        ? data[coin].filter(d => d.date >= newMinDate && d.date <= newMaxDate)
        : data[coin],
    [newMinDate, newMaxDate, data, coin]
  );

  const x = useMemo(
    () =>
      d3
        .scaleTime()
        .domain(d3.extent(dataFiltered, d => d.date))
        .range([0, innerWidth]),
    [innerWidth, dataFiltered]
  );

  const y = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([
          d3.min(dataFiltered, d => d[value]),
          d3.max(dataFiltered, d => d[value])
        ])
        .range([innerHeight, 0]),
    [innerHeight, dataFiltered, value]
  );

  const line = useMemo(
    () =>
      d3
        .line()
        .y(d => y(d[value]))
        .x(d => x(d.date)),
    [value, x, y]
  );

  const bottomAxis = d3.axisBottom(x).ticks(4);
  const addXAxis = useCallback(
    g => {
      d3.select(g)
        .transition(d3.transition().duration(1000))
        .call(bottomAxis);
    },
    [bottomAxis]
  );

  // Fix for format values
  var formatSi = d3.format(".2s");
  function formatAbbreviation(x) {
    var s = formatSi(x);
    switch (s[s.length - 1]) {
      case "G":
        return s.slice(0, -1) + "B";
      case "k":
        return s.slice(0, -1) + "K";
      default:
        return s;
    }
  }

  const leftAxis = d3.axisLeft(y).tickFormat(formatAbbreviation);
  const addYAxis = useCallback(
    g => {
      d3.select(g)
        .transition(d3.transition().duration(1000))
        .call(leftAxis);
    },
    [leftAxis]
  );

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {dataFiltered.length > 0 ? (
          <StyledPath d={line(dataFiltered)} />
        ) : (
          <StyledText x={innerWidth / 2} y={innerHeight / 2}>
            No Data in Selected Range
          </StyledText>
        )}
      </g>

      <g
        ref={addXAxis}
        transform={`translate(${margin.left}, ${innerHeight + margin.top})`}
      />
      <g
        ref={addYAxis}
        transform={`translate(${margin.left}, ${margin.top})`}
      />

      <text x={width / 2} y={height - 20} fontSize="20" textAnchor="middle">
        Date
      </text>

      <text
        x={-height / 2}
        y={20}
        fontSize="20"
        textAnchor="middle"
        transform={`rotate(-90)`}
        style={{ textTransform: "capitalize" }}
      >
        {value === "price_usd"
          ? "Price (USD)"
          : value === "market_cap"
          ? "Market Capitalization (USD)"
          : "24 Hour Trading Volume (USD)"}
      </text>

      <Tooltip
        x={margin.left}
        y={margin.top}
        width={innerWidth}
        height={innerHeight}
        xScale={x}
        yScale={y}
        dataFiltered={dataFiltered}
      />
    </svg>
  );
};

export default Chart;
