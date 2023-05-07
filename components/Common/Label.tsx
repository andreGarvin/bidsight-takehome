import { twMerge } from "tailwind-merge";

import { InvoiceStatus } from "api/types";


type LabelProps = {
  status: InvoiceStatus;
}

const statusColors = {
  draft: "bg-gray-400",
  paid: "bg-emerald-400",
  outstanding: "bg-yellow-400",
};

const Label: React.FC<LabelProps> = (props) => {
  const { status } = props;

  return (
    <span
      className={twMerge(
        "py-2 px-4 text-sm inline-flex items-center justify-center font-semibold text-white rounded-full",
        statusColors[status as string]
      )}
    >
      {status as string}
    </span>
  );
};

export default Label;
