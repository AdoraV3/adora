import { useQuery } from "@tanstack/react-query";
import { LocationResponse } from "../types";

export const getLocation = async () => {
  const response = await fetch("http://ip-api.com/json");
  // Check if the response is OK and throw an error if not
  if (!response.ok) {
    throw new Error("Failed to fetch location data");
  }
  return response.json();
};

export const useGetLocation = () =>
  useQuery<LocationResponse>({
    queryKey: ["location"],
    queryFn: getLocation,
    staleTime: Infinity,
  });
