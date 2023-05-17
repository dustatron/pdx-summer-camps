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
  Stack,
  Text,
} from "@chakra-ui/react";
import parse from "html-react-parser";
import { BiArrowBack } from "react-icons/bi";
import { BsFacebook } from "react-icons/bs";
import { ImInstagram } from "react-icons/im";
import { useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { CampDetailFromAPI } from "../../types/camp";
import { AgeValues, QuadrantValues } from "../../types/camp";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useAlert } from "../../context/AlertContext";
import removeHttp from "../../utils/http";
import formatDate from "../../utils/formatDate";
import { CldImage } from "next-cloudinary";

type Favorite = { campId: string; userId: number; id: string };

type Props = { onBack: () => void; campData: CampDetailFromAPI };

function CardDetail({ onBack, campData }: Props) {
  const [isFav, setIsFav] = useState(false);

  const [favorite, setFavorite] = useState<Favorite | undefined>();
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { addAlert } = useAlert();

  const { data: userData } = trpc.auth.getUser.useQuery(
    {
      id: Number(sessionData?.user?.id),
    },
    {
      retry: false,
    }
  );

  const {
    title,
    image,
    description,
    website,
    facebook,
    instagram,
    address,
    email,
    quadrant,
    tags,
    id,
    ages,
    phone,
    status,
    favorites,
    authorName,
    brief,
    contactName,
    dateEnd,
    dateStart,
    dropOff,
    pickUp,
    price,
  } = campData;

  const getFormattedQuadrant = (values: string[]): string[] | [] => {
    if (values) {
      return values.map(
        (val) => QuadrantValues[val as keyof typeof QuadrantValues]
      );
    }
    return [];
  };
  const formatQuadrant = getFormattedQuadrant(quadrant);

  const getFormattedAges = (values: string[]): string[] => {
    if (values) {
      return values
        .sort()
        .map((val) => AgeValues[val as keyof typeof AgeValues]);
    }
    return [];
  };

  const { mutate: addFav, isLoading: isLoadingAddFav } =
    trpc.favorites.addFavorite.useMutation({
      onSuccess: () => {
        setIsFav(true);
      },
    });
  const { mutate: removeFav, isLoading: isLoadingRemoveFav } =
    trpc.favorites.removeFavorite.useMutation({
      onSuccess: () => {
        setIsFav(false);
        setFavorite(undefined);
      },
    });

  useEffect(() => {
    const thisFav = campData?.favorites?.find(
      (fav) => fav.userId === userData?.id
    );
    setFavorite(thisFav);
    setIsFav(!!thisFav);
  }, [campData.favorites, userData]);

  const handleFavoriteClick = () => {
    if (!userData) {
      return addAlert({
        status: "error",
        title: "Error",
        body: "You must be logged in to favorite this camp",
        autoClose: true,
      });
    }

    if (favorite?.id) {
      return removeFav({ id: favorite.id });
    }
    addFav({ campId: id || "" });
  };
  const formatAges = getFormattedAges(ages);

  return (
    <Box>
      <Container
        my="5"
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
          <Button onClick={onBack}>
            <BiArrowBack /> Back
          </Button>
          {userData?.role === "ADMIN" && (
            <Button
              colorScheme="facebook"
              onClick={() => router.push(`/camp/edit/${id}`)}
              w="100px"
            >
              Edit
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={handleFavoriteClick}
            isLoading={isLoadingAddFav || isLoadingRemoveFav}
          >
            {isFav ? (
              <Icon as={AiFillHeart} h="40px" w="40px" />
            ) : (
              <Icon as={AiOutlineHeart} h="40px" w="40px" />
            )}
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
                    href={`https://maps.google.com/?q=${encodeURI(
                      campData.address
                    )}`}
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
                  {price ? `$${price}` : "No Price Provided"}
                </Text>
              </Box>
            </Stack>
            <Divider />

            <Stack w="100%" direction="column">
              <Stack direction="row" border="1px" w="100%" p="2">
                <Box w="50%">
                  <Text fontWeight="extrabold" fontSize="lg">
                    Start Date
                  </Text>
                  <Text>{formatDate(dateStart)}</Text>
                  {!dateStart && <Text>Not Provided</Text>}
                </Box>
                <Divider orientation="vertical" />
                <Box w="50%">
                  <Text fontWeight="extrabold" fontSize="lg">
                    End Date
                  </Text>
                  <Text>{formatDate(dateEnd)}</Text>
                  {!dateEnd && <Text>Not Provided</Text>}
                </Box>
              </Stack>
              <Stack direction="row" border="1px" w="100%" p="2">
                <Box w="50%">
                  <Text fontWeight="extrabold" fontSize="lg">
                    Drop Off Time
                  </Text>
                  <Text>{dropOff}</Text>
                  {!dropOff && <Text>Not Provided</Text>}
                </Box>
                <Divider orientation="vertical" />
                <Box w="50%">
                  <Text fontWeight="extrabold" fontSize="lg">
                    Pick Up Time
                  </Text>
                  <Text>{pickUp}</Text>
                  {!pickUp && <Text>Not Provided</Text>}
                </Box>
              </Stack>
            </Stack>
            <Box>
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
            <Stack direction="row">
              <Box w="50%">
                <Text fontWeight="extrabold" fontSize="lg">
                  Status
                </Text>
                <Text color="blue.600" cursor="pointer">
                  <Badge key={`tag-${status}}`}>{status}</Badge>
                </Text>
              </Box>

              <Box w="50%">
                <Text fontWeight="extrabold" fontSize="lg">
                  Quadrant
                </Text>
                {quadrant &&
                  formatQuadrant.map((quad) => (
                    <Badge mx="3" key={`quad-${quad}`}>
                      {quad}
                    </Badge>
                  ))}
                {!quadrant && <Text>Not Provided</Text>}
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
        <Box my="5">
          <Text fontWeight="extrabold" fontSize="lg">
            Description
          </Text>
          <Text>{parse(description || "")}</Text>
        </Box>
        <Stack
          spacing={4}
          w="100%"
          border="1px"
          p="5"
          mt="5"
          bg="gray.100"
          borderColor="gray.300"
          rounded="md"
        >
          <Flex>
            <Text fontWeight="extrabold" fontSize="lg" mr="5">
              This camp posting was created by:{" "}
            </Text>
            <Text>
              {authorName ? authorName : "Portland Kid Camps site admin"}
            </Text>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
}

export default CardDetail;
