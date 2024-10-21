import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Trial } from './types';

interface MoreInfoProps {
  trial: Trial | null;
  open: boolean;
  onClose: () => void;
}

export const MoreInfo: React.FC<MoreInfoProps> = ({ trial, open, onClose }) => (
  <Dialog as="div" className="relative z-10" open={open} onClose={onClose}>
    <div className="bg-black bg-opacity-30 fixed inset-0" />
    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
      <DialogPanel className="flex flex-col space-y-8 items-center justify-center bg-white p-12 border w-3/4 rounded-md">
        <DialogTitle className="font-bold justify-between flex border-b pb-3">
          {trial?.protocolSection.identificationModule.officialTitle}
          <XMarkIcon className="h-8 w-8 cursor-pointer" onClick={onClose} />
        </DialogTitle>
        <span className="font-mono text-sm">
          {trial?.protocolSection.identificationModule.nctId}
        </span>
      </DialogPanel>
    </div>
  </Dialog>
);
