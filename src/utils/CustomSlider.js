import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import React from "react";
import Slider from "rc-slider";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const CustomSlider = ({
  width,
  min,
  max,
  formatter,
  defaultValues,
  onChangeFun,
  onAfterChangeFun
}) => {
  const wrapperStyle = { width: width };

  return (
    <div style={wrapperStyle}>
      <Range
        min={min}
        max={max}
        defaultValue={defaultValues}
        tipFormatter={formatter}
        onChange={e => onChangeFun(e)}
        onAfterChange={onAfterChangeFun}
      />
    </div>
  );
};

export default CustomSlider;
