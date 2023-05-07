import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useStore } from "store";

import { Icon } from "components/Common/Icon";
import Button from "components/Common/Button";

import LabelDropDown from "components/Modals/Invoice/LabelDropDown";
import CalendarButton from "components/Modals/Invoice/Calendar";
import ChargeComp from "components/Modals/Invoice/Charge";
import Title from "components/Modals/Invoice/Title";

import { formatCurrency } from "services/format";

import { Charge, Invoice, InvoiceStatuses } from "api/types";
import { calculateTotalCost } from "services/calculate";

type ACTION = {
  update: 'update';
  create: 'create';
};

type TYPE = {
  invoice: 'invoice';
  charge: 'charge';
};

type InvoiceModalProps = {
  new?: boolean;
  data?: Invoice;
  closeModal: () => void;
};

const DEFAULT_INVOICE = {
  id: 0,
  charges: [],
  name: "New Invoice",
  status: InvoiceStatuses.draft,
  due_date: new Date().toString(),
};

const InvoiceModal: React.FC<InvoiceModalProps> = (props) => {
  const { data, closeModal } = props;

  const store = useStore();

  const [invoice, setInvoice] = useState<Invoice>(
    {
      ...DEFAULT_INVOICE,
      ...data,
    }
  );

  const [charges, setCharges] = useState<Charge[]>(
    data?.charges as Charge[] ?? []
  );

  const addDraftChargeField = () => {
    const draftCharge = {
      id: charges.length + 1,
      title: "",
      price: 0
    };

    setCharges([...charges, draftCharge]);
  }

  function updateInvoice(input) {
    setInvoice((prev) => ({ ...prev, ...input }));

    if (!props.new) {
      store.createOrUpdateInvoice({ ...invoice, ...input });
    }
  }

  const onDeleteInvoice = (id) => {
    store.deleteInvoice(id);
    closeModal();
  };

  const onSave = () => {
    store.createOrUpdateInvoice({
      ...invoice,
      charges
    });
    closeModal();
  };

  const onDeleteCharge = (invoiceID, chargeID) => {
    const filteredCharges = charges.filter((charge) => {
      return charge.id !== chargeID;
    });

    setCharges(filteredCharges);

    store.removeChargeFromInvoice(invoiceID, chargeID);
  };

  const onUpdateCharge = (charge) => {
    const updateCharges = charges.map(c => {
      if (c.id === charge.id) {
        return charge;
      }

      return c;
    });

    setCharges(updateCharges);
  };

  const onSaveCharge = (invoiceID, charge) => {
    onUpdateCharge(charge);
    store.createOrUpdateChargeOnInvoice(invoiceID, charge);
  };

  const onCancel = () => {
    closeModal();
  };

  const totalCost = calculateTotalCost(charges);

  return (
    <div className="flex flex-col w-full px-6 pt-3">
      <div className="flex flex-row justify-between items-start mb-6">
        <Title
          data={invoice.name}
          onUpdate={(name) => updateInvoice({ name })}
        />
      </div>
      <div className="flex flex-row justify-between items-center mb-8 md:mb-6">
        <CalendarButton
          date={invoice.due_date}
          onSelect={(due_date) => updateInvoice({ due_date })}
        />

        <LabelDropDown
          status={invoice.status}
          onSelect={(status) => updateInvoice({ status })}
        />
      </div>

      <div className="flex flex-col mb-14">
        <span className="flex flex-row justify-between items-center mb-3">
          <p className="text-xl md:text-lg font-semibold">charges</p>
          <p className="text-lg md:text-base mr-4">
            {formatCurrency(totalCost)}
          </p>
        </span>
        <div className="pt-2 mb-1 border-t border-gray-300 h-48 overflow-x-auto">
          {charges.map((charge, idx) => (
            <ChargeComp
              key={idx}
              // @ts-ignore
              data={charge as Charge[]}
              onUpdate={(c) => onUpdateCharge(c)}
              onSave={(c) => onSaveCharge(data?.id, c)}
              onDelete={(chargeID) => onDeleteCharge(data?.id, chargeID)}
              newInvoice={data?.id === undefined}
            />
          ))}
        </div>
        <Button
          rightIcon="Plus"
          className="flex justify-center w-full border-2 border-indigo-600 bg-indigo-600 text-white p-3 mt-1 text-lg md:text-base"
          onClick={() => addDraftChargeField()}
        >
          add charge
        </Button>
      </div>

      <div className="flex flex-row justify-end items-center w-full">
        <Button
          className={twMerge(
            "text-base text-blue-600 underline",
            props.new ? "visible" : "invisible"
          )}
          onClick={onSave}
        >
          save
        </Button>
        <Icon
          as="Point"
          className={twMerge("h-3 w-3", props.new ? "visible" : "invisible")}
        />
        <Button
          className={twMerge(
            "text-base text-blue-600 underline",
            props.new ? "visible" : "invisible"
          )}
          onClick={onCancel}
        >
          cancel
        </Button>
        <Button
          leftIcon="Trash"
          className={twMerge(
            "text-base text-red-600 hover:underline",
            props.new ? "hidden" : ""
          )}
          onClick={() => onDeleteInvoice(data?.id)}
        >
          delete invoice
        </Button>
      </div>
    </div>
  );
};

export default InvoiceModal;
