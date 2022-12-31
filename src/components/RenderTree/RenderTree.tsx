import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import type { Session } from "next-auth";
import { signIn } from "next-auth/react";

import React from "react";

type Props = {
  status: "error" | "success" | "loading";
  finalRender: React.ReactNode;
  loadingRender?: React.ReactNode;
  isProtected?: boolean;
  session?: Session | null;
  needAdmin?: boolean;
};

function RenderTree({ finalRender, isProtected, session, status }: Props) {
  const getOkToRender = () => {
    if (!isProtected) {
      return true;
    }

    if (isProtected && session) {
      return true;
    }

    return false;
  };

  const isGoodToRender = getOkToRender();

  if (status === "success" && isGoodToRender) {
    return <>{finalRender}</>;
  }

  if (status === "success" && !isGoodToRender) {
    return (
      <Container minW="60%">
        <Stack
          mt="15"
          p="4"
          border="2px"
          borderColor="gray.400"
          rounded="md"
          bg="gray.200"
          color="gray.900"
          textAlign="center"
          spacing={5}
        >
          <Box>
            <Heading>You must be login to see this content</Heading>
          </Box>
          <Box>
            <Button colorScheme="blue" p={5} onClick={() => signIn()}>
              Login
            </Button>
          </Box>
        </Stack>
      </Container>
    );
  }

  if (status === "error") {
    return (
      <Container minW="60%">
        <Stack
          mt="15"
          p="4"
          border="2px"
          borderColor="orange.400"
          rounded="md"
          bg="gray.200"
          color="gray.900"
          textAlign="center"
          spacing={5}
        >
          <Box>
            <Heading>Error loading the page data</Heading>
          </Box>
          <Box>
            <Button colorScheme="blue" p={5} onClick={() => signIn()}>
              Login
            </Button>
          </Box>
        </Stack>
      </Container>
    );
  }

  return (
    <Center p="28">
      <Spinner />
    </Center>
  );
}

export default RenderTree;
