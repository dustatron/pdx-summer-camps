import { Box } from "@chakra-ui/react";
import Map, { NavigationControl } from "react-map-gl";
import Marker from "../Marker";
import React from "react";
import type { Camp } from "@prisma/client";

type Props = {
  campList: Camp[];
  selectedCampId: string;
  selectCampFromList: (campId: string) => void;
};

function MapWrapper({ campList, selectedCampId, selectCampFromList }: Props) {
  return (
    <Box w={"50%"} height="100%">
      <Map
        id="portlandMapDesktop"
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
        <NavigationControl />
        {campList.map((marker) => (
          <Marker
            selectedCampId={selectedCampId}
            key={marker.id}
            lat={marker.lat}
            lng={marker.lng}
            placeId={marker.id}
            setSelectCampId={selectCampFromList}
          />
        ))}
      </Map>
    </Box>
  );
}

export default MapWrapper;
