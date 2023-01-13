import React from "react";
// import Image from "next/image";
import {
  Button,
  Stack,
  Heading,
  Center,
  Image,
  useColorModeValue,
  Flex,
  Text,
  Badge,
  Box,
} from "@chakra-ui/react";

import { useRouter } from "next/router";

export type CardDetails = {
  title: string;
  address: string;
  link: string;
  website: string;
  facebook?: string;
  instagram?: string;
  description: string;
  image: { src: string }[];
  lat: number;
  lng: number;
  id: string;
  tags: string[];
};

type Props = {
  details: CardDetails;
  onSelect: (campId: string) => void;
  selectedCampId?: string;
  showDetails: () => void;
  isMobile?: boolean;
};

const CampCard = ({
  details,
  onSelect,
  selectedCampId,
  showDetails,
  isMobile,
}: Props) => {
  const router = useRouter();
  const { title, description, image, address, website, id, tags } = details;

  const isSelectedCamp = selectedCampId === id;

  return (
    <Center py={2} id={id} minHeight={{ sm: "250px", md: "20rem" }} w="100%">
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        h={isMobile ? "100px" : ""}
        w="90%"
        minHeight={{ sm: "250px", md: "20rem" }}
        direction={{ base: "column", md: "row" }}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        padding={{ sm: 2, md: 4 }}
        border={isSelectedCamp && !isMobile ? "2px" : "0"}
        borderColor={isSelectedCamp ? "gray.600" : ""}
      >
        <Flex flex={1} bg="gray.50" rounded="md" overflow="hidden">
          <Image
            objectFit="contain"
            boxSize="100%"
            src={(image[0] && image[0].src) || "/img-place-holder.png"}
            alt="camp logo"
            width="100%"
          />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="start"
          p={1}
        >
          <Heading fontSize={{ sm: "md", md: "2xl" }} fontFamily={"body"}>
            {title}
          </Heading>

          <Text
            fontSize={{ sm: "smaller", md: "inherit" }}
            color={useColorModeValue("gray.700", "gray.400")}
            px={1}
          >
            {description.slice(0, 70)} {description.length > 90 ? "..." : ""}
          </Text>
          {!isMobile && (
            <Text
              fontWeight={600}
              color={"gray.900"}
              fontSize={{ sm: "smaller", md: "inherit" }}
              mb={1}
            >
              {address.slice(0, 40)}
            </Text>
          )}

          {website && !isMobile && (
            <a href={website} target="_blank" rel="noreferrer">
              <Text fontWeight={600} color={"gray.500"} size="sm" mb={1}>
                Website
              </Text>
            </a>
          )}
          <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
            {!isMobile &&
              tags &&
              tags.map((tag: string) => (
                <Badge key={tag} px={2} py={1} bg="gray.50" fontWeight={"400"}>
                  {tag}
                </Badge>
              ))}
          </Stack>
          {!isMobile && (
            <Stack
              width={"100%"}
              mt={"2rem"}
              direction={"row"}
              padding={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Button
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                onClick={() => {
                  onSelect(id);
                  showDetails();
                }}
                _focus={{
                  bg: "gray.200",
                }}
              >
                More Info
              </Button>
              <Button
                onClick={() => onSelect(id)}
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                bg={"blue.400"}
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "blue.500",
                }}
                _focus={{
                  bg: "blue.500",
                }}
              >
                Show on map
              </Button>
            </Stack>
          )}
          {isMobile && (
            <Box w="100%">
              <Button w="100%" onClick={() => router.push(`/show/${id}`)}>
                Full Details
              </Button>
            </Box>
          )}
        </Stack>
      </Stack>
    </Center>
  );
};

export default CampCard;
