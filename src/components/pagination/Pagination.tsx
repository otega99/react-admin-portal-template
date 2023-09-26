import { useMedia } from 'hooks';
import { useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import './pagination.scss';

interface Props {
  currentPage: number;
  dataLength: number;
  postsPerPage?: number;
  displayedBtns?: number;
  currentPageFunc: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  currentPageFunc,
  dataLength,
  postsPerPage = 10,
  displayedBtns = 5
}) => {
  const pageNumbers = [];
  const mappedBtnsNumbers = [];
  const { isMobile } = useMedia();

  displayedBtns = isMobile ? 3 : displayedBtns;

  const highestNumber = Math.ceil(dataLength / postsPerPage);

  for (let i = 1; i <= highestNumber; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const paginationIcons = document.querySelectorAll('.pagination__page');

    for (let i = 0; i < paginationIcons.length; i++) {
      paginationIcons[i].classList.remove('active');

      if (Number(paginationIcons[i].innerHTML) === currentPage) {
        paginationIcons[i].classList.add('active');
      }
    }
  }, [currentPage]);

  const handlePagination = (e: React.MouseEvent<HTMLElement>, pageNumber: number) => {
    currentPageFunc(pageNumber);

    const paginationIcons = document.querySelectorAll('.pagination__page');

    paginationIcons.forEach((icon) => {
      icon.classList.remove('active');
    });

    e.currentTarget.classList.add('active');
  };

  const nextPagination = () => {
    if (currentPage === highestNumber) {
      return currentPageFunc((current: number) => current + 0);
    }
    currentPageFunc((current: number) => current + 1);

    const paginationIcons = document.querySelectorAll('.pagination__page');

    for (let i = 0; i < paginationIcons.length; i++) {
      paginationIcons[i].classList.remove('active');

      if (Number(paginationIcons[i].innerHTML) === currentPage + 1) {
        paginationIcons[i].classList.add('active');
      }
    }
  };

  const prevPagination = () => {
    if (currentPage <= 1) {
      return currentPageFunc((current: number) => current - 0);
    }
    currentPageFunc((current: number) => current - 1);

    const paginationIcons = document.querySelectorAll('.pagination__page');

    for (let i = 0; i < paginationIcons.length; i++) {
      paginationIcons[i].classList.remove('active');

      if (Number(paginationIcons[i].innerHTML) === currentPage - 1) {
        paginationIcons[i].classList.add('active');
      }
    }
  };

  const handlePaginate = (num: number) => {
    currentPageFunc(num);
  };

  let maxLeft = currentPage - Math.floor(displayedBtns / 2);
  let maxRight = currentPage + Math.floor(displayedBtns / 2);

  if (maxLeft < 1) {
    maxLeft = 1;
    maxRight = displayedBtns;
  }

  if (maxRight > highestNumber) {
    maxRight = highestNumber;

    maxLeft = highestNumber - (displayedBtns - 1);

    if (maxLeft < 1) {
      maxLeft = 1;
    }
  }

  for (let i = maxLeft; i <= maxRight; i++) {
    mappedBtnsNumbers.push(i);
  }

  return (
    <div className="pagination">
      <div className="pagination__prev" onClick={() => handlePaginate(1)}>
        <span className="pagination__nextText">
          <FiChevronsLeft />
        </span>
      </div>
      <div className="pagination__prev" onClick={prevPagination}>
        <span className="pagination__nextText">
          <FiChevronLeft />
        </span>
      </div>
      {!mappedBtnsNumbers.includes(1) && (
        <>
          {/* <div
            onClick={(e) => handlePaginate(1)}
            className={`pagination__page ss-cursor-pointer ss-py-2 ss-px-4 ss-rounded`}
            // datanumber={number}
          >
            1
          </div> */}
          <div className="pagination__dot">
            <span className="pagination__dotSpan">...</span>
          </div>
        </>
      )}
      {mappedBtnsNumbers !== undefined &&
        mappedBtnsNumbers.map((number) => {
          return (
            <div
              onClick={(e) => handlePagination(e, number)}
              key={number}
              className={`pagination__page ${number === 1 ? 'active' : ''} `}
              // datanumber={number}
            >
              {number}
            </div>
          );
        })}
      {!mappedBtnsNumbers.includes(highestNumber) && (
        <>
          <div className="pagination__dot">
            <span className="pagination__dotSpan">...</span>
          </div>
          {/* <div
            onClick={(e) => handlePaginate(highestNumber)}
            className={`pagination__page ss-cursor-pointer ss-py-2 ss-px-4 ss-rounded`}
            // datanumber={number}
          >
            {highestNumber}
          </div> */}
        </>
      )}
      <div className="pagination__next" onClick={nextPagination}>
        <span className="pagination__nextText">
          <FiChevronRight />
        </span>
      </div>
      <div className="pagination__next" onClick={() => handlePaginate(highestNumber)}>
        <span className="pagination__nextText">
          <FiChevronsRight />
        </span>
      </div>
    </div>
  );
};

export default Pagination;
