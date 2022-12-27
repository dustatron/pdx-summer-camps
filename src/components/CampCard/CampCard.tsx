import React from "react";
// import Image from "next/image";
import {
  Box,
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

export type CardDetails = {
  title: string;
  address: string;
  link: string;
  website: string;
  facebook?: string;
  instagram?: string;
  description: string;
  images: string[];
  location: { lat: number; lng: number };
  place_id: string;
};

type Props = {
  details: CardDetails;
  onSelect: (lat: number, lng: number, place_id: string) => void;
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
    images,
    address,
    website,
    facebook,
    instagram,
    place_id,
    location: { lat, lng },
  } = details;

  const isSelectedCamp = selectedCampId === place_id;

  return (
    <Center py={2} id={place_id} w="100%">
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w="90%"
        height={{ sm: "476px", md: "20rem" }}
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
            src={images[0] || "/img-place-holder.png"}
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
                onSelect(lat, lng, place_id);
                showDetails();
              }}
              _focus={{
                bg: "gray.200",
              }}
            >
              More Info
            </Button>
            <Button
              onClick={() => onSelect(lat, lng, place_id)}
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
// <Box
//   w={["80%"]}
//   maxHeight={!isSelectedCamp ? "30rem" : ""}
//   id={place_id}
//   padding="2"
// >
//   <Box
//     h="100%"
//     w="100%"
//     border="1px"
//     borderColor="gray.300"
//     rounded="md"
//     cursor="pointer"
//     bg={isSelectedCamp ? "gray.100" : ""}
//     onClick={() => onSelect(lat, lng, place_id)}
//   >
//     <Center height="150px" overflow="hidden">
//       <Image
//         height={300}
//         width={300}
//         src={images[0] || "/img-place-holder.png"}
//         alt="Image provided by camp"
//       />
//     </Center>
//     <Box bg="gray.500" p="2">
//       <Heading size="sm" color="white">
//         {title}
//       </Heading>
//     </Box>
//     <Stack p="2" fontSize="sm">
//       <Box>{address}</Box>
//       <Box>
//         <a
//           className="text-blue-500"
//           href={website}
//           target="_blank"
//           rel="noreferrer"
//         >
//           {website?.replace("http://", "").replace("https://", "")}
//         </a>
//       </Box>
//       {isSelectedCamp && <div>{description}</div>}

//       {!isSelectedCamp && (
//         <div>
//           {description.slice(0, 255)}{" "}
//           {description.length > 255 ? "..." : ""}
//         </div>
//       )}
//       <Stack direction="row" spacing={3}>
//         {facebook && (
//           <CaLink
//             color="blue.400"
//             href={facebook}
//             target="_blank"
//             rel="noreferrer"
//           >
//             <Button>
//               <BsFacebook />
//             </Button>
//           </CaLink>
//         )}
//         {instagram && (
//           <CaLink
//             href={instagram}
//             color="blue.400"
//             target="_blank"
//             rel="noreferrer"
//           >
//             <Button>
//               <ImInstagram />
//             </Button>
//           </CaLink>
//         )}
//       </Stack>
//     </Stack>
//   </Box>
// </Box>

export default CampCard;
