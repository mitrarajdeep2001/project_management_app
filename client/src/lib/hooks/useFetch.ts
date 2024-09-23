import useSWR from "swr";

// Generic fetcher function
const fetcher = (url: string) =>
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`).then((res) =>
    res.json(),
  );

// Custom hook for fetching data
function useFetch<T>(url: string) {
  const { data, error, isLoading } = useSWR<T>(url, fetcher);

  return {
    data,
    error,
    isLoading,
  };
}

export default useFetch;