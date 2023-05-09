import { TriangleDownIcon } from "@chakra-ui/icons";
import {
  Input,
  Button,
  Box,
  Stack,
  Flex,
  Center,
  InputGroup,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import type { Camp } from "@prisma/client";
import type { MultiSelectOption } from "../../types/camp";
import type { CardDetails } from "../CampCard";
import CampCard from "../CampCard";
import FilterBox from "../FilterBox";
import type { Action, FilterState } from "./type";
import { AiOutlineClose } from "react-icons/ai";

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
            <Stack direction="row" py="2" px="10">
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
              <InputGroup size="md">
                <Input
                  placeholder="Search by camp name"
                  value={filterState.campNameFilter}
                  onChange={(e) =>
                    dispatch({
                      type: "setCampNameFilter",
                      payload: e.target.value,
                    })
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
              <Box
                w="22%"
                border="1px"
                rounded="md"
                px="3"
                py="1"
                textAlign="center"
              >
                {filteredCampList?.length} showing
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
