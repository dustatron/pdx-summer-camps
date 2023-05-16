import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { trpc } from "../../../utils/trpc";
import parse from "html-react-parser";
import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  Spinner,
  Stack,
  Text,
  useEditable,
} from "@chakra-ui/react";
import { CldImage } from "next-cloudinary";
import { BiArrowBack } from "react-icons/bi";
import removeHttp from "../../../utils/http";
import { AgeValues } from "../../../types/camp";
import { BsFacebook } from "react-icons/bs";
import { ImInstagram } from "react-icons/im";
import { useSession } from "next-auth/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import type { CardDetails } from "../../../components/CampCard";
import CampCard from "../../../components/CampCard";

const getFormattedAges = (values: string[]): string[] => {
  if (values) {
    return values.sort().map((val) => AgeValues[val as keyof typeof AgeValues]);
  }
  return [];
};

const ProviderDetails = () => {
  const router = useRouter();

  const [isFav, setIsFav] = useState<boolean>(false);

  const { data: sessionData } = useSession();

  const { mutate: addFav, isLoading: isAddFavLoading } =
    trpc.favorites.addProviderFavorite.useMutation({
      onSuccess: () => {
        setIsFav(true);
      },
    });

  const { mutate: removeFav, isLoading: isRemoveFavLoading } =
    trpc.favorites.removeProviderFavorite.useMutation({
      onSuccess: () => {
        setIsFav(false);
      },
    });

  const isFavMutationLoading = isAddFavLoading || isRemoveFavLoading;

  const { data: userData } = trpc.auth.getUser.useQuery(
    {
      id: Number(sessionData?.user?.id),
    },
    {
      retry: false,
    }
  );

  const { id } = router.query;

  const { data, status } = trpc.provider.getProvider.useQuery({
    providerId: id as string,
  });

  useEffect(() => {
    if (
      userData?.id &&
      data?.favorites.find((fav) => fav.userId === userData.id)
    ) {
      setIsFav(true);
    }
  }, [data?.favorites, userData?.id]);

  const handleFavoriteClick = () => {
    if (data?.id && !isFav) {
      addFav({ providerId: data?.id });
    }

    const fav = data?.favorites.find((fav) => fav.userId === userData?.id);
    if (data?.id && isFav && fav) {
      removeFav({ id: fav?.id });
    }

    return null;
  };

  if (data) {
    const {
      image,
      tags,
      address,
      ages,
      brief,
      camps,
      contactName,
      description,
      email,
      facebook,
      favorites,
      instagram,
      phone,
      title,
      website,
    } = data;
    const formatAges = getFormattedAges(ages);
    return (
      <Container
        w="100%"
        marginTop={5}
        marginBottom={10}
        bg="white"
        p="3"
        shadow="lg"
        rounded="md"
        maxW={{ sm: "100%", md: "100%", lg: "80%" }}
      >
        <Center w="100%" maxH="350px" overflow="hidden" my="2">
          {image[0]?.public_id && (
            <CldImage
              width="1500"
              height="400"
              crop="fill"
              gravity="faces"
              sizes="100vw"
              src={image[0]?.public_id}
              preserveTransformations={true}
              alt="image of from camp"
            />
          )}
          {!image[0]?.public_id && (
            <Image objectFit="fill" src={image[0]?.src} alt="image of camp" />
          )}
        </Center>
        <Stack
          direction="row"
          justifyContent="space-between"
          borderBottom="1px"
          paddingBottom="2"
          borderColor="gray.300"
          w="100%"
        >
          <Button onClick={() => router.back()}>
            <BiArrowBack /> Back
          </Button>
          {userData?.role === "ADMIN" && (
            <Stack direction="row" spacing={5}>
              <Button
                colorScheme="facebook"
                onClick={() => router.push(`/provider/edit/${id}`)}
                w="100px"
              >
                Edit
              </Button>
              <Button
                colorScheme="facebook"
                onClick={() => router.push(`/camps/add`)}
                w="100px"
              >
                Add Camp
              </Button>
            </Stack>
          )}
          <Button
            variant="ghost"
            onClick={handleFavoriteClick}
            // isLoading={isLoadingAddFav || isLoadingRemoveFav}
          >
            {isFav && !isFavMutationLoading && (
              <Icon as={AiFillHeart} h="40px" w="40px" />
            )}
            {!isFav && !isFavMutationLoading && (
              <Icon as={AiOutlineHeart} h="40px" w="40px" />
            )}
            {isFavMutationLoading && <Spinner />}
          </Button>
        </Stack>
        <Stack direction={{ sm: "column", md: "column", lg: "row" }} pt="10">
          {/* //Left  */}
          <Stack spacing="5" w={{ sm: "100%", md: "100%", lg: "50%" }}>
            <Heading size="2xl">{title}</Heading>
            <Box>
              <Text>{brief}</Text>
            </Box>
            <Box>
              <Text fontWeight="extrabold" fontSize="lg">
                Favorited : {favorites.length}
              </Text>
            </Box>

            <Box>
              {tags && (
                <Text color="blue.600" cursor="pointer">
                  {tags.map((tag) => (
                    <Badge key={`tag-${tag}`}>{tag}</Badge>
                  ))}
                </Text>
              )}
              {!tags && <Text>Not Provided</Text>}
            </Box>
            <Stack spacing={5}>
              <Stack direction={{ sm: "column", md: "column", lg: "row" }}>
                <Box w={{ md: "100%", lg: "50%" }}>
                  <Text fontWeight="extrabold" fontSize="lg">
                    Address
                  </Text>
                  <a
                    href={`https://maps.google.com/?q=${encodeURI(address)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Text color="blue.600" cursor="pointer">
                      {address}
                    </Text>
                  </a>
                </Box>
                <Box w={{ md: "100%", lg: "50%" }}>
                  <Text fontWeight="extrabold" fontSize="lg">
                    Website
                  </Text>
                  {website && (
                    <a
                      href={`https://${removeHttp(website)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Text color="blue.600" cursor="pointer">
                        {`https://${removeHttp(website)}`}
                      </Text>
                    </a>
                  )}
                  {!website && <Text>Not Provided</Text>}
                </Box>
              </Stack>
              <Stack direction={{ sm: "column", md: "column", lg: "row" }}>
                <Box w={{ md: "100%", lg: "50%" }}>
                  <Text fontWeight="extrabold" fontSize="lg">
                    Email
                  </Text>
                  {email && (
                    <a
                      href={`mailto:${email}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Text color="blue.600" cursor="pointer">
                        {email}
                      </Text>
                    </a>
                  )}
                  {!email && <Text>Not Provided</Text>}
                </Box>
                <Box w={{ md: "100%", lg: "50%" }}>
                  <Text fontWeight="extrabold" fontSize="lg">
                    Phone
                  </Text>
                  {phone && (
                    <a
                      href={`mailto:${phone}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Text color="blue.600" cursor="pointer">
                        {phone}
                      </Text>
                    </a>
                  )}
                  {!phone && <Text>Not Provided</Text>}
                </Box>
              </Stack>
            </Stack>

            <Box>
              <Text fontWeight="extrabold" fontSize="lg">
                Contact Person
              </Text>
              <Text>{contactName}</Text>
              {!contactName && <Text>Not Provided</Text>}
            </Box>
          </Stack>

          {/* //Right  */}
          <Stack w={{ sm: "100%", md: "100%", lg: "50%" }} spacing={5}>
            <Stack direction="row" w="100%" justifyContent="space-between">
              <Box>
                <Text fontWeight="extrabold" fontSize="3xl">
                  {/* {price ? `$${price}` : "No Price Provided"} */}
                </Text>
              </Box>
            </Stack>
            <Divider />
            <Stack direction="row">
              <Box w="50%">
                <Text fontWeight="extrabold" fontSize="lg">
                  Age Range
                </Text>
                <Flex flexWrap="wrap" py="2">
                  {ages &&
                    formatAges.map((age) => (
                      <Badge mt="2" mr="2" key={`age-${age}`}>
                        {age}
                      </Badge>
                    ))}
                  {!ages && <Text>Not Provided</Text>}
                </Flex>
              </Box>

              <Box w="50%">
                <Text fontWeight="extrabold" fontSize="lg">
                  Status
                </Text>
                <Text color="blue.600" cursor="pointer">
                  <Badge key={`tag-${status}}`}>{status}</Badge>
                </Text>
              </Box>
            </Stack>

            <Box>
              <Stack direction="row">
                {facebook && (
                  <a href={facebook} target="_blank" rel="noreferrer">
                    <Button colorScheme="facebook">
                      <BsFacebook />
                    </Button>
                  </a>
                )}
                {instagram && (
                  <a href={instagram} target="_blank" rel="noreferrer">
                    <Button colorScheme="twitter">
                      <ImInstagram />
                    </Button>
                  </a>
                )}
              </Stack>
            </Box>
          </Stack>
        </Stack>
        <Box py="5">
          <Text fontWeight="extrabold" fontSize="lg">
            Description
          </Text>
          <Text>{parse(description || "")}</Text>
        </Box>
        <Box py="5">
          <Text fontWeight="extrabold" fontSize="lg">
            Camps: {camps.length}
          </Text>
          <Box>
            {!!camps?.length &&
              camps.map((camp) => (
                <CampCard
                  key={camp.id}
                  details={camp as CardDetails}
                  isMobile
                  onSelect={() => {
                    return "";
                  }}
                  showDetails={() => {
                    return "";
                  }}
                />
              ))}
          </Box>
        </Box>
      </Container>
    );
  }
  if (status === "loading") {
    return (
      <Center w="100%" py="50vh">
        <Spinner />
      </Center>
    );
  }
};

export default ProviderDetails;
