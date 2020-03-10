import React, { useState, useEffect } from "react";

const Chart = props => {
  const data = props.data;
  const statuses = ["Одобрено", "Отказано"];
  const [filter, setFilter] = useState();
  const [filteredData, setFilteredData] = useState(data);
  const sumOverall = data.reduce((a, b) => a + (b["sum"] || 0), 0);
  const [sum, setSum] = useState(sumOverall);

  const setData = filter => {
    const fd = data.filter(
      item => filter == undefined || item.status == filter
    );
    const s = fd.reduce((a, b) => a + (b["sum"] || 0), 0);
    setSum(s);
    setFilteredData(fd);
  };

  useEffect(() => {
    setData(filter);
  }, [filter]);

  const colors = [
    "#ec407a",
    "#880e4f",
    "#f50057",
    "#ba68c8",
    "#4a148c",
    "#d500f9",
    "#5e35b1",
    "#536dfe"
  ];

  const drawPies = (pies, sum) => {
    const drawPie = props => {
      const {
        item,
        index,
        size,
        cx,
        cy,
        xStart,
        yStart,
        xEnd,
        yEnd,
        radiusCircle,
        color
      } = props;

      const polygonPoints =
        size < 150
          ? `${cx},${cy} ${xStart},${yStart} ${xEnd},${yEnd}`
          : `${cx},${cy} ${xStart},${yStart} ${xStart +
              1000},${yStart} ${xStart + 1000},${yStart + 1000} ${xEnd -
              1000},${yEnd} ${xEnd},${yEnd}`;
      const percent = Math.round((size * 100) / 360);

      return (
        <g key={index} className="g">
          <text className="hoverText" x={cx} y={cy - 140}>
            {`${percent}%`}
          </text>
          <text className="hoverText" x={cx} y={cy - 120}>
            {item}
          </text>
          <clipPath id="cut-off-bottom">
            <polygon key="1" points={polygonPoints} />
          </clipPath>

          <circle
            cx={cx}
            cy={cy}
            r={radiusCircle}
            fill={color}
            clipPath="url(#cut-off-bottom)"
          />
        </g>
      );
    };

    let degreeStart = 0;
    const radiusCircle = 100;
    const radius = 200;
    const cx = 200;
    const cy = 200;
    return pies.map((element, index) => {
      const item = element.sum;
      const size = (item * 360) / sum;
      const degreeEnd = degreeStart + size;
      const xStart =
        cx + radius * Math.cos(((degreeStart - 90) * Math.PI) / 180);
      const yStart =
        cy + radius * Math.sin(((degreeStart - 90) * Math.PI) / 180);
      const xEnd = cx + radius * Math.cos(((degreeEnd - 90) * Math.PI) / 180);
      const yEnd = cy + radius * Math.sin(((degreeEnd - 90) * Math.PI) / 180);
      const color = colors[0];
      colors.shift();

      console.log(item, degreeStart, degreeEnd, xEnd, yEnd);

      const props = {
        item,
        index,
        size,
        cx,
        cy,
        xStart,
        yStart,
        xEnd,
        yEnd,
        radiusCircle,
        color
      };

      const pie = drawPie(props);

      degreeStart = degreeEnd;

      return pie;
    });
  };

  return (
    <>
      <button
        color="black"
        disabled={filter === undefined}
        onClick={() => setFilter(undefined)}
      >
        Все
      </button>
      <button
        disabled={filter === statuses[0]}
        onClick={() => setFilter(statuses[0])}
      >
        Одобрено
      </button>
      <button
        disabled={filter === statuses[1]}
        onClick={() => setFilter(statuses[1])}
      >
        Отказано
      </button>
      <svg width="400" height="400">
        {drawPies(filteredData, sum)}
      </svg>
    </>
  );
};

export default Chart;
