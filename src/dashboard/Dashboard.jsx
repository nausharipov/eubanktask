import React from "react";
import "./../App.css";
import Table from "./Table";
import Graph from "./Graph";
import Chart from "./Chart";

const Dashboard = () => {
  const data = [
    {
      id: 1,
      type: "Кредит",
      status: "Одобрено",
      dateMls: 1582999200000,
      sum: 1000000
    },
    {
      id: 2,
      type: "Кредит",
      status: "Отказано",
      dateMls: 1583085600000,
      sum: 12000000
    },
    {
      id: 3,
      type: "Кредит",
      status: "Одобрено",
      dateMls: 1583172000000,
      sum: 320000
    },
    {
      id: 4,
      type: "Кредит",
      status: "Одобрено",
      dateMls: 1583258400000,
      sum: 140000
    },
    {
      id: 5,
      type: "Кредит",
      status: "Отказано",
      dateMls: 1583344800000,
      sum: 6000000
    }
  ];
  return (
    <>
      <Table tableData={data} />
      <Graph data={data} />
      <Chart data={data} />
    </>
  );
};

export default Dashboard;
