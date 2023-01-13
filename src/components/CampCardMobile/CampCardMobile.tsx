import { Box, Button, Center, Flex, Stack } from "@chakra-ui/react";
import React from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import type { CardDetails } from "../CampCard/CampCard";
import CampCard from "../CampCard/CampCard";
import type { FilterState } from "../CampListWrapper/type";

type Props = {
  next: () => void;
  prev: () => void;
  onSelect: (campId: string) => void;
  showDetails: () => void;
  filterState: FilterState;
};

const CampCardMobile = ({
  next,
  prev,
  onSelect,
  filterState,
  showDetails,
}: Props) => {
  return (
    <Stack
      direction="row"
      position="absolute"
      bottom={0}
      spacing="0"
      padding={0}
    >
      <Center>
        <Button
          variant="ghost"
          height="200px"
          width="45px"
          p="0"
          onClick={() => next()}
        >
          <AiFillCaretLeft size="md" />
        </Button>
      </Center>
      <Box padding={0} w="100%">
        <CampCard
          isMobile={true}
          details={filterState.selectedCamp as unknown as CardDetails}
          selectedCampId={filterState.selectedCampId}
          onSelect={onSelect}
          showDetails={showDetails}
        />
      </Box>
      <Center>
        <Button
          variant="ghost"
          height="200px"
          width="45px"
          p="0"
          onClick={() => prev()}
        >
          <AiFillCaretRight size="md" />
        </Button>
      </Center>
    </Stack>
  );
};

export default CampCardMobile;
