import { Box, Center, Heading, Spinner } from "@chakra-ui/react";
import React from "react";
import type { CardDetails } from "../../components/CampCard";
import CampCard from "../../components/CampCard";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

function Favorite() {
  const { data, isLoading } = trpc.favorites.getThisUsersFavorites.useQuery();
  const { push } = useRouter();

  const onSelect = (id: string) => {
    return push(`/show/${id}`);
  };
  return (
    <Center w="100%" bg="white">
      <Box w={{ md: "100%", lg: "80%" }}>
        <Heading textAlign="center">Favorites</Heading>
        {isLoading && <Spinner />}
        {data &&
          data.map((fav: any) => (
            <CampCard
              key={fav.id}
              details={fav.camp as unknown as CardDetails}
              onSelect={() => onSelect(fav.camp.id)}
              showDetails={() => onSelect(fav.camp.id)}
              isMobile={false}
            />
          ))}
      </Box>
    </Center>
  );
}

export default Favorite;
