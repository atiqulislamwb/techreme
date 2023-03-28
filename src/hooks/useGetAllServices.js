import {useQuery} from '@tanstack/react-query';

const useGetAllServices = () => {
  const {data, isLoading, isError, error, refetch} = useQuery({
    queryKey: ['allservices'],
    queryFn: () =>
      fetch(
        `https://parlur-server-techreme.vercel.app/services/allservices`,
      ).then(res => res.json()),
    // removeAfterUnmount: true,
  });

  return {data, isLoading, isError, error, refetch};
};

export default useGetAllServices;
