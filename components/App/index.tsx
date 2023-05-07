import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useStore } from "store";

import InvoiceModal from "components/Modals/Invoice";
import Controls from "components/App/Controls";
import Modal from "components/Common/Modal";
import Layout from "components/App/Layout";
import Table from 'components/Table';

import { GetInvoices } from "api/query";
import { Invoice } from "api/types";


const queryInvoices = (invoices: Invoice[], params: ParsedUrlQuery) => {
  const { search, status, title } = params;

  let filteredInvoices = invoices;

  // #TODO: work on this one
  if (Object.keys(params).length) {
    if (status !== "all" && status) {
      filteredInvoices = filteredInvoices.filter((invoice) => {
        return invoice.status === (status as string);
      });
    }

    if (!search && title) {
      if (title !== 'all') {
        filteredInvoices = filteredInvoices.filter((invoice) => {
          return invoice.name === (title as string);
        });
      }
    }

    if (!title && search) {
      const text = search as string;
      const regexSearch = new RegExp(text, "gi");

      filteredInvoices = filteredInvoices.filter((invoice) => {
        return invoice.name.match(regexSearch);
      });
    }
  }

  return filteredInvoices;
}

const Home: React.FC = () => {
  const router = useRouter();
  const store = useStore();

  const [selectedInvoice, setSelectedInvoice] = useState<Invoice>();
  const [isOpen, setIsOpen] = useState(false);

  const {
    isLoading,
    data = [],
    isFetching,
  } = useQuery<Invoice[]>({
    queryKey: ["GetInvoices"],
    queryFn: GetInvoices,
  });

  useEffect(() => {
    if (!isLoading) {
      store.setInvoices(data);
    }
  }, [isLoading]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function selectInvoice(invoices: Invoice[]) {
    return (id: number) => {
      const [invoice] = invoices.filter((invoice) => {
        return invoice.id === id;
      });
      setSelectedInvoice(invoice);
      openModal();
    };
  }

  const invoices = queryInvoices(store.invoices, router.query);

  return (
    <Layout>
      <div className="bg-white h-full">
        <Controls />
        <Table
          data={invoices}
          onSelect={selectInvoice(store.invoices)}
          loading={isLoading && isFetching}
        />
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <InvoiceModal
            data={selectedInvoice as Invoice}
            closeModal={closeModal}
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default Home;
