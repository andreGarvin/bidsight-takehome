import { useEffect, useRef, useState } from "react";
import { Menu, Listbox, Transition } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/router";
import { Fragment } from "react";
// import { useStore } from "store";

import Button from "components/Common/Button";
import { Icon } from "components/Common/Icon";
import Modal from "components/Common/Modal";
import Input from "components/Common/Input";

import InvoiceModal from "components/Modals/Invoice";

import { InvoiceStatuses } from "api/types";


const Search = () => {
  const router = useRouter();
  const { search } = router.query;

  const ref = useRef(null);

  const onChange = (search) => {
    if (search) {
      router.push({
        query: {
          search: encodeURI(search),
        }
      });
      return
    }

    router.push({
      query: {},
    });
  }

  const onClearSearch = () => {
    router.push({ query: {} });
    // @ts-ignore
    ref.current.value = "";
  }

  return (
    <div className="h-14 w-[400px] flex flex-row justify-start mr-4">
      <Input
        // @ts-ignore
        ref={ref}
        className="w-full text-lg !rounded-none !border-r-0 placeholder:capitalize focus:border-gray-300 focus:ring-0"
        placeholder="search"
        defaultValue={search}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="flex flex-row items-center border border-gray-300 rounded-l-0 !border-l-0">
        {search ? (
          <Button onClick={onClearSearch}>
            <Icon
              as="CloseOutline"
              className="w-full mx-2 text-indigo-600"
            />
          </Button>
        ) : (
          <Icon as="SearchGlass" className="h-5 w-6 mx-3 text-indigo-600" />
        )}
      </span>
    </div>
  );
}

type FilterDropDownProps = {
  name: string;
  data: { name: string }[];
}

const FilterDropDown: React.FC<FilterDropDownProps> = (props) => {
  const { name, data } = props;

  const router = useRouter();
  const param = router.query[name];

  const [selected, setSelected] = useState(data[0]);

  useEffect(() => {
    if (router.isReady) {
      const [option] = data.filter((opt) => {
        return opt.name === router.query[name];
      });
      setSelected(option || data[0]);
    }
  }, [param]);

  const onChange = (label) => {
    setSelected(label);

    router.push({
      query: {
        ...router.query,
        [name]: label.name,
      },
    });
  };

  return (
    <Listbox value={selected} defaultValue={data[0]} onChange={onChange}>
      <div className="relative mt-1">
        <Listbox.Button className="flex flex-row items-center justify-between w-48 cursor-default rounded-lg bg-white py-2 px-3 mr-4 text-left border border-gray-300 focus:outline-none sm:text-sm h-14">
          <span className="block truncate">{selected.name}</span>
          <Icon as="UpDownChevron" />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {data.map((person, idx) => (
              <Listbox.Option
                key={idx}
                className={({ active }) =>
                  twMerge(
                    "relative cursor-pointer select-none py-2 px-4",
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
                value={person}
              >
                {({ selected }) => (
                  <span className="flex flex-row justify-between group">
                    <span
                      className={twMerge(
                        "block truncate",
                        selected ? "font-medium" : "font-normal"
                      )}
                    >
                      {person.name}
                    </span>
                    {selected ? (
                      <span className=" inset-y-0 left-0 flex items-center pl-3 text-indigo-600 group-hover:text-white">
                        <Icon as="Check" className="h-5 w-5" />
                      </span>
                    ) : null}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

type MoreDropDownProps = {
  data: { title: string, action: () => void }[]
};

const MoreDropDown: React.FC<MoreDropDownProps> = (props) => {
  const { data } = props;
  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button
        as={Button}
        className="md:hidden bg-white mx-2 border rounded border-gray-300 focus:ring-4 focus:ring-gray-300 px-4 py-4 h-14"
      >
        <Icon as="ChevronDown" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-2 py-2">
            {data.map((item) => (
              <Menu.Item
                as={Button}
                key={item.title}
                className="text-gray-600 w-full capitalize justify-between hover:bg-indigo-600 hover:text-white"
                onClick={item.action}
              >
                {item.title}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

const statusesOptions = [
  { name: "all" },
  { name: InvoiceStatuses.draft },
  { name: InvoiceStatuses.paid },
  { name: InvoiceStatuses.outstanding },
];

const Controls: React.FC = () => {
  // const store = useStore();

  // const invoiceNames = Array.from(
  //   new Set(
  //     store.invoices.map((invoice) => {
  //       return invoice.name;
  //     })
  //   )
  // ).map(name => ({ name }));

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  }

  const openModal = () => {
    setIsOpen(true);
  }

  const moreDropDownMenuItems = [
    { title: 'create invoice', action: openModal }
  ]

  return (
    <div className="flex flex-col py-3 my-4">
      <div className="flex flex-row items-center justify-between pb-2">
        <div className="flex flex-row items-center">
          <Search />
          <FilterDropDown name="status" data={statusesOptions} />
        </div>

        <MoreDropDown data={moreDropDownMenuItems} />

        <Button
          className="hidden md:flex w-max bg-indigo-600 text-white focus:ring-2 focus:ring-purple-200 mx-2 px-4 py-3 self-end h-14"
          rightIcon="Plus"
          onClick={openModal}
        >
          create invoice
        </Button>

        <Modal isOpen={isOpen} closeModal={closeModal}>
          <InvoiceModal new closeModal={closeModal} />
        </Modal>
      </div>
      <div className="flex flex-row items-end justify-between">
        {/* {
          invoiceNames.length ?
            <FilterDropDown
              name="title"
              data={[{ name: 'all' }, ...invoiceNames]}
            /> : null
        } */}
      </div>
    </div>
  );
};

export default Controls;
