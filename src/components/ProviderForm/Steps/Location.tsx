import React, { useState } from "react";
import { useMapboxAPI } from "../Api/useMapboxAPI";
import {
  Box,
  Input,
  Button,
  Stack,
  Center,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import type { ProviderSchema } from "../../../types/provider";

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

const Location = () => {
  const [providedAddress, setProvidedAddress] = useState<string>();
  const [select, setSelect] = useState<Feature>();
  const { data, status, refetch } = useMapboxAPI(providedAddress);

  const { register, setValue } = useFormContext<ProviderSchema>();

  const addAddress = (item: Feature) => {
    setSelect(item);
    console.log("item", item);
    setValue("address", item.place_name);
    setValue("lat", item.geometry.coordinates[1]?.toString());
    setValue("lng", item.geometry.coordinates[0]?.toString());
  };
  console.log("data", data);

  return (
    <Box p={5}>
      <Input {...register("address")} isDisabled /> - address
      <Input {...register("lat")} isDisabled /> - lat
      <Input {...register("lng")} isDisabled /> - lng
      <Box>
        <Stack direction="row">
          <InputGroup size="md">
            <Input
              value={providedAddress}
              onChange={(e) => {
                setProvidedAddress(e.target.value);
              }}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => refetch()}>
                Find
              </Button>
            </InputRightElement>
          </InputGroup>
        </Stack>
      </Box>
      <Stack py="5" spacing={2}>
        {data &&
          data.features &&
          data.features.map((local: any) => (
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
        {status === "loading" && <>...loading</>}
        {data && !data.features && <Center> No Results Found </Center>}
      </Stack>
    </Box>
  );
};

export default Location;
