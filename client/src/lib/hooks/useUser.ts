import useSWR from "swr";

// Generic fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Custom hook for fetching user data
function useUser(id: string) {
  const { data, error, isLoading } = useSWR(`/api/user/${id}`, fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
  };
}

export default useUser;