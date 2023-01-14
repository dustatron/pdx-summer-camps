import { useState } from "react";
import {
  Box,
  Input,
  Button,
  Stack,
  Center,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
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
  placeholder?: string;
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

  return (
    <Box p={5}>
      <Box>
        <Stack direction="row">
          <InputGroup size="md">
            <Input
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={onSearch}>
                Find
              </Button>
            </InputRightElement>
          </InputGroup>
        </Stack>
      </Box>
      <Stack py="5" spacing={2}>
        {results &&
          results.features &&
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
        {results && !results.features && <Center> No Results Found </Center>}
      </Stack>
    </Box>
  );
}

export default AddressSelector;
