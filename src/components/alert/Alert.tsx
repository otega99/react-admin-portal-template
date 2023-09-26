import { useCallback, useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { ActionI, ActionTypes, StateI } from './AlertContext';
import cs from 'classnames';
import './alert.scss';

interface Props extends StateI {
  dispatch: React.Dispatch<ActionI>;
}

const Alert: React.FC<Props> = ({ message, type, dispatch, id, title }) => {
  const [width, setWidth] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    // handleStartTimer();

    const id = setTimeout(() => {
      setWidth((prev) => {
        if (prev < 100) {
          return prev + 1;
        }

        clearInterval(id);
        return prev;
      });
    }, 50);

    setIntervalId(id);

    return () => {
      clearTimeout(id);
    };
  }, [width]);

  const handleStartTimer = () => {
    // const id = setInterval(() => {
    //   setWidth((prev) => {
    //     if (prev < 100) {
    //       return prev + 1;
    //     }

    //     clearInterval(id);
    //     return prev;
    //   });
    // }, 50);

    const id = setTimeout(() => {
      setWidth((prev) => {
        if (prev < 100) {
          return prev + 1;
        }

        clearInterval(id);
        return prev;
      });
    }, 50);

    setIntervalId(id);
  };

  const handleStopTimer = () => {
    clearInterval(intervalId as NodeJS.Timer);
  };

  const handleCloseTimer = useCallback(() => {
    clearInterval(intervalId as NodeJS.Timer);
    setExit(true);
    setTimeout(() => {
      dispatch({
        type: ActionTypes.REMOVE_NOTIFICATION,
        id
      });
    }, 500);
  }, [dispatch, id, intervalId]);

  useEffect(() => {
    if (width === 100) {
      handleCloseTimer();
      setTimeout(() => {
        dispatch({
          type: ActionTypes.REMOVE_NOTIFICATION,
          id
        });
      }, 500);
    }
  }, [width, handleCloseTimer, dispatch, id]);

  const classes = cs('alert', {
    success: type === 'SUCCESS',
    error: type !== 'SUCCESS',
    exit: exit
  });

  return (
    <div onMouseEnter={handleStopTimer} onMouseLeave={handleStartTimer} className={classes}>
      <div className="alert__body">
        <div className="alert__icon">
          {type === 'SUCCESS' && <BsFillCheckCircleFill />}
          {type === 'ERROR' && <MdCancel />}
        </div>
        <div className="alert__info">
          {title && <h3 className="alert__header">{title}</h3>}
          <p className="alert__message">{message}</p>
        </div>
        <div className="alert__close" onClick={handleCloseTimer}>
          <FaTimes />
        </div>
      </div>
      <div
        className="alert__bar"
        style={{
          width: `${width}%`
        }}></div>
    </div>
  );
};

export default Alert;
