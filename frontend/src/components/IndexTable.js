import React from "react";
import { Table } from "reactstrap";

const IndexTable = (props) => {
  const data = props.data[0];
  console.log(data);

  if (data) {
    var change = +data.equity - +data.balance;
  }

  const calcChange = (value) => {
    if (value < 0) {
      return "-" + value.toFixed(2);
    } else {
      return value.toFixed(2);
    }
  };

  return (
    <div>
      <Table responsive className="table">
        <thead>
          <tr>
            <th>Balance</th>
            <th>Equity</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {data && (
            <tr>
              <td>{data.balance}</td>
              <td>{data.equity}</td>
              <td className={change > 0 ? "green" : "red"}>
                {calcChange(change)}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default IndexTable;
