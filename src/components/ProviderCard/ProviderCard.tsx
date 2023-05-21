import type {
  Camp,
  FavoriteProvider,
  Provider,
  ProviderImage,
} from "@prisma/client";
import { Heading, Box, useColorModeValue, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { Routes } from "../../types/sharedTypes";
import { CldImage } from "next-cloudinary";
import removeHttp from "../../utils/http";

type Props = {
  provider: Provider & {
    camps: Camp[];
    favorites: FavoriteProvider[];
    image: ProviderImage[];
  };
};

const ProviderCard = ({ provider }: Props) => {
  return (
    <Box key={provider.id}>
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
          <Link href={`${Routes.providerDetail}${provider.id}`}>
            {provider && (
              <CldImage
                alt={provider.title}
                height="500"
                width="400"
                crop="fit"
                src={provider.image[0]?.public_id as string}
              />
            )}
          </Link>
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
          <Text color={useColorModeValue("gray.700", "gray.400")} px={1}>
            {provider.brief}
            {provider.brief && provider?.brief?.length > 150 ? "..." : ""}
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
              <Text fontWeight={600} color={"gray.500"} size="sm" mb={1}>
                Website
              </Text>
            </a>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProviderCard;
