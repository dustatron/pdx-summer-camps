import { Container, Heading, Spinner } from "@chakra-ui/react";
import React from "react";
import type { CardDetails } from "../components/CampCard";
import CampCard from "../components/CampCard";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";

function Favorite() {
  const { data, isLoading } = trpc.favorites.getThisUsersFavorites.useQuery();
  const { push } = useRouter();

  const onSelect = (id: string) => {
    return push(`/show/${id}`);
  };
  return (
    <Container maxW="80%" bg="white" marginTop="3rem">
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
    </Container>
  );
}

export default Favorite;
