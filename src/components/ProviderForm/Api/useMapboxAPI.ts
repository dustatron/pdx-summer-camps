import { useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useAlert } from "../../../context/AlertContext";
const API_MAPBOX = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;

export type Feature = {
  address: string;
  center: string[];
  context: [];
  geometry: {
    coordinates: number[];
    tye: string;
  };
  id: string;
  place_name: string;
  place_type: string[];
  relevance: number;
};




export const useMapboxAPI = (providedAddress?: string) => {
  const toast = useToast()


  const fetcher = async () => {
    if (providedAddress) {
      const encodedAddress = encodeURI(providedAddress);
      const response = await fetch(
        `${API_MAPBOX}/${encodedAddress}.json?types=address&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`
      );
      const data = await response.json();
      return data;
    }
  };

  return useQuery({
    queryKey: ["provider", "address", providedAddress],
    enabled: false,
    queryFn: fetcher,
    onError: (err: Error) => {
      toast({
        title: `Unresolved address: ${err.message}`,
        status: "error",
        isClosable: true,
        position: "top",
      });

    }
  });
}