import React, { useState, Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

import { Icon } from "components/Common/Icon";
import Button from "components/Common/Button";
import Input from "components/Common/Input";

import { formatCurrency } from "services/format";

import { Charge } from "api/types";

type ChargeDropDownProps = {
  onEdit: () => void;
  onDelete: () => void;
};

const ChargeDropDown: React.FC<ChargeDropDownProps> = (props) => {
  const { onEdit, onDelete } = props;

  return (
    <Menu as="div" className="inline-block text-left">
      <div>
        <Menu.Button as={Button} rightIcon="More" />
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
        <Menu.Items className="absolute w-48 z-20 right-0 mt-2 mx-12 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col p-2">
          <Menu.Item
            as={Button}
            onClick={onEdit}
            leftIcon="Pencil"
            className="w-full flex flex-start p-2 cursor-pointer mb-2 border-0 text-indigo-600 hover:text-white hover:bg-indigo-600"
          >
            edit
          </Menu.Item>
          <div className="border-t border-gray-300">
            <Menu.Item
              as={Button}
              onClick={onDelete}
              leftIcon="Trash"
              className="w-full flex flex-start p-2 cursor-pointer mt-2 border-0 text-red-600 hover:text-white hover:bg-red-600"
            >
              delete
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

type ChargeProps = {
  data: Charge;
  newInvoice: boolean;
  onDelete: (id: number) => void;
  onSave: (charge: Charge) => void;
  onUpdate: (charge: Charge) => void;
};

const Charge: React.FC<ChargeProps> = (props) => {
  const { data, newInvoice, onSave, onDelete, onUpdate } = props;

  const newCharge =
    data.title.trim().length === 0 && data.price === 0;

  const [edit, setEdit] = useState(false || newCharge);

  const [amount, setAmount] = useState(data.price);
  const [label, setLabel] = useState(data.title);

  const toggleEdit = () => setEdit((prev) => !prev);

  const onUpdateCharge = (title, price) => {
    onSave({
      id: data.id,
      title,
      price,
    });
    toggleEdit();
  }

  const onChange = (field, val) => {
    onUpdate({
      ...data,
      id: data.id,
      [field]: val,
    });
  };

  if (!edit) {
    return (
      <div className="flex flex-row justify-between items-center my-1 p-2 border border-gray-300 text-base">
        <div className="flex flex-row justify-between items-center w-full">
          <p className="font-semibold ml-2 w-3/4 truncate">{data.title}</p>
          <p>{formatCurrency(data.price)}</p>
        </div>
        <ChargeDropDown onDelete={() => onDelete(data.id)} onEdit={toggleEdit} />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between items-center my-1 pt-4 px-2 border border-gray-300 text-base">
      <div className="flex flex-col md:flex-row justify-between items-center w-full">
        <Input
          type="text"
          name="title"
          placeholder="title"
          defaultValue={data.title}
          className="w-full md:w-5/6 h-12 md:mr-6 mb-4 md:mb-0 placeholder:capitalize"
          onChange={(e) => {
            const val = e.target.value;
            const field = e.target.name;
            setLabel(val);
            onChange(field, val);
          }}
        />

        <span className="w-full md:w-1/2 flex flex-row items-center">
          <p className="text-lg mr-2">$</p>
          <Input
            type="number"
            name="price"
            pattern="\d*"
            inputMode="numeric"
            placeholder="price"
            defaultValue={data.price}
            className="w-full h-12 placeholder:capitalize"
            onChange={(e) => {
              const val = Number(e.target.value);
              const field = e.target.name;
              setAmount(val);
              onChange(field, val);
            }}
          />
        </span>
      </div>

      <div className="flex flex-row justify-end items-center w-full mt-4 md:mt-2">
        <Button
          className="text-sm text-blue-600 underline"
          onClick={() => onDelete(data.id)}
        >
          delete
        </Button>
        <Icon
          as="Point"
          className={twMerge(newInvoice ? "hidden" : "h-3 w-3")}
        />
        <span
          className={twMerge(
            newInvoice ? "hidden" : "flex flex-row items-center"
          )}
        >
          <Button
            className="text-sm text-blue-600 underline"
            onClick={() => onUpdateCharge(label, amount)}
          >
            save
          </Button>
          <Icon as="Point" className="h-3 w-3" />
          <Button
            className="text-sm text-blue-600 underline"
            onClick={toggleEdit}
          >
            cancel
          </Button>
        </span>
      </div>
    </div>
  );
};

export default Charge;
