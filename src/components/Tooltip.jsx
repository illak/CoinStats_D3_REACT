import React, { useState } from "react";
import { bisector, format } from "d3";
import styled from "styled-components";
import useChartContext from "../hooks/useChartContext";

const StyledLine = styled.line`
  stroke: #777;
  stroke-width: 2px;
  stroke-dasharray: 3, 3;
`;

const StyledCircle = styled.circle`
  fill: none;
  stroke: #777;
  stroke-width: 3px;
`;

const StyledRect = styled.rect`
  fill: none;
  pointer-events: all;
`;

const StyledText = styled.text`
  background: lightsalmon;
`;

const Tooltip = ({ x, y, width, height, xScale, yScale, dataFiltered }) => {
  const { value } = useChartContext();

  const [gX, setGx] = useState(x);
  const [gY, setGy] = useState(y);
  const [display, setDisplay] = useState("none");
  const [y2, setY2] = useState(height);
  const [x2, setX2] = useState(width);
  const [text, setText] = useState("");

  const bisectDate = bisector(function(d) {
    return d.date;
  }).left;

  const handleMouseMove = event => {
    // This is for getting coordinates relative to a parent!
    // https://stackoverflow.com/questions/16154857/how-can-i-get-the-mouse-coordinates-relative-to-a-parent-div-javascript
    const bounds = event.target.getBoundingClientRect();

    const x0 = xScale.invert(event.clientX - bounds.left);
    const i = bisectDate(dataFiltered, x0, 1, dataFiltered.length - 1);
    const d0 = dataFiltered[i - 1];
    const d1 = dataFiltered[i];
    const d = d1 && d0 ? (x0 - d0.date > d1.date - x0 ? d1 : d0) : 0;

    setGx(xScale(d.date) + x);
    setGy(yScale(d[value]) + y);
    setText(format("$,")(d[value].toFixed(2)));
    setY2(height - yScale(d[value]));
    setX2(-xScale(d.date));
  };

  return (
    <>
      <g transform={`translate(${gX},${gY})`} display={display}>
        <StyledLine y1={0} y2={y2} />
        <StyledLine x1={0} x2={x2} />
        <StyledCircle r={7} />
        <StyledText x={15} dy={".31em"} fontWeight="bold">
          {text}
        </StyledText>
      </g>
      <StyledRect
        transform={`translate(${x},${y})`}
        width={width}
        height={height}
        onMouseOver={() => setDisplay(null)}
        onMouseOut={() => setDisplay("none")}
        onMouseMove={e => handleMouseMove(e)}
      />
    </>
  );
};

export default Tooltip;
