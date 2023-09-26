import React, { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { DialogContainer } from './components';

export interface DialogProps {
  children: ReactNode;
  state: boolean;
  handleClose: () => void;
  header?: string;
  removeHead?: boolean;
  disableOverlayClick?: boolean;
  removeCloseBtn?: boolean;
}

const Dialog: React.FC<DialogProps> = ({
  children,
  handleClose,
  state,
  removeHead,
  header,
  disableOverlayClick,
  removeCloseBtn
}) => {
  const [isModalDivRendered, setIsModalDivRendered] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(true);

  // effect to add the modal element to the dom
  useEffect(() => {
    if (document.getElementById('modal')) {
      setIsModalDivRendered(true);
    } else {
      const modalDiv = document.createElement('div');
      modalDiv.id = 'modal';
      document.body.appendChild(modalDiv);
      setIsModalDivRendered(true);
    }
  }, []);

  // effect to time unmount
  useEffect(() => {
    let timer: NodeJS.Timer;

    if (!state) {
      timer = setTimeout(() => {
        setIsUnmounted(true);
      }, 300);
    } else {
      setIsUnmounted(false);
    }

    return () => clearTimeout(timer);
  }, [state]);

  // effect to remove scroll from body when modal is shown
  useEffect(() => {
    if (state && isModalDivRendered && !isUnmounted) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.removeAttribute('style');
    }
  }, [state, isModalDivRendered, isUnmounted]);

  return isModalDivRendered && !isUnmounted
    ? createPortal(
        <>
          <DialogContainer
            disableOverlayClick={disableOverlayClick}
            state={state}
            handleClose={handleClose}
            header={header}
            removeHead={removeHead}
            removeCloseBtn={removeCloseBtn}>
            {children}
          </DialogContainer>
        </>,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.getElementById('modal')!
      )
    : null;
};

export default Dialog;
