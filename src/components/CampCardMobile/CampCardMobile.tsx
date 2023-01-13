import { Box, Button, Icon } from "@chakra-ui/react";
import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
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
    <Box position="relative" w="100%s">
      <Box position="absolute" bottom={150} zIndex={2000} left={1}>
        <Button
          colorScheme="linkedin"
          height="3rem"
          p="0"
          w="35px"
          rounded="2xl"
          onClick={() => next()}
        >
          <Icon as={ArrowLeftIcon} size="md" />
        </Button>
      </Box>
      <Box position="absolute" bottom={150} zIndex={2000} right={1}>
        <Button
          colorScheme="linkedin"
          height="3rem"
          rounded="2xl"
          p="0"
          w="35px"
          onClick={() => prev()}
        >
          <Icon as={ArrowRightIcon} />
        </Button>
      </Box>
      <Box position="absolute" bottom={0} zIndex={1000}>
        <Box padding={0} w="100%">
          <CampCard
            isMobile={true}
            details={filterState.selectedCamp as unknown as CardDetails}
            selectedCampId={filterState.selectedCampId}
            onSelect={onSelect}
            showDetails={showDetails}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CampCardMobile;
