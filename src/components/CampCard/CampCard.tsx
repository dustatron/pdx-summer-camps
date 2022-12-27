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
} from "@chakra-ui/react";
import type { Camp } from "@prisma/client";

export type CardDetails = {
  title: string;
  address: string;
  link: string;
  website: string;
  facebook?: string;
  instagram?: string;
  description: string;
  image: { src: string }[];
  location: [{ lat: number; lng: number }];
  id: string;
};

type Props = {
  details: CardDetails;
  onSelect: (lat: number, lng: number, campId: string, campObj: Camp) => void;
  selectedCampId: string;
  showDetails: () => void;
};

const CampCard = ({
  details,
  onSelect,
  selectedCampId,
  showDetails,
}: Props) => {
  const {
    title,
    description,
    image,
    address,
    website,
    facebook,
    instagram,
    id,
    location,
  } = details;

  const isSelectedCamp = selectedCampId === id;
  const { lat, lng } = location[0];

  return (
    <Center py={2} id={id} w="100%">
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w="90%"
        minHeight={{ sm: "476px", md: "20rem" }}
        direction={{ base: "column", md: "row" }}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        padding={4}
        border={isSelectedCamp ? "2px" : "0"}
        borderColor={isSelectedCamp ? "gray.600" : ""}
      >
        <Flex flex={1} bg="gray.200" rounded="md" overflow="hidden">
          <Image
            objectFit="cover"
            boxSize="100%"
            src={(image[0] && image[0].src) || "/img-place-holder.png"}
            alt="camp logo"
          />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="start"
          p={1}
        >
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {title}
          </Heading>

          <Text color={useColorModeValue("gray.700", "gray.400")} px={1}>
            {description.slice(0, 70)} {description.length > 90 ? "..." : ""}
          </Text>
          <Text fontWeight={600} color={"gray.900"} size="sm" mb={1}>
            {address.slice(0, 40)}
          </Text>
          {website && (
            <a href={website} target="_blank" rel="noreferrer">
              <Text fontWeight={600} color={"gray.500"} size="sm" mb={1}>
                Website
              </Text>
            </a>
          )}
          <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue("gray.50", "gray.800")}
              fontWeight={"400"}
            >
              #art
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue("gray.50", "gray.800")}
              fontWeight={"400"}
            >
              #photography
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue("gray.50", "gray.800")}
              fontWeight={"400"}
            >
              #music
            </Badge>
          </Stack>

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
                onSelect(lat, lng, id, details as unknown as Camp);
                showDetails();
              }}
              _focus={{
                bg: "gray.200",
              }}
            >
              More Info
            </Button>
            <Button
              onClick={() => onSelect(lat, lng, id, details as unknown as Camp)}
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
        </Stack>
      </Stack>
    </Center>
  );
};

export default CampCard;
