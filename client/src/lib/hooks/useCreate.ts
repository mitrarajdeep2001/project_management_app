import { useState } from "react";
import useSWR, { mutate } from "swr";

// Generic fetcher function for POST requests (create data)
const postFetcher = async (url: string, data: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    throw new Error("Error creating data");
  }

  return response.json();
};

// Custom hook for creating data (POST request)
function useCreate<T>(url: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const create = async (newData: T) => {
    setLoading(true);
    setError(null);

    try {
      const createdData = await postFetcher(url, newData);
      mutate(url); // Optionally, update the cache after a successful POST
      setLoading(false);
      return createdData;
    } catch (err) {
      setLoading(false);
      setError(err as Error);
    }
  };

  return {
    create,
    loading,
    error,
  };
}

export default useCreate;
