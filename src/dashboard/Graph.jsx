import React from "react";
import "./../App.css";

const Graph = props => {
  const data = props.data;

  const getMinMax = data => {
    var minSum = data[0].sum;
    var maxSum = minSum;
    var minDate = data[0].dateMls;
    var maxDate = minDate;

    data.map((element, index) => {
      const { sum } = element;
      const { dateMls } = element;
      if (sum < minSum) {
        minSum = sum;
      } else if (sum > maxSum) {
        maxSum = sum;
      }
      if (dateMls < minDate) {
        minDate = dateMls;
      } else if (dateMls > maxDate) {
        maxDate = dateMls;
      }
      return element;
    });
    return { minSum, maxSum, minDate, maxDate };
  };
  const { minSum, maxSum, minDate, maxDate } = getMinMax(data);
  console.log(minSum, maxSum, minDate, maxDate);

  const drawLines = () => {
    let previousX = 0;
    let previousY = 300;

    data.sort((a, b) => (a.dateMls > b.dateMls ? 1 : -1));

    return data.map((element, index) => {
      const { sum } = element;
      const { dateMls } = element;
      const date = new Date(dateMls);

      const x = 50 + ((dateMls - minDate) * 400) / (maxDate - minDate);
      const y = 300 - ((sum + minSum) * 250) / (maxSum);

      // maxsum = 300
      // sum = x

      const line = (
        <g key={index} className="g">
          <rect
            x={x - 500 / data.length / 2}
            y="0"
            width={500 / data.length}
            height="300"
            opacity="0"
          />
          <path
            style={{ stroke: "black", strokeWidth: 2 }}
            d={`M ${previousX} ${previousY} L ${x} ${y} z`}
          />
          <circle className="graphPoint" cx={x} cy={y} r="5" fill="black" />
          <text className="hoverText" x={0} y={320}>
            {`${sum} тенге`}
          </text>
          <text className="hoverText" x={0} y={340}>
            {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
          </text>
        </g>
      );
      previousX = x;
      previousY = y;

      return line;
    });
  };

  const buildGraph = () => {
    return (
      <>
        <path style={{ stroke: "black", strokeWidth: 5 }} d="M 0 0 L 0 300 z" />
        {drawLines()}
        <path
          style={{ stroke: "black", strokeWidth: 3 }}
          d="M 0 300 L 500 300 z"
        />
      </>
    );
  };

  return (
    <svg width="600" height="350">
      {buildGraph()}
    </svg>
  );
};

export default Graph;
