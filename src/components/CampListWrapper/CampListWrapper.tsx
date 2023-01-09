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
  Button,
  Input,
} from "@chakra-ui/react";
import { trpc } from "../../utils/trpc";
import type { Camp } from "@prisma/client";
import type { MultiSelectOption } from "../../types/camp";
import { filterCampList } from "../../utils/filterCampList";
import CampList from "./CampList";
import { getTagOptions } from "./utils";
import type { CardDetails } from "../CampCard";
import CampCard from "../CampCard";
import type { CampDetail } from "../CardDetail/CardDetail";
import CardDetail from "../CardDetail/CardDetail";
import FilterBox from "../FilterBox";
import { TriangleDownIcon } from "@chakra-ui/icons";

export type FilterState = {
  selectedCamp?: Camp;
  selectedCampId: string;
  campNameFilter: string;
  ageSelected: MultiSelectOption[];
  quadrantSelected: MultiSelectOption[];
  isShowingDetails: boolean;
  tagsSelected: MultiSelectOption[];
  isShowingMobileList: boolean;
  isFilterShowing: boolean;
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
    | "clearAllFilters"
    | "toggleFilterShow"
    | "toggleMobileList";
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
  isShowingMobileList: false,
  isFilterShowing: false,
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

    case "toggleFilterShow":
      return {
        ...prevState,
        isFilterShowing: !prevState.isFilterShowing,
      } as FilterState;

    case "toggleMobileList":
      return {
        ...prevState,
        isShowingMobileList: !prevState.isShowingMobileList,
      } as FilterState;

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
    <Stack direction={isMobile ? "column" : "row"} h={screenHight}>
      {campStatus === "loading" && (
        <Center padding="3" mt="5" w="100%">
          <Spinner size="lg" />
        </Center>
      )}

      {/* Map */}
      {isMobile && (
        <Stack direction="row" p="2">
          <Button
            onClick={() => dispatch({ type: "toggleMobileList" })}
            colorScheme={
              filterState.isShowingMobileList ? "messenger" : "facebook"
            }
          >
            {filterState.isShowingMobileList ? "Map" : "List"}
          </Button>
          <Input
            value={filterState.campNameFilter}
            onChange={(e) =>
              dispatch({ type: "setCampNameFilter", payload: e.target.value })
            }
          />
          <Button
            onClick={() => dispatch({ type: "setCampNameFilter", payload: "" })}
            colorScheme="linkedin"
          >
            X
          </Button>
          <Button
            onClick={() => dispatch({ type: "toggleFilterShow" })}
            variant="ghost"
          >
            <TriangleDownIcon
              ml=".5"
              transform={filterState.isFilterShowing ? "" : "rotate(-90deg)"}
            />
            Filters
          </Button>
        </Stack>
      )}
      {filterState.isFilterShowing && isMobile && (
        <Center>
          <FilterBox
            isMobile={isMobile}
            filterOptions={tagOptions}
            ageSelected={filterState.ageSelected}
            quadrantSelected={filterState.quadrantSelected}
            setAgeSelected={(value: MultiSelectOption[]) =>
              dispatch({ type: "setAgeSelected", payload: value })
            }
            setQuadrantSelected={(value: MultiSelectOption[]) =>
              dispatch({ type: "setQuadrantSelected", payload: value })
            }
            setTagsSelected={(value: MultiSelectOption[]) =>
              dispatch({ type: "setTagsSelected", payload: value })
            }
            clearAll={() => dispatch({ type: "clearAllFilters" })}
            tagsSelected={filterState.tagsSelected}
          />
        </Center>
      )}
      {campData && campStatus === "success" && (
        <Box w={isMobile ? "100%" : "50%"} height="100%">
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
          </Map>
        </Box>
      )}
      {/* Mobile Camp details card */}
      {filterState.selectedCampId &&
        isMobile &&
        !filterState.isShowingMobileList && (
          <Box position="absolute" bottom={0}>
            <CampCard
              isMobile={isMobile}
              details={filterState.selectedCamp as unknown as CardDetails}
              selectedCampId={filterState.selectedCampId}
              onSelect={(campId: string) =>
                dispatch({ type: "setSelectedCampId", payload: campId })
              }
              showDetails={() => dispatch({ type: "showingDetailsTrue" })}
            />
          </Box>
        )}
      {/* Desktop List */}
      {campStatus === "success" &&
        campData &&
        !isMobile &&
        !filterState.isShowingDetails && (
          <Stack direction="column" w="50%" h={screenHight}>
            <CampList
              isMobile={isMobile}
              filterState={filterState}
              filteredCampList={filteredCampList}
              selectCampFromList={selectCampFromList}
              tagOptions={tagOptions}
              dispatch={dispatch}
              setIsShowFilter={() => dispatch({ type: "toggleFilterShow" })}
            />
          </Stack>
        )}
      {/* Mobile List */}
      {campStatus === "success" &&
        campData &&
        isMobile &&
        filterState.isShowingMobileList && (
          <Stack direction="column" w={"100%"} h={screenHight}>
            <CampList
              isMobile={isMobile}
              filterState={filterState}
              filteredCampList={filteredCampList}
              selectCampFromList={selectCampFromList}
              tagOptions={tagOptions}
              dispatch={dispatch}
              setIsShowFilter={() => dispatch({ type: "toggleFilterShow" })}
            />
          </Stack>
        )}

      {/* // Desktop card detail  */}
      {filterState.isShowingDetails &&
        filterState.selectedCamp &&
        !filterState.isShowingMobileList && (
          <Flex
            flexWrap="wrap"
            h="100%"
            w={{ sm: "100%", md: "50%" }}
            overflow="scroll"
          >
            <CardDetail
              onBack={() => dispatch({ type: "showingDetailsFalse" })}
              campData={filterState.selectedCamp as unknown as CampDetail}
            />
          </Flex>
        )}
    </Stack>
  );
}

export default CampListWrapper;
