import React from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Link,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";

import { trpc } from "../../utils/trpc";

const getYourCamps = () => {
  const { data: campData, status } = trpc.camps?.getYourCamps.useQuery();
  return (
    <Container
      mt="5"
      bg="white"
      maxW="4xl"
      border="1px"
      rounded="md"
      borderColor="gray.100"
      padding={4}
      minH="md"
    >
      <>
        <Heading textAlign="center">Your Camps</Heading>
        {status === "success" && campData.length === 0 && (
          <Center p="5">
            <Text textAlign="center">You have not created any camps</Text>
          </Center>
        )}
        {status === "success" &&
          campData &&
          campData.map((camp) => (
            <Stack
              direction="row"
              key={camp.id}
              border="1px"
              borderColor="gray.100"
              bg="gray.50"
              rounded="md"
              marginTop="5"
              p="3"
              justifyContent="space-between"
              color="gray.800"
              shadow="lg"
            >
              <Box h="200px" w="220px" overflow="hidden">
                {camp?.camp?.image[0] && camp?.camp?.image[0].src && (
                  <Image
                    src={camp.camp.image[0].src}
                    alt="camp logo"
                    objectFit="contain"
                    boxSize="100%"
                    width="100%"
                  />
                )}
              </Box>
              <Box>
                <Text as="h3" fontSize="2xl">
                  {camp.campName}
                </Text>
                <Text>{camp.camp.address}</Text>
                <Text color="blue.400" fontWeight="bold">
                  <a href={camp.camp.website}> website </a>
                </Text>
              </Box>
              <Stack>
                <Link href={`/camp/edit/${camp.campId}`}>
                  <Button w="100%" colorScheme="blue">
                    Edit
                  </Button>
                </Link>
                <Link href={`/camp/show/${camp.campId}`}>
                  <Button colorScheme="facebook">Preview</Button>
                </Link>
              </Stack>
            </Stack>
          ))}
      </>
    </Container>
  );
};

export default getYourCamps;
