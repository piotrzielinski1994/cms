import { ComponentProps, useEffect, useRef, useState } from 'react';
import Dialog from './dialog';

type UseDialogParams = {
  initialIsOpen?: boolean;
  type?: ComponentProps<typeof Dialog.Root>['type'];
};

const useDialog = ({ initialIsOpen = false, type = 'dialog' }: UseDialogParams = {}) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current) return;
    if (!isOpen) return dialogRef.current.close();
    if (type === 'dialog') dialogRef.current.show();
    else dialogRef.current.showModal();
    dialogRef.current.focus();
  }, [isOpen, type]);

  return { isOpen, setIsOpen, dialogRef };
};

export { useDialog };
