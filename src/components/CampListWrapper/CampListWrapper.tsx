import { useReducer } from "react";
import Map, { NavigationControl, Popup, useMap } from "react-map-gl";
import Marker from "../Marker";
import {
  Box,
  Stack,
  Flex,
  Spinner,
  Center,
  useMediaQuery,
} from "@chakra-ui/react";
import { trpc } from "../../utils/trpc";
import type { Camp } from "@prisma/client";
import type { MultiSelectOption } from "../../types/camp";
import { filterCampList } from "../../utils/filterCampList";
import CampListDesktop from "./CampListDesktop";
import { getTagOptions } from "./utils";

export type FilterState = {
  selectedCamp?: Camp;
  selectedCampId: string;
  campNameFilter: string;
  ageSelected: MultiSelectOption[];
  quadrantSelected: MultiSelectOption[];
  isShowingDetails: boolean;
  tagsSelected: MultiSelectOption[];
};

export type Action = {
  type:
    | "setSelectedCampId"
    | "unsetCampId"
    | "setSelectedCamp"
    | "showingDetailsFalse"
    | "showingDetailsTrue"
    | "setCampNameFilter"
    | "setAgeSelected"
    | "setQuadrantSelected"
    | "setTagsSelected"
    | "clearAllFilters";
  payload?:
    | string
    | string[]
    | Camp
    | MultiSelectOption[]
    | boolean
    | undefined;
};

const initialState: FilterState = {
  selectedCampId: "",
  campNameFilter: "",
  ageSelected: [],
  quadrantSelected: [],
  tagsSelected: [],
  isShowingDetails: false,
};

const reducer = (prevState: FilterState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case "setSelectedCampId":
      return { ...prevState, selectedCampId: payload } as FilterState;
    case "unsetCampId":
      return { ...prevState, selectedCampId: "" } as FilterState;
    case "setSelectedCamp":
      return { ...prevState, selectedCamp: payload } as FilterState;

    case "showingDetailsFalse":
      return {
        ...prevState,
        isShowingDetails: false,
      } as FilterState;
    case "showingDetailsTrue":
      return {
        ...prevState,
        isShowingDetails: true,
      } as FilterState;

    case "setCampNameFilter":
      return { ...prevState, campNameFilter: payload } as FilterState;
    case "setAgeSelected":
      return { ...prevState, ageSelected: payload } as FilterState;
    case "setQuadrantSelected":
      return { ...prevState, quadrantSelected: payload } as FilterState;
    case "setTagsSelected":
      return { ...prevState, tagsSelected: payload } as FilterState;

    case "clearAllFilters":
      return {
        ...prevState,
        tagsSelected: [],
        quadrantSelected: [],
        ageSelected: [],
      } as FilterState;

    default:
      return prevState;
  }
};

function CampListWrapper() {
  const { portlandMap } = useMap();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [filterState, dispatch] = useReducer(reducer, initialState);

  const { data: campData, status: campStatus } =
    trpc.camps.getAllCamps.useQuery();

  const selectCampFromList = (campId: string) => {
    if (campId === filterState.selectedCampId) {
      dispatch({ type: "unsetCampId" });
    } else {
      const campObj = campData?.find((camp) => camp.id === campId);
      dispatch({ type: "setSelectedCampId", payload: campId });
      dispatch({ type: "setSelectedCamp", payload: campObj as Camp });
      if (portlandMap && campObj) {
        portlandMap?.flyTo({ center: [campObj.lng, campObj.lat], zoom: 12 });
      }
    }
  };

  const filteredCampList = filterCampList(filterState, campData);

  const tagOptions = getTagOptions(campData);
  const screenHight = "calc(92vh)";
  return (
    <Flex h={screenHight}>
      {campStatus === "loading" && (
        <Center padding="3" mt="5" w="100%">
          <Spinner size="lg" />
        </Center>
      )}
      {/* Map */}
      {campData && campStatus === "success" && (
        <Box w={{ base: "100%", lg: "50%" }}>
          {isMobile && <Box> Filters </Box>}
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
            <NavigationControl />
            {filteredCampList.map((marker) => (
              <Marker
                selectedCampId={filterState.selectedCampId}
                key={marker.id}
                lat={marker.lat}
                lng={marker.lng}
                placeId={marker.id}
                setSelectCampId={selectCampFromList}
              />
            ))}
            {filterState.selectedCamp && filterState.selectedCampId && (
              <Popup
                latitude={filterState.selectedCamp.lat}
                longitude={filterState.selectedCamp?.lng}
                onClose={() => selectCampFromList("")}
                closeOnClick={false}
              >
                <div className="text-center">
                  <h2 className="px-4">{filterState.selectedCamp.title}</h2>
                  <h3 className="px-4">
                    {filterState.selectedCamp.address.substr(0, 30)}
                  </h3>
                </div>
              </Popup>
            )}
          </Map>
        </Box>
      )}
      {/* List */}
      {campStatus === "success" && campData && !isMobile && (
        <Stack direction="column" w={{ base: "50%" }} h={screenHight}>
          <CampListDesktop
            filterState={filterState}
            filteredCampList={filteredCampList}
            selectCampFromList={selectCampFromList}
            tagOptions={tagOptions}
            dispatch={dispatch}
          />
        </Stack>
      )}
    </Flex>
  );
}

export default CampListWrapper;
