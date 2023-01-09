import { TriangleDownIcon } from "@chakra-ui/icons";
import { Input, Button, Box, Stack, Flex, Center } from "@chakra-ui/react";
import type { Camp } from "@prisma/client";
import { useState } from "react";
import type { MultiSelectOption } from "../../types/camp";
import type { CardDetails } from "../CampCard";
import CampCard from "../CampCard";
import FilterBox from "../FilterBox";
import type { Action, FilterState } from "./CampListWrapper";

type Props = {
  selectCampFromList: (campId: string) => void;
  filteredCampList: Camp[];
  tagOptions: Set<string>;
  filterState: FilterState;
  dispatch: (action: Action) => void;
  isMobile?: boolean;
  setIsShowFilter: () => void;
};

export default function CampList({
  tagOptions,
  filteredCampList,
  filterState,
  dispatch,
  selectCampFromList,
  isMobile,
  setIsShowFilter,
}: Props) {
  const {
    ageSelected,
    campNameFilter,
    quadrantSelected,
    selectedCampId,
    tagsSelected,
    isFilterShowing,
  } = filterState;

  return (
    <Stack direction="column" w="100%" h="calc(92vh)">
      <>
        {!isMobile && (
          <>
            <Stack direction="row" p="2">
              <Input
                value={campNameFilter}
                onChange={(e) =>
                  dispatch({
                    type: "setCampNameFilter",
                    payload: e.target.value,
                  })
                }
                type="text"
                placeholder="Camp Name"
                bg="white"
              />
              <Button
                onClick={() =>
                  dispatch({ type: "setCampNameFilter", payload: "" })
                }
                colorScheme="blue"
              >
                Clear
              </Button>
            </Stack>
            <Stack
              direction="row"
              textAlign="center"
              justifyContent="space-between"
              px="10"
            >
              <Button
                variant="ghost"
                onClick={() => {
                  setIsShowFilter();
                }}
              >
                Filters
                <TriangleDownIcon
                  transform={isFilterShowing ? "" : "rotate(-90deg)"}
                />
              </Button>
              <Box border="1px" rounded="md" px="3" py="1">
                {filteredCampList?.length} Camps showing
              </Box>
            </Stack>
          </>
        )}

        {isFilterShowing && (
          <Center>
            <FilterBox
              filterOptions={tagOptions}
              ageSelected={ageSelected}
              quadrantSelected={quadrantSelected}
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
              tagsSelected={tagsSelected}
            />
          </Center>
        )}
        <Flex flexWrap="wrap" h="100%" w="100%" overflow="scroll">
          {filteredCampList?.map((camp) => (
            <CampCard
              isMobile={isMobile}
              selectedCampId={selectedCampId}
              details={camp as unknown as CardDetails}
              key={`${camp.id}`}
              showDetails={() =>
                dispatch({ type: "showingDetailsTrue", payload: camp })
              }
              onSelect={selectCampFromList}
            />
          ))}
        </Flex>
      </>
    </Stack>
  );
}
