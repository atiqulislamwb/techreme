import React from 'react';
import {useQuery} from '@tanstack/react-query';

const useSearchResult = searchText => {
  const {data, isLoading, isError, error, refetch} = useQuery({
    queryKey: ['allservices', searchText],
    queryFn: () =>
      fetch(
        `https://parlur-server-techreme.vercel.app/services/allservices?keyword=${searchText}`,
      ).then(res => res.json()),
    // removeAfterUnmount: true,
  });
  const searchResult = data?.data;
  return {searchResult, isLoading, isError, error};
};

export default useSearchResult;
