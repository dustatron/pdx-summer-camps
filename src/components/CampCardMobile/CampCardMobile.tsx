import { Box, Button, Flex, Icon, Text, Image, Stack } from "@chakra-ui/react";
import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import type { FilterState } from "../CampListWrapper/type";
import { useRouter } from "next/router";
import type { CampData } from "../../types/camp";

type Props = {
  next: () => void;
  prev: () => void;
  filterState: FilterState;
  selectedCamp: CampData;
};

const CampCardMobile = ({ next, prev, selectedCamp, filterState }: Props) => {
  const router = useRouter();
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
      <Flex
        position="absolute"
        justifyContent="center"
        w="100%"
        h="30vh"
        bottom={0}
        zIndex={1000}
      >
        <Stack
          w="90%"
          backgroundColor="white"
          h="29vh"
          rounded="md"
          p="3"
          justifyContent="space-between"
          alignContent="center"
        >
          <Flex h="50%" overflow="hidden" justifyContent="center">
            {selectedCamp.image && selectedCamp.image[0] && (
              <Image src={selectedCamp.image[0].src} h="100%" alt="camp logo" />
            )}
          </Flex>
          <Text fontWeight="bold" textAlign="center">
            {selectedCamp.title}
          </Text>
          <Box>
            {selectedCamp.brief && <Text>{selectedCamp?.brief}</Text>}
            {!selectedCamp.brief && (
              <Text>{selectedCamp?.description?.substring(0, 100)}</Text>
            )}
          </Box>
          <Button
            p="4"
            onClick={() => router.push(`/show/${selectedCamp?.id}`)}
          >
            More Details
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
};

export default CampCardMobile;
