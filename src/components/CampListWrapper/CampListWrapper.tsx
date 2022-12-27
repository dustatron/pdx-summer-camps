import { useState } from "react";
import Map, { useMap } from "react-map-gl";
import Marker from "../Marker";
import CampCard from "../CampCard";
import type { CardDetails } from "../CampCard";
import { Input, Button, Box, Stack, Flex } from "@chakra-ui/react";
import { trpc } from "../../utils/trpc";
import CardDetail from "../CardDetail";
import type { Camp } from "@prisma/client";
import { CampDetail } from "../CardDetail/CardDetail";

function CampListWrapper() {
  const { portlandMap } = useMap();
  const [selectedCampId, setSelectedCampId] = useState("");
  const [selectedCamp, setSelectedCamp] = useState<Camp>();
  const [campFilter, setCampFilter] = useState("");
  const [isShowingDetails, setIsShowingDetails] = useState(false);

  const { data: locationData, status: locationStatus } =
    trpc.camps.getAllLocations.useQuery();

  const { data: campData, status: campStatus } =
    trpc.camps.getAllCamps.useQuery();

  const selectCampFromList = (
    lat: number,
    lng: number,
    campId: string,
    campObj: Camp
  ) => {
    console.log("select", lat, lng, campId);

    if (campId === selectedCampId) {
      setSelectedCampId("");
      return;
    }
    setSelectedCampId(campId);
    setSelectedCamp(campObj);

    if (portlandMap) {
      portlandMap.flyTo({ center: [lng, lat], zoom: 14 });
    }
  };

  const selectCamp = (campId: string) => {
    if (campId === selectedCampId) {
      setSelectedCampId("");
    } else {
      const campObj = campData?.find((camp) => camp.id === campId);
      setSelectedCamp(campObj);
      setSelectedCampId(campId);
    }
  };

  const filteredCampList = campData?.filter((camp) => {
    if (campFilter) {
      return camp.title.toLowerCase().includes(campFilter.toLowerCase());
    } else {
      return true;
    }
  });

  return (
    <Flex h="calc(92vh)">
      {/* Map */}
      {locationData && locationStatus === "success" && (
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
            {locationData.map((marker) => (
              <Marker
                selectedCamp={selectedCampId}
                key={marker.id}
                lat={marker.lat}
                lng={marker.lng}
                placeId={marker.campId}
                onSelect={selectCamp}
              />
            ))}
          </Map>
        </Box>
      )}
      {/* List */}
      {campStatus === "success" && locationData && (
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
                {filteredCampList?.map((camp) => {
                  return (
                    <CampCard
                      selectedCampId={selectedCampId}
                      details={camp as unknown as CardDetails}
                      key={`${camp.id}`}
                      showDetails={() => setIsShowingDetails(true)}
                      onSelect={selectCampFromList}
                    />
                  );
                })}
              </Flex>
            </>
          )}
          {isShowingDetails && selectedCamp && (
            <Flex flexWrap="wrap" h="100%" w="100%" overflow="scroll">
              <CardDetail
                onBack={() => setIsShowingDetails(false)}
                campData={selectedCamp as unknown as CampDetail}
              />
            </Flex>
          )}
        </Stack>
      )}
    </Flex>
  );
}

export default CampListWrapper;
