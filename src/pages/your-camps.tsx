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
} from "@chakra-ui/react";

import { useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const YourCamps = () => {
  const { data: sessionData } = useSession();
  const { data: campData, status } = trpc.camps?.getYourCamps.useQuery({
    userId: Number(sessionData?.user?.id),
  });
  console.log("campData", campData);
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
              borderColor="gray.800"
              bg="gray.300"
              rounded="md"
              marginTop="5"
              p="3"
              justifyContent="space-between"
              color="gray.800"
            >
              <Box>
                <Text as="h3" fontSize="2xl">
                  {camp.campName}
                </Text>
                <Text>{camp.camp.address}</Text>
                <Text color="blue.400" fontWeight="bold">
                  <a href={camp.camp.website}> website: {camp.camp.website}</a>
                </Text>
              </Box>
              <Link href={`/detail/${camp.campId}`}>
                <Button colorScheme="blue">Edit</Button>
              </Link>
            </Stack>
          ))}
      </>
    </Container>
  );
};

export default YourCamps;
