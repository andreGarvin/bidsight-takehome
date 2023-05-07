import { Dialog, Transition } from "@headlessui/react";
import { Fragment, PropsWithChildren } from "react";

import Button from "components/Common/Button";
import { Icon } from "./Icon";

type ModalProps = PropsWithChildren & {
  isOpen: boolean;
  closeModal: () => void;
};

const Modal: React.FC<ModalProps> = (props) => {
  const { isOpen, closeModal } = props;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto min-h-full">
          <div className="flex items-center justify-center mt-40 p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full min-w-xl max-w-2xl transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all flex flex-col justify-center items-center">
                <Button className="self-end mb-2" onClick={closeModal}>
                  <Icon as="CloseOutline" />
                </Button>
                {props.children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
