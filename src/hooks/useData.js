import { useEffect, useState } from "react";
import { timeParse } from "d3";

const parseTime = timeParse("%d/%m/%Y");

const useData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/illak/" +
        "f8883a279717a784bfe97c5aa05e3d55/raw/" +
        "1a1a056f38af5024e87ceec4ae8957debacd547f/coins.json"
    )
      .then(res => res.json())
      .then(data => {
        console.log("[FETCH]: fetching...");
        var cleanData = {};

        // Remove objects that contains null values
        Object.keys(data).forEach(key => {
          const noNull = data[key].filter(
            o => !Object.values(o).includes(null)
          );

          noNull.forEach(function(d) {
            d["price_usd"] = +d["price_usd"];
            d["24h_vol"] = +d["24h_vol"];
            d["market_cap"] = +d["market_cap"];
            d["date"] = parseTime(d["date"]);
          });

          cleanData = { ...cleanData, [key]: noNull };
        });

        setData(cleanData);
      })
      .catch(err => console.log("[FETCH]: ", err));
  }, []);

  return data;
};

export default useData;
