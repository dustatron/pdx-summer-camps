import React from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Link,
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
      border="2px"
      rounded="md"
      borderColor="gray.300"
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
            <Box key={camp.id}>
              <Text>{camp.campName}</Text>
              <Link href={`/detail/${camp.campId}`}>
                <Button>Edit</Button>
              </Link>
            </Box>
          ))}
      </>
    </Container>
  );
};

export default YourCamps;
