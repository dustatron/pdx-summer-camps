import { Box, Container, Heading, Spinner } from "@chakra-ui/react";
import React from "react";
import { trpc } from "../utils/trpc";

function profile() {
  const { data, isLoading } = trpc.favorites.getThisUsersFavorites.useQuery();
  return (
    <Container maxW="80%" bg="white" marginTop="3rem">
      <Heading>Profile</Heading>
      {isLoading && <Spinner />}
      {data && data.map((fav) => <Box key={fav.id}>{fav.camp.title} </Box>)}
    </Container>
  );
}

export default profile;
