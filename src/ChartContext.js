import React, { useState } from "react";

const ChartContext = React.createContext([{}, () => {}]);

const ChartContextProvider = props => {
  const [state, setState] = useState({
    data: props.data,
    coin: "bitcoin",
    coins: Object.keys(props.data),
    value: "price_usd",
    minDate: "12/5/2013",
    maxDate: "31/10/2017"
  });

  return (
    <ChartContext.Provider value={[state, setState]}>
      {props.children}
    </ChartContext.Provider>
  );
};

export { ChartContext, ChartContextProvider };
