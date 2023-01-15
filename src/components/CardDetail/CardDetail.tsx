import {
  Badge,
  Box,
  Button,
  Center,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { Camp } from "@prisma/client";
import { BiArrowBack } from "react-icons/bi";
import { BsFacebook } from "react-icons/bs";
import { ImInstagram } from "react-icons/im";
import { useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AgeValues, QuadrantValues } from "../../types/camp";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useAlert } from "../../context/AlertContext";
import removeHttp from "../../utils/http";

type Favorite = { campId: string; userId: number; id: string };

export type CampDetail = Camp & { image: { src: string; id: string }[] } & {
  favorites: Favorite[];
};

type Props = { onBack: () => void; campData: CampDetail };

function CardDetail({ onBack, campData }: Props) {
  const [isFav, setIsFav] = useState(false);

  const [favorite, setFavorite] = useState<Favorite | undefined>();
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { addAlert } = useAlert();

  const { data: userData } = trpc.auth.getUser.useQuery({
    id: Number(sessionData?.user?.id),
  });

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
    addFav({ campId: id });
  };
  const formatAges = getFormattedAges(ages);

  return (
    <Stack spacing={3} p="3">
      <Stack
        direction="row"
        justifyContent="space-between"
        borderBottom="1px"
        paddingBottom="2"
        borderColor="gray.300"
      >
        <Button onClick={onBack}>
          <BiArrowBack /> Back
        </Button>
        <Button
          variant="ghost"
          onClick={handleFavoriteClick}
          isLoading={isLoadingAddFav || isLoadingRemoveFav}
        >
          {isFav ? <AiFillHeart size="md" /> : <AiOutlineHeart size="md" />}
        </Button>
      </Stack>
      <Center paddingTop="2">
        <Heading>{title}</Heading>
      </Center>
      <Center>
        {image?.map((img) => (
          <Image key={img.id} src={img.src} alt="image of camp" maxH="200px" />
        ))}
      </Center>
      <Box>
        <Text fontWeight="bold">Description:</Text>
        <Text>{description}</Text>
      </Box>
      <Box>
        <Text fontWeight="bold">Address:</Text>
        <Text>{address}</Text>
      </Box>
      <Box>
        <Text fontWeight="bold">Website:</Text>
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
      <Box>
        <Text fontWeight="bold">Email:</Text>
        {email && (
          <a href={`mailto:${email}`} target="_blank" rel="noreferrer">
            <Text color="blue.600" cursor="pointer">
              {email}
            </Text>
          </a>
        )}
        {!email && <Text>Not Provided</Text>}
      </Box>
      <Box>
        <Text fontWeight="bold">Phone:</Text>
        {phone && (
          <a href={`mailto:${phone}`} target="_blank" rel="noreferrer">
            <Text color="blue.600" cursor="pointer">
              {phone}
            </Text>
          </a>
        )}
        {!phone && <Text>Not Provided</Text>}
      </Box>
      <Box>
        <Text fontWeight="bold">Tags:</Text>
        {tags && (
          <Text color="blue.600" cursor="pointer">
            {tags.map((tag) => (
              <Badge key={`tag-${tag}`}>{tag}</Badge>
            ))}
          </Text>
        )}
        {!tags && <Text>Not Provided</Text>}
      </Box>
      <Box>
        <Text fontWeight="bold">Age Range:</Text>
        {ages && (
          <Text color="blue.600" cursor="pointer">
            {formatAges.map((age) => (
              <Badge mx="3" key={`age-${age}`}>
                {age}
              </Badge>
            ))}
          </Text>
        )}
        {!ages && <Text>Not Provided</Text>}
      </Box>

      <Box>
        <Text fontWeight="bold">Quadrant:</Text>
        {quadrant && (
          <Text color="blue.600" cursor="pointer">
            {formatQuadrant.map((quad) => (
              <Badge mx="3" key={`quad-${quad}`}>
                {quad}
              </Badge>
            ))}
          </Text>
        )}
        {!quadrant && <Text>Not Provided</Text>}
      </Box>

      <Box>
        <Text fontWeight="bold">Social Media:</Text>
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
          {!facebook && !instagram && <Text>Not Provided</Text>}
        </Stack>
      </Box>
      {userData?.role === "ADMIN" && (
        <Button onClick={() => router.push(`/detail/${id}`)}>Edit</Button>
      )}
    </Stack>
  );
}

export default CardDetail;
