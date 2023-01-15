import { Box, Flex, Text, Image, Stack } from "@chakra-ui/react";
import React from "react";
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
    <>
      {/* <Box zIndex={2000} left={1}>
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
      <Box zIndex={2000} right={1}>
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
      </Box> */}

      <Flex
        w="100%"
        zIndex={1000}
        onClick={() => router.push(`/show/${selectedCamp?.id}`)}
        border="1px"
        borderColor="gray.100"
      >
        <Stack
          direction="row"
          w="100%"
          backgroundColor="white"
          p="3"
          bg="white"
          shadow="lg"
        >
          <Flex w="30%" justifyContent="center">
            {selectedCamp.image && selectedCamp.image[0] && (
              <Image
                src={selectedCamp.image[0].src}
                fit="scale-down"
                alt="camp logo"
              />
            )}
          </Flex>

          <Box w="70%">
            <Text fontWeight="bold" textAlign="start">
              {selectedCamp.title}
            </Text>
            <Box>
              {selectedCamp.brief && (
                <Text fontSize="sm">{selectedCamp?.brief}</Text>
              )}
              {!selectedCamp.brief && (
                <Text fontSize="sm">
                  {selectedCamp?.description?.substring(0, 100)}
                </Text>
              )}
            </Box>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default CampCardMobile;
