import { useEffect, useState } from 'react';

interface OptionsI<T> {
  data: T[];
  initialPageNumber?: number;
  postsPerPage?: number;
}

const usePagination = <T>(options: OptionsI<T>) => {
  const { data, initialPageNumber = 1, postsPerPage = 10 } = options;

  const [currentPage, setCurrentPage] = useState(initialPageNumber);
  const [numOfPagePosts] = useState(postsPerPage);
  const [currentCount, setCurrentCount] = useState(0);

  const indexOfLastPost = currentPage * numOfPagePosts;
  const indexOfFirstPost = indexOfLastPost - numOfPagePosts;
  const slicedPosts = data?.slice(indexOfFirstPost, indexOfLastPost);

  const dataLength = data.length;

  useEffect(() => {
    let currentTotal = currentPage * numOfPagePosts;

    if (currentTotal > dataLength) {
      currentTotal = dataLength;

      setCurrentCount(currentTotal);
    } else {
      setCurrentCount(currentTotal);
    }
  }, [currentPage, numOfPagePosts, dataLength]);
  return {
    slicedPosts,
    currentPage,
    setCurrentPage,
    numOfPagePosts,
    dataLength,
    currentCount
  };
};

export default usePagination;
