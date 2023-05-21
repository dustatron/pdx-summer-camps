import React from "react";
import {
  Heading,
  Box,
  Badge,
  Container,
  Spinner,
  Center,
  useColorModeValue,
  Stack,
  Flex,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { trpc } from "../../utils/trpc";
import removeHttp from "../../utils/http";
import { CldImage } from "next-cloudinary";
import { Routes } from "../../types/sharedTypes";

const providers = () => {
  const { data, isLoading } = trpc.provider.getAllProviders.useQuery();
  return (
    <Container w="100%" maxWidth="1366px" p="5">
      <Heading textAlign="center"> Providers </Heading>
      {isLoading && (
        <Center p="20">
          <Spinner />
        </Center>
      )}

      {data && (
        <Stack spacing={5}>
          {data.map((provider) => (
            <Box key={provider.id}>
              <Link href={`${Routes.providerDetail}${provider.id}`}>
                <Stack
                  borderWidth="1px"
                  borderRadius="lg"
                  w="100%"
                  minHeight={{ sm: "476px", md: "15rem" }}
                  direction={{ base: "column", md: "row" }}
                  bg={useColorModeValue("white", "gray.900")}
                  boxShadow={"2xl"}
                  padding={4}
                  border={false ? "2px" : "0"}
                  borderColor={false ? "gray.600" : ""}
                  spacing={5}
                >
                  <Box bg="gray.50" rounded="md" overflow="hidden">
                    {provider && (
                      <CldImage
                        alt={provider.title}
                        height="500"
                        width="400"
                        crop="fit"
                        src={provider.image[0]?.public_id as string}
                      />
                    )}
                  </Box>
                  <Stack
                    flex={1}
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="start"
                    p={1}
                    h="100%"
                  >
                    <Heading fontSize={"2xl"} fontFamily={"body"}>
                      {provider.title}
                    </Heading>
                    <Text
                      color={useColorModeValue("gray.700", "gray.400")}
                      px={1}
                    >
                      {provider.brief}
                      {provider.brief && provider?.brief?.length > 150
                        ? "..."
                        : ""}
                    </Text>
                    <Text fontWeight={600} color={"gray.900"} size="sm" mb={1}>
                      {provider.address.slice(0, 40)}
                    </Text>
                    {provider.website && (
                      <a
                        href={`https://${removeHttp(provider.website)}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Text
                          fontWeight={600}
                          color={"gray.500"}
                          size="sm"
                          mb={1}
                        >
                          Website
                        </Text>
                      </a>
                    )}
                  </Stack>
                </Stack>
              </Link>
            </Box>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default providers;
