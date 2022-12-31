import { useState } from "react";
import { Box, Input, Button, Stack } from "@chakra-ui/react";
const api = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;

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

type GeoCodeResult = {
  attribution: "string";
  features: Feature[];
  query: string[];
};

function AddressSelector({
  onSelectAddress,
}: {
  onSelectAddress: (location: Feature) => void;
}) {
  const [address, setAddress] = useState("");
  const [results, setResults] = useState<GeoCodeResult>();
  const [select, setSelect] = useState<Feature>();

  const onSearch = () => {
    const encodedAddress = encodeURI(address);
    fetch(
      `${api}/${encodedAddress}.json?types=address&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`
    )
      .then((result) => result.json())
      .then((data) => setResults(data));
  };

  const addAddress = (item: Feature) => {
    setSelect(item);
    onSelectAddress(item);
  };

  console.log("results", select);
  return (
    <Box p={5}>
      <Box>
        <Stack direction="row">
          <Input
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <Button onClick={onSearch}>Find</Button>
        </Stack>
      </Box>
      <Stack py="5" spacing={2}>
        {results &&
          results.features.map((local) => (
            <Button
              key={local.id}
              onClick={() => addAddress(local)}
              fontSize="16px"
              colorScheme={
                select && select.id === local.id ? "facebook" : "gray"
              }
            >
              {local.place_name}
            </Button>
          ))}
      </Stack>
    </Box>
  );
}

export default AddressSelector;
