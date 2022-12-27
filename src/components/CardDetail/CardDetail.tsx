import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { Camp } from "@prisma/client";
import { BiArrowBack } from "react-icons/bi";
import { BsFacebook } from "react-icons/bs";
import { ImInstagram } from "react-icons/im";
import React from "react";

export type CampDetail = Camp & { image: { src: string; id: string }[] };

type Props = { onBack: () => void; campData: CampDetail };

function CardDetail({ onBack, campData }: Props) {
  const {
    title,
    image,
    description,
    website,
    facebook,
    instagram,
    address,
    email,
    quadrant,
    tags,
  } = campData;
  return (
    <Stack spacing={3} p="3">
      <Box borderBottom="1px" paddingBottom="2" borderColor="gray.300">
        <Button onClick={onBack}>
          <BiArrowBack /> Back
        </Button>
      </Box>
      <Center paddingTop="2">
        <Heading>{title}</Heading>
      </Center>
      <Center>
        {image?.map((img) => (
          <Image key={img.id} src={img.src} alt="image of camp" maxH="200px" />
        ))}
      </Center>
      <Box>
        <Text fontWeight="bold">Description:</Text>
        <Text>{description}</Text>
      </Box>
      <Box>
        <Text fontWeight="bold">Address:</Text>
        <Text>{address}</Text>
      </Box>
      <Box>
        <Text fontWeight="bold">Website:</Text>
        {website && (
          <a href={website} target="_blank" rel="noreferrer">
            <Text color="blue.600" cursor="pointer">
              {website}
            </Text>
          </a>
        )}
        {!website && <Text>Not Provided</Text>}
      </Box>
      <Box>
        <Text fontWeight="bold">Email:</Text>
        {email && (
          <a href={`mailto:${email}`} target="_blank" rel="noreferrer">
            <Text color="blue.600" cursor="pointer">
              {email}
            </Text>
          </a>
        )}
        {!email && <Text>Not Provided</Text>}
      </Box>
      <Box>
        <Text fontWeight="bold">Tags:</Text>
        {tags && (
          <Text color="blue.600" cursor="pointer">
            {tags}
          </Text>
        )}
        {!tags && <Text>Not Provided</Text>}
      </Box>
      <Box>
        <Text fontWeight="bold">Quadrant:</Text>
        {quadrant && (
          <Text color="blue.600" cursor="pointer">
            {quadrant}
          </Text>
        )}
        {!quadrant && <Text>Not Provided</Text>}
      </Box>
      <Box>
        <Text fontWeight="bold">Social Media:</Text>
        <Stack direction="row">
          {facebook && (
            <a href={facebook} target="_blank" rel="noreferrer">
              <Button colorScheme="facebook">
                <BsFacebook />
              </Button>
            </a>
          )}
          {instagram && (
            <a href={instagram} target="_blank" rel="noreferrer">
              <Button colorScheme="twitter">
                <ImInstagram />
              </Button>
            </a>
          )}
        </Stack>
      </Box>
    </Stack>
  );
}

export default CardDetail;
