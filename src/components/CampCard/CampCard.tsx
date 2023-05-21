import React from "react";
import {
  Button,
  Stack,
  Heading,
  Center,
  Image,
  useColorModeValue,
  Box,
  Text,
  Badge,
} from "@chakra-ui/react";
import Link from "next/link";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import removeHttp from "../../utils/http";
import { CldImage } from "next-cloudinary";
import { Routes } from "../../types/sharedTypes";

export type CardDetails = {
  title: string;
  address: string;
  link: string;
  website: string;
  facebook?: string;
  instagram?: string;
  description: string;
  image: { src: string; public_id?: string }[];
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

const CampCard = ({ details, onSelect, selectedCampId, isMobile }: Props) => {
  const { title, description, image, address, website, id, tags } = details;
  const colorOption = useColorModeValue("gray.700", "gray.400");
  const router = useRouter();

  const isSelectedCamp = selectedCampId === id;

  const parsedDescription = parse(description.slice(0, 150));

  return (
    <Stack
      id={id}
      borderWidth="1px"
      borderRadius="lg"
      w="99%"
      h="100%"
      maxHeight={{ sm: "450px", md: "20rem" }}
      direction={{ base: "column", md: "row" }}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      padding={4}
      border={isSelectedCamp ? "2px" : "0"}
      borderColor={isSelectedCamp ? "gray.600" : "gray.100"}
    >
      <Box flex={1} rounded="md" overflow="hidden">
        {image[0]?.public_id && (
          <CldImage
            alt={title}
            height="330"
            width="450"
            crop="fill"
            src={image[0]?.public_id}
          />
        )}
        {!image[0]?.public_id && image[0]?.src && (
          <Image
            objectFit="cover"
            boxSize="100%"
            src={(image[0] && image[0].src) || "/img-place-holder.png"}
            alt="camp logo"
          />
        )}
      </Box>
      <Stack flex={1} p={1} h="100%" justifyContent="space-between">
        <Stack>
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {title}
          </Heading>

          {website && (
            <a
              href={`https://${removeHttp(website)}`}
              target="_blank"
              rel="noreferrer"
            >
              <Text fontWeight={600} color={"gray.500"} size="sm" mb={1}>
                Website
              </Text>
            </a>
          )}
        </Stack>

        {!isMobile && (
          <Text color={colorOption} px={1}>
            {parsedDescription} {description.length > 150 ? "..." : ""}
          </Text>
        )}

        {/* <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
            {tags &&
              tags.map((tag: string) => (
                <Badge key={tag} px={2} py={1} bg="gray.50" fontWeight={"400"}>
                  {tag}
                </Badge>
              ))}
          </Stack> */}
        <Stack spacing={3}>
          <Text fontWeight={600} color={"gray.900"} size="sm" mb={1}>
            {address.slice(0, 40)}
          </Text>
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
                  router.push(`${Routes.campDetail}${details.id}`);
                  // showDetails();
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
            <Button
              w="100%"
              onClick={() => router.push(`${Routes.campDetail}${details.id}`)}
            >
              More Info
            </Button>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CampCard;
