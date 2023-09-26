import React from 'react';
import cs from 'classnames';
import './dialogContainer.scss';
import { DialogProps } from '../../index';
import Text from 'components/text';

const DialogContainer: React.FC<DialogProps> = ({
  children,
  handleClose,
  state,
  disableOverlayClick,
  removeCloseBtn,
  header,
  removeHead
}) => {
  const overlayClasses = cs('dialogContainer__overlay', {
    remove: !state
  });

  const containerClasses = cs('dialogContainer__container', {
    remove: !state,
    removeHead: removeHead
  });

  //   if (typeof children === "function") {
  //     return (
  //         {({handleClose, state}) => (
  //           <FormikForm {...formProps}>{children(formikProps)}</FormikForm>
  //         )}
  //     );
  //   }

  //   const funcValues = {
  //     handleClose,
  //     state,
  //   };

  return (
    <div className="dialogContainer">
      <div className={overlayClasses} onClick={disableOverlayClick ? () => null : handleClose} />
      <div className={containerClasses}>
        {!removeCloseBtn && (
          <button onClick={handleClose} className="dialogContainer__closeIcon">
            x
          </button>
        )}
        {!removeHead && (
          <div className="dialogContainer__head">
            <Text as="h5" variant="h6">
              {header}
            </Text>
            <button onClick={handleClose} className="dialogContainer__closeIcon">
              x
            </button>
          </div>
        )}

        {/* {typeof children === "function" ? (funcValues) => children : children} */}
        {children}
      </div>
    </div>
  );
};

export default DialogContainer;
