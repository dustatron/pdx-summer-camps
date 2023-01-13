import { Box, Button } from "@chakra-ui/react";
import React from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
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
      <Box position="absolute" bottom="20" zIndex={2000}>
        <Button
          variant="link"
          height="10rem"
          width="35px"
          p="0"
          onClick={() => next()}
        >
          <IoIosArrowDropleftCircle size="md" />
        </Button>
      </Box>
      <Box position="absolute" bottom="20" zIndex={2000} right="0">
        <Button
          variant="link"
          height="10rem"
          width="35px"
          p="0"
          onClick={() => prev()}
        >
          <IoIosArrowDroprightCircle size="md" />
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
