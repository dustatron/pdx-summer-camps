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
import { trpc } from "../utils/trpc";
import removeHttp from "../utils/http";

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
        <>
          {data.map((provider) => (
            <Box key={provider.id}>
              <Link href={`/providerdetail/${provider.id}`}>
                <Center py={2} id={provider.id} w="100%">
                  <Stack
                    borderWidth="1px"
                    borderRadius="lg"
                    w="90%"
                    minHeight={{ sm: "476px", md: "20rem" }}
                    direction={{ base: "column", md: "row" }}
                    bg={useColorModeValue("white", "gray.900")}
                    boxShadow={"2xl"}
                    padding={4}
                    border={false ? "2px" : "0"}
                    borderColor={false ? "gray.600" : ""}
                  >
                    <Flex flex={1} bg="gray.50" rounded="md" overflow="hidden">
                      Image here
                    </Flex>
                    <Stack
                      flex={1}
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="start"
                      p={1}
                    >
                      <Heading fontSize={"2xl"} fontFamily={"body"}>
                        {provider.title}
                      </Heading>
                      <Text
                        color={useColorModeValue("gray.700", "gray.400")}
                        px={1}
                      >
                        {provider.description}
                        {provider.description &&
                        provider?.description?.length > 150
                          ? "..."
                          : ""}
                      </Text>
                      <Text
                        fontWeight={600}
                        color={"gray.900"}
                        size="sm"
                        mb={1}
                      >
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
                      <Stack
                        align={"center"}
                        justify={"center"}
                        direction={"row"}
                        mt={6}
                      >
                        {provider.Tags &&
                          provider.Tags.map((tag: string) => (
                            <Badge
                              key={tag}
                              px={2}
                              py={1}
                              bg="gray.50"
                              fontWeight={"400"}
                            >
                              {tag}
                            </Badge>
                          ))}
                      </Stack>
                    </Stack>
                  </Stack>
                </Center>
              </Link>
            </Box>
          ))}
        </>
      )}
    </Container>
  );
};

export default providers;
