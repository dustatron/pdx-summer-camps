import React from "react";
import { Heading, Container, Spinner, Center, Stack } from "@chakra-ui/react";
import { trpc } from "../../utils/trpc";

import ProviderCard from "../../components/ProviderCard";

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
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default providers;
