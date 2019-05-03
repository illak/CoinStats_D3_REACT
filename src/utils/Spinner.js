import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;

  & .mydiv {
    animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 32px 32px;
  }
  & .mydiv:after {
    content: " ";
    display: block;
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #444;
    margin: -3px 0 0 -3px;
  }
  & .mydiv:nth-child(1) {
    animation-delay: -0.036s;
  }
  & .mydiv:nth-child(1):after {
    top: 50px;
    left: 50px;
  }
  & .mydiv:nth-child(2) {
    animation-delay: -0.072s;
  }
  & .mydiv:nth-child(2):after {
    top: 54px;
    left: 45px;
  }
  & .mydiv:nth-child(3) {
    animation-delay: -0.108s;
  }
  & .mydiv:nth-child(3):after {
    top: 57px;
    left: 39px;
  }
  & .mydiv:nth-child(4) {
    animation-delay: -0.144s;
  }
  & .mydiv:nth-child(4):after {
    top: 58px;
    left: 32px;
  }
  & .mydiv:nth-child(5) {
    animation-delay: -0.18s;
  }
  & .mydiv:nth-child(5):after {
    top: 57px;
    left: 25px;
  }
  & .mydiv:nth-child(6) {
    animation-delay: -0.216s;
  }
  & .mydiv:nth-child(6):after {
    top: 54px;
    left: 19px;
  }
  & .mydiv:nth-child(7) {
    animation-delay: -0.252s;
  }
  & .mydiv:nth-child(7):after {
    top: 50px;
    left: 14px;
  }
  & .mydiv:nth-child(8) {
    animation-delay: -0.288s;
  }
  & .mydiv:nth-child(8):after {
    top: 45px;
    left: 10px;
  }
  @keyframes lds-roller {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Spinner = ({ margin }) => {
  return (
    <StyledDiv
      style={{
        marginTop: margin.top,
        marginLeft: margin.left,
        marginRight: margin.right,
        marginBottom: margin.bottom
      }}
    >
      <div className="mydiv" />
      <div className="mydiv" />
      <div className="mydiv" />
      <div className="mydiv" />
      <div className="mydiv" />
      <div className="mydiv" />
      <div className="mydiv" />
      <div className="mydiv" />
    </StyledDiv>
  );
};

export default Spinner;
