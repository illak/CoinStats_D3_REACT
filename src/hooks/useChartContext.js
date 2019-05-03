import { useContext } from "react";
import { ChartContext } from "../ChartContext";

const useChartContext = () => {
  const [state, setState] = useContext(ChartContext);

  const values = ["price_usd", "market_cap", "24h_vol"];
  const valuesTitle = [
    "Price in dollars",
    "Market capitalization",
    "24 hour trading volume"
  ];

  const setCoin = coin => {
    setState(state => ({
      ...state,
      coin: coin
    }));
  };

  const setValue = title => {
    const value = values[valuesTitle.indexOf(title)];
    setState(state => ({ ...state, value: value }));
  };

  const setMinDate = date => {
    setState(state => ({ ...state, newMinDate: date }));
  };

  const setMaxDate = date => {
    setState(state => ({ ...state, newMaxDate: date }));
  };

  return {
    data: state.data,
    setCoin,
    coin: state.coin,
    coins: state.coins,
    value: state.value,
    values,
    valuesTitle,
    setValue,
    minDate: state.minDate,
    maxDate: state.maxDate,
    newMinDate: state.newMinDate,
    newMaxDate: state.newMaxDate,
    setMinDate,
    setMaxDate
  };
};

export default useChartContext;
