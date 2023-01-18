import { useReducer } from "react";
import { useMap } from "react-map-gl";

import {
  Stack,
  Flex,
  Spinner,
  Center,
  useMediaQuery,
  Button,
  Input,
  Icon,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { trpc } from "../../utils/trpc";
import type { Camp } from "@prisma/client";
import type { CampDetailFromAPI, MultiSelectOption } from "../../types/camp";
import { filterCampList } from "../../utils/filterCampList";
import CampList from "./CampList";
import { getTagOptions, nextCamp } from "./utils";
import CardDetail from "../CardDetail/CardDetail";
import FilterBox from "../FilterBox";
import { TriangleDownIcon } from "@chakra-ui/icons";
import reducer, { initialState } from "./reducer";
import MapDeskTopWrapper from "../MapDeskTopWrapper";
import MapMobileWrapper from "../MapMobileWrapper";
import CampCardMobile from "../CampCardMobile";
import { AiOutlineClose } from "react-icons/ai";

function CampListWrapper() {
  const { portlandMapDesktop, portlandMapMobile } = useMap();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [filterState, dispatch] = useReducer(reducer, initialState);

  const { data: campData, status: campStatus } =
    trpc.camps.getAllCamps.useQuery();

  const filteredCampList = filterCampList(filterState, campData);

  const selectCampFromList = (campId: string) => {
    if (campId === filterState.selectedCampId) {
      dispatch({ type: "unsetCampId" });
    } else {
      const campObj = campData?.find((camp) => camp.id === campId);
      dispatch({ type: "setSelectedCampId", payload: campId });
      dispatch({ type: "setSelectedCamp", payload: campObj as Camp });
      if (portlandMapDesktop && campObj && !isMobile) {
        portlandMapDesktop?.flyTo({
          center: [campObj.lng, campObj.lat],
          zoom: 12,
        });
      }
      if (portlandMapMobile && campObj && isMobile) {
        portlandMapDesktop?.flyTo({
          center: [campObj.lng, campObj.lat],
          zoom: 12,
        });
      }
    }
  };

  const canRender = campData && campStatus === "success";

  const tagOptions = getTagOptions(campData);
  return (
    <Stack spacing={0} direction={isMobile ? "column" : "row"} h={"100%"}>
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
          <InputGroup size="md">
            <Input
              placeholder="Search by name"
              value={filterState.campNameFilter}
              onChange={(e) =>
                dispatch({ type: "setCampNameFilter", payload: e.target.value })
              }
            />
            <InputRightElement width="4rem">
              {filterState.campNameFilter && (
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() =>
                    dispatch({ type: "setCampNameFilter", payload: "" })
                  }
                >
                  <Icon as={AiOutlineClose} size="md" />
                </Button>
              )}
            </InputRightElement>
          </InputGroup>
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
      {/* Mobile Camp details card */}
      {filterState.selectedCampId &&
        isMobile &&
        !filterState.isShowingMobileList && (
          <CampCardMobile
            filterState={filterState}
            selectedCamp={
              filterState.selectedCamp as unknown as CampDetailFromAPI
            }
            next={() =>
              nextCamp(
                "down",
                filteredCampList,
                filterState,
                portlandMapMobile,
                dispatch
              )
            }
            prev={() =>
              nextCamp(
                "up",
                filteredCampList,
                filterState,
                portlandMapMobile,
                dispatch
              )
            }
          />
        )}
      {campStatus === "loading" && (
        <Center padding="3" mt="5" w="100%">
          <Spinner size="lg" />
        </Center>
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
      {!isMobile && canRender && (
        <MapDeskTopWrapper
          campList={filteredCampList}
          selectCampFromList={selectCampFromList}
          selectedCampId={filterState.selectedCampId}
        />
      )}
      {isMobile && canRender && (
        <MapMobileWrapper
          campList={filteredCampList}
          selectCampFromList={selectCampFromList}
          selectedCampId={filterState.selectedCampId}
        />
      )}

      {/* Desktop List */}
      {!isMobile && canRender && !filterState.isShowingDetails && (
        <Stack direction="column" w="50%" h={"100%"}>
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
      {isMobile && canRender && filterState.isShowingMobileList && (
        <Stack direction="column" w={"100%"} h={"100%"}>
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
              campData={
                filterState.selectedCamp as unknown as CampDetailFromAPI
              }
            />
          </Flex>
        )}
    </Stack>
  );
}

export default CampListWrapper;
