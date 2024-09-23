import useSWR, { mutate } from "swr";

// Generic fetcher function for PUT or PATCH requests
const updateFetcher = async <T>(url: string, updatedData: T) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`,
    {
      method: "PUT", // You can also use PATCH depending on your API design
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update data");
  }

  return response.json(); // Assuming the API responds with the updated resource
};

// Custom hook for updating data
function useUpdate<T>(url: string) {
  const update = async (updatedData: T) => {
    try {
      // Perform the update request
      const updatedResponse = await updateFetcher<T>(url, updatedData);

      // Mutate the cache with the updated data, but avoid revalidation for now
      mutate(url, updatedResponse, false);

      // Optionally revalidate to ensure data is consistent with the server
      mutate(url);

      return updatedResponse;
    } catch (error) {
      console.error("Failed to update:", error);
      throw error; // Let the component catch the error
    }
  };

  return { update };
}

export default useUpdate;
