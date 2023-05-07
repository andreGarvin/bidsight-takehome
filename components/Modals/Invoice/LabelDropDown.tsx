import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import Button from "components/Common/Button";
import Label from "components/Common/Label";

import { InvoiceStatuses } from "api/types";

type LabelDropDownProps = {
  status: string;
  onSelect: (label: string) => void;
};

const LabelDropDown: React.FC<LabelDropDownProps> = (props) => {
  const { status, onSelect } = props;

  return (
    <Menu as="div" className="w-32 relative inline-block text-left">
      <div>
        <Menu.Button
          as={Button}
          rightIcon="ChevronDown"
          className="text-gray-500"
        >
          <Label status={status as InvoiceStatuses} />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col">
          <Menu.Item
            onClick={() => onSelect(InvoiceStatuses.draft)}
            as={Button}
            className="w-full flex flex-start p-2 cursor-pointer border-t-0 hover:bg-gray-100"
          >
            <Label status={InvoiceStatuses.draft} />
          </Menu.Item>
          <Menu.Item
            onClick={() => onSelect(InvoiceStatuses.paid)}
            as={Button}
            className="w-full flex flex-start p-2 cursor-pointer border-t-0 hover:bg-gray-100"
          >
            <Label status={InvoiceStatuses.paid} />
          </Menu.Item>
          <Menu.Item
            onClick={() => onSelect(InvoiceStatuses.outstanding)}
            as={Button}
            className="w-full flex flex-start p-2 cursor-pointer border-t-0 hover:bg-gray-100"
          >
            <Label status={InvoiceStatuses.outstanding} />
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LabelDropDown;
