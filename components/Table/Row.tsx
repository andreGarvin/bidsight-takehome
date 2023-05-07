import { Cell } from "react-table";

import Label from "components/Common/Label";

import { formatCurrency, formatTime } from "services/format";


type RowProps = {
  cell: Cell<any>;
};

const Row: React.FC<RowProps> = (props) => {
  const { cell } = props;
  const { column } = cell;

  let content;
  switch (column.id) {
    case "title":
      content = (
        <p className="text-black cursor-pointer group-hover:underline group-hover:text-indigo-600 w-96 truncate">
          {cell.value}
        </p>
      );
      break;
    case "invoice_id":
      content = (
        <p className="text-black cursor-pointer group-hover:underline group-hover:text-indigo-600">
          {cell.value}
        </p>
      );
      break;
    case "status":
      content = <Label status={cell.value} />;
      break;
    case "due_date":
      if (cell.value) {
        content = (
          <p className="group-hover:underline group-hover:text-indigo-600">
            {formatTime(cell.value)}
          </p>
        );
      } else {
        content = (
          <p className="text-gray-600 group-hover:underline group-hover:text-indigo-600">
            no due date
          </p>
        );
      }
      break;
    case "total_cost":
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      content = (
        <p className="group-hover:underline group-hover:text-indigo-600">
          {formatCurrency(cell.value)}
        </p>
      );
      break;
  }

  return (
    <td
      {...cell.getCellProps()}
      scope="row"
      className="px-6 py-4 text-base font-medium text-gray-900 whitespace-nowrap"
    >
      {content}
    </td>
  );
};

export default Row;
