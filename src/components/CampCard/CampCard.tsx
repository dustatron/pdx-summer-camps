import React from "react";
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
import Link from "next/link";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import removeHttp from "../../utils/http";
import { CldImage } from "next-cloudinary";

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
  const router = useRouter();

  const isSelectedCamp = selectedCampId === id;

  const parsedDescription = parse(description.slice(0, 150));

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
        <Flex flex={1} bg="gray.50" rounded="md" overflow="hidden">
          {image[0]?.public_id && (
            <CldImage
              height="250"
              width="400"
              crop="thumb"
              gravity="faces"
              src={image[0]?.public_id}
            />
          )}
          {!image[0]?.public_id && image[0]?.src && (
            <Link href={`/show/${details.id}`}>
              <Image
                objectFit="cover"
                boxSize="100%"
                src={(image[0] && image[0].src) || "/img-place-holder.png"}
                alt="camp logo"
              />
            </Link>
          )}
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
            {parsedDescription} {description.length > 150 ? "..." : ""}
          </Text>
          <Text fontWeight={600} color={"gray.900"} size="sm" mb={1}>
            {address.slice(0, 40)}
          </Text>
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
          <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
            {tags &&
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
                  router.push(`/show/${details.id}`);
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
            <Button w="100%" onClick={() => router.push(`/show/${details.id}`)}>
              More Info
            </Button>
          )}
        </Stack>
      </Stack>
    </Center>
  );
};

export default CampCard;
