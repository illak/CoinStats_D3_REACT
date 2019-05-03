import React, { useState, useMemo } from "react";
import useChartContext from "../hooks/useChartContext";

import styled from "styled-components";
import CustomSlider from "../utils/CustomSlider";

import { timeParse, timeFormat, timeDay } from "d3";

const StyledContainer = styled.div`
  display: flex;
  height: 100px;
  justify-content: space-evenly;
  margin-bottom: 50px;
  align-items: center;
`;

const StyledSpan = styled.span`
  margin-top: 10px;
  padding-left: 5px;
  padding-right: 5px;
  color: #000;
  background-color: lightsalmon;
  border-radius: 10px;
`;

const Control = () => {
  const {
    coins,
    setCoin,
    setValue,
    valuesTitle,
    minDate,
    maxDate,
    setMinDate,
    setMaxDate
  } = useChartContext();

  const [dateDisplay, setDateDisplay] = useState([minDate, maxDate]);

  const handleCoinChange = event => {
    setCoin(event.target.value);
  };

  const handleValueChange = event => {
    setValue(event.target.value);
  };

  var parseTime = timeParse("%d/%m/%Y");
  var formatTime = timeFormat("%d/%m/%Y");

  // Calculates range between min and max date (a.k.a magic from D3!)
  const dateRange = useMemo(
    () => timeDay.range(parseTime(minDate), parseTime(maxDate)),
    [minDate, maxDate, parseTime]
  );

  const formatIndex = index => formatTime(dateRange[index]);

  // event is an array: [min, max]
  const handleSliderChange = event => {
    setMinDate(dateRange[event[0]]);
    setMaxDate(dateRange[event[1]]);
    setDateDisplay([formatIndex(event[0]), formatIndex(event[1])]);
  };

  return (
    <StyledContainer>
      <div className="slider-container">
        <CustomSlider
          width={400}
          min={0}
          max={dateRange.length - 1}
          defaultValues={[0, dateRange.length - 1]}
          formatter={value => formatIndex(value)}
          onChangeFun={handleSliderChange}
          onAfterChangeFun={() => {}}
        />
        <div className="level">
          <StyledSpan>{`${dateDisplay[0]}`}</StyledSpan>
          <StyledSpan>{`${dateDisplay[1]}`}</StyledSpan>
        </div>
      </div>

      <div className="select">
        <select onChange={e => handleCoinChange(e)}>
          {coins.map(coin => (
            <option key={coin} className="dropdown-item">
              {coin}
            </option>
          ))}
        </select>
      </div>

      <div className="select">
        <select onChange={e => handleValueChange(e)}>
          {valuesTitle.map((title, i) => (
            <option key={i} className="dropdown-item">
              {title}
            </option>
          ))}
        </select>
      </div>
    </StyledContainer>
  );
};

export default Control;
