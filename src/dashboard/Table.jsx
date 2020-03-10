import React from "react";
import "./../App.css";

const Table = props => {
  const renderTableData = () => {
    return props.tableData.map((element, index) => {
      const { id, type, status, dateMls, sum } = element;
      const date = new Date(dateMls);
console.log('rtd ', date, dateMls)
      return (
        <tr key={id}>
          <td className="td">{id}</td>
          <td className="td">{type}</td>
          <td className="td">{status}</td>
          <td className="td">
            {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
          </td>
          <td className="td">{sum}</td>
        </tr>
      );
    });
  };

  return (
    <table className="table">
      <tbody>
        <tr>
          <th className="th">#</th>
          <th className="th">Тип</th>
          <th className="th">Статус</th>
          <th className="th">Дата</th>
          <th className="th">Сумма</th>
        </tr>
        {renderTableData()}
      </tbody>
    </table>
  );
};

export default Table;
