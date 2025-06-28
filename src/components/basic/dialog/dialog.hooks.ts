import { useEffect, useRef, useState } from 'react';

const useDialog = (initialIsOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current) return;
    if (isOpen) {
      dialogRef.current.showModal();
      dialogRef.current.focus();
    } else {
      dialogRef.current.close();
    }
  }, [isOpen]);

  return { isOpen, setIsOpen, dialogRef };
};

export { useDialog };
