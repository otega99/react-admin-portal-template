import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface OptionsI {
  queryName?: string;
  updateFromQuery?: boolean;
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const usePaginationBackend = ({ queryName = 'page', updateFromQuery }: OptionsI) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromQuery = searchParams.get(queryName);
  const [page, setPage] = useState(Number(pageFromQuery) || 1);

  useEffect(() => {
    if (page && !updateFromQuery) {
      setSearchParams({
        page: page.toString()
      });
    }

    if (updateFromQuery) {
      setPage(Number(pageFromQuery));
    }
  }, [page, pageFromQuery, updateFromQuery]);

  const handlePageRoute = (arg: number) => {
    setPage(arg);
  };

  return {
    handlePageRoute,
    page
  };
};

export default usePaginationBackend;
