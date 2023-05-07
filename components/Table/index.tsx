import { useMemo } from "react";
import { useTable, useSortBy, Row, HeaderGroup } from "react-table";

import { Icon } from "components/Common/Icon";

import LoadingTable from "components/Table/loading";
import RowComp from "components/Table/Row";

import { calculateTotalCost } from "services/calculate";
import { formatCurrency } from "services/format";

import { Invoice } from "api/types";


type TransformedTableData = {
  title: string;
  status: string;
  due_date: string;
  invoice_id: number;
  total_cost: number;
};


const formTableData = (invoices: Invoice[]): TransformedTableData[] => {
  return invoices.map((invoice) => ({
    title: invoice.name,
    invoice_id: invoice.id,
    status: invoice.status,
    due_date: invoice.due_date,
    total_cost: calculateTotalCost(invoice.charges),
  }));
}

const Summary = (props: { data: TransformedTableData[] }) => {
  const { data } = props;

  const totalCost = data.reduce((prev, curr) => {
    return prev + curr.total_cost;
  }, 0);

  return (
    <div className="flex flex-col md:flex-row justify-between mb-4">
      <span className="text-base md:text-lg py-4 pl-6 flex flex-row">
        <p className="font-bold first-letter:capitalize pr-2">
          total number of invoices:
        </p>
        <p>{data.length}</p>
      </span>
      <span className="text-base md:text-lg py-4 pl-6 flex flex-row">
        <p className="font-bold first-letter:capitalize pr-2">total cost:</p>
        <p className="">{formatCurrency(totalCost)}</p>
      </span>
    </div>
  );
}

const RenderRows = (
  rows: Row<TransformedTableData>[],
  onSelect: (id: number) => void,
  prepareRow: (row: Row<TransformedTableData>) => void
) => {
  return rows.map((row) => {
    prepareRow(row);

    return (
      <tr
        {...row.getRowProps()}
        className="bg-white border-b cursor-pointer hover:bg-indigo-50 group"
        onClick={() => onSelect(row.values.invoice_id)}
      >
        {row.cells.map((cell, idx) => (
          <RowComp key={idx} cell={cell} />
        ))}
      </tr>
    );
  });
};

const RenderHeaderGroup = (
  headerGroups: HeaderGroup<TransformedTableData>[]
) => {
  return headerGroups.map((headerGroup) => (
    <tr {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((column) => {
        return (
          <th
            {...column.getHeaderProps(column.getSortByToggleProps())}
            scope="col"
            className="px-6 py-3 text-lg cursor-pointer hover:underline"
          >
            <span className="flex flex-row items-center">
              {column.render("Header")}
              <span className={column.isSorted ? "visible" : "invisible"}>
                {column.isSortedDesc ? (
                  <Icon as="ChevronDown" className="ml-2" />
                ) : (
                  <Icon as="ChevronUp" className="ml-2" />
                )}
              </span>
            </span>
          </th>
        );
      })}
    </tr>
  ));
};


type TableProps = {
  data: Invoice[];
  loading: boolean;
  onSelect: (id: number) => void;
};

const Table: React.FC<TableProps> = (props) => {
  const { data, loading, onSelect } = props;

  const transformedColumnData = useMemo(
    () => formTableData(data),
    [data]
  )

  const tableColumns = useMemo(
  () =>  [
      {
        Header: "Invoice Id",
        accessor: "invoice_id",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Due Date",
        accessor: "due_date",
      },
      {
        Header: "Total cost",
        accessor: "total_cost",
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      // @ts-ignore
      columns: tableColumns,
      data: transformedColumnData,
    },
    useSortBy
  );

  if (loading) {
    return (
      <LoadingTable />
    );
  }

  const { rows, prepareRow, headerGroups, getTableProps, getTableBodyProps } =
    tableInstance;

  return (
    <>
      <div className="relative overflow-x-auto h-3/6 border border-gray-300">
        <table
          {...getTableProps()}
          className="w-full text-sm text-left text-gray-500 table-auto"
        >
          <thead className="capitalize text-xs bg-indigo-100 text-indigo-600 sticky top-0">
            {RenderHeaderGroup(headerGroups)}
          </thead>

          <tbody {...getTableBodyProps()}>
            {RenderRows(rows, onSelect, prepareRow)}
          </tbody>
        </table>
      </div>
      <Summary data={transformedColumnData} />
    </>
  );
}

export default Table;
