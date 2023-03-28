import {useQuery} from '@tanstack/react-query';

const useGetSingleServices = id => {
  const {data, isLoading, isError, error, refetch} = useQuery({
    queryKey: ['single-service', id],
    queryFn: () =>
      fetch(
        `https://parlur-server-techreme.vercel.app/services/single-service/${id}`,
      ).then(res => res.json()),
    // removeAfterUnmount: true,
  });
  const singleService = data?.data;
  return {singleService, isLoading, isError, error};
};

export default useGetSingleServices;
