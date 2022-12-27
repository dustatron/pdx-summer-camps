import { useState } from "react";
import Map, { useMap } from "react-map-gl";
import Marker from "../components/Marker";
import tempData from "../temp-data.json";
import CampCard from "../components/CampCard";
import type { CardDetails } from "../components/CampCard";
import { Input, Button, Box, Stack, Flex } from "@chakra-ui/react";

type CampData = {
  lat: number;
  lng: number;
  title: string;
  place_id: string;
};

const campList: CampData[] = [];
tempData.forEach((camp) => {
  if (camp.location) {
    campList.push({
      lat: camp.location.lat,
      lng: camp.location.lng,
      title: camp.title,
      place_id: camp.place_id,
    });
  }
});

function List() {
  const { portlandMap } = useMap();
  const [selectedCamp, setSelectedCamp] = useState("");
  const [campFilter, setCampFilter] = useState("");
  const [isShowingDetails, setIsShowingDetails] = useState(false);
  const selectCampFromList = (lat: number, lng: number, place_id: string) => {
    if (place_id === selectedCamp) {
      setSelectedCamp("");
      return;
    }
    setSelectedCamp(place_id);
    if (portlandMap) {
      portlandMap.flyTo({ center: [lng, lat], zoom: 14 });
    }
  };

  const selectCamp = (camp: string) => {
    if (camp === selectedCamp) {
      setSelectedCamp("");
    } else {
      setSelectedCamp(camp);
    }
  };

  const filteredCampList = tempData.filter((camp) => {
    if (campFilter) {
      return !!camp.title.toLowerCase().includes(campFilter.toLowerCase());
    } else {
      return true;
    }
  });

  return (
    <Flex h="calc(92vh)">
      {/* Map */}
      <Box w="50%">
        <Map
          id="portlandMap"
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
          {campList.map((camp) => (
            <Marker
              selectedCamp={selectedCamp}
              key={camp.title}
              lat={camp.lat}
              lng={camp.lng}
              placeId={camp.place_id}
              onSelect={selectCamp}
            />
          ))}
        </Map>
      </Box>
      {/* List */}
      <Stack direction="column" w="50%" h="calc(92vh)">
        {!isShowingDetails && (
          <>
            <Stack direction="row" p="2">
              <Input
                value={campFilter}
                onChange={(e) => setCampFilter(e.target.value)}
                type="text"
                placeholder="Camp Name"
              />
              <Button onClick={() => setCampFilter("")} colorScheme="blue">
                Clear
              </Button>
            </Stack>
            <Flex flexWrap="wrap" h="100%" w="100%" overflow="scroll">
              {filteredCampList.map((camp) => (
                <CampCard
                  selectedCampId={selectedCamp}
                  details={camp as unknown as CardDetails}
                  key={`${camp.title}-btn`}
                  showDetails={() => setIsShowingDetails(true)}
                  onSelect={selectCampFromList}
                />
              ))}
            </Flex>
          </>
        )}
        <Box>
          Details
          <Button onClick={() => setIsShowingDetails(false)}> Back</Button>
        </Box>
      </Stack>
    </Flex>
  );
}

export default List;
