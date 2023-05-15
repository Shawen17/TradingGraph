import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";

const Table = (props) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "login",
        header: "Login",
      },
      {
        accessorKey: "equity",
        header: "Equity",
      },
      {
        accessorKey: "balance",
        header: "Balance",
      },
      {
        accessorKey: "time",
        header: "Time",
      },
    ],
    []
  );

  return (
    <div style={{ margin: 20 }}>
      <MaterialReactTable data={props.data} columns={columns} />
    </div>
  );
};

export default Table;
