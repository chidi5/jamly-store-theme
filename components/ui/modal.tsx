"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import React, { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className="sm:!max-w-3xl">
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
