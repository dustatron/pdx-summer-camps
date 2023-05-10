import React, { useState, useEffect } from "react";
import { useMapboxAPI } from "../Api/useMapboxAPI";
import Map, { NavigationControl } from "react-map-gl";
import Marker from "../../Marker";
import {
  Box,
  Input,
  Button,
  Stack,
  Center,
  InputGroup,
  InputRightElement,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import type { ProviderSchema } from "../../../types/provider";
import { useAlert } from "../../../context/AlertContext";

export type Feature = {
  address?: string;
  center?: string[];
  context?: [];
  geometry: {
    coordinates: number[];
    type: string;
  };
  id: string;
  place_name: string;
  place_type?: string[];
  relevance?: number;
};

const Location = () => {
  const { addAlert } = useAlert();
  const [providedAddressToFind, setProvidedAddressToFind] = useState<string>();
  const [selectedAddress, setSelectedAddress] = useState<Feature>();
  const { data, refetch } = useMapboxAPI(providedAddressToFind);

  const { register, setValue, getValues } = useFormContext<ProviderSchema>();

  useEffect(() => {
    const address = getValues("address");
    const lat = getValues("lat");
    const lng = getValues("lng");
    if (address) {
      setSelectedAddress({
        place_name: address,
        place_type: ["address"],
        id: address,
        geometry: {
          coordinates: [parseFloat(lng), parseFloat(lat)],
          type: "Point",
        },
      });
    }
  }, []);

  const onSelectAddress = (item: Feature) => {
    if (!item) {
      return "";
    }
    setSelectedAddress(item);
    setProvidedAddressToFind("");
    if (item?.geometry?.coordinates[1] && item?.geometry?.coordinates[0]) {
      setValue("address", item.place_name);
      setValue("lat", item?.geometry?.coordinates[1]?.toString());
      setValue("lng", item?.geometry?.coordinates[0]?.toString());
    } else {
      addAlert({
        status: "error",
        title: "ERROR",
        body: "unable to set address",
      });
    }
  };
  console.log("selectedAddress", selectedAddress);
  return (
    <Box p={5}>
      <Box>
        <Stack direction="row">
          <Heading size="sm" p="2">
            Address
          </Heading>
          <InputGroup size="md">
            <Input
              placeholder={
                !selectedAddress
                  ? "Enter your address and select find"
                  : "Enter an new address to try again"
              }
              value={providedAddressToFind}
              onChange={(e) => {
                setProvidedAddressToFind(e.target.value);
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
              onClick={() => onSelectAddress(local)}
              fontSize="16px"
              colorScheme={
                selectedAddress && selectedAddress?.id === local.id
                  ? "facebook"
                  : "gray"
              }
            >
              {local.place_name}
            </Button>
          ))}
        {data && !data.features && <Center> No Results Found </Center>}
      </Stack>
      {selectedAddress && (
        <>
          <Divider m="5" />
          <Heading size="sm"> Selected Address</Heading>
          <Input {...register("address")} isDisabled />
          <Input {...register("lat")} isDisabled />
          <Input {...register("lng")} isDisabled />
          <Box w={"100vw"} height="50vw">
            <Map
              id="portlandMapMobile"
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
              initialViewState={{
                longitude: -122.68294,
                latitude: 45.56627,
                zoom: 10,
              }}
              style={{ width: "100%", height: "100%" }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              boxZoom
            >
              <Marker
                selectedCampId={selectedAddress.id}
                key={selectedAddress.id}
                lat={selectedAddress.geometry.coordinates[1]!}
                lng={selectedAddress.geometry.coordinates[0]!}
                placeId={selectedAddress.place_name}
                setSelectCampId={() => {
                  return;
                }}
              />
              <NavigationControl />
            </Map>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Location;
