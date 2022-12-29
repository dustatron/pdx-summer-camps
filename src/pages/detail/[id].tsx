import React from "react";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import { Box, Container, Text, Spinner, Heading } from "@chakra-ui/react";
import CampEditForm from "../../components/CampEditForm";
import type { CreateCampData } from "../../components/CampEditForm/CampEditForm";
import { useSession } from "next-auth/react";

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: sessionData, status: sessionStatus } = useSession();

  const {
    data: campData,
    status,
    isSuccess,
    isLoading,
  } = trpc.camps.getCamp.useQuery({
    campId: id as string,
  });

  console.log("campData", campData);

  if (sessionData && sessionData.user && campData) {
    const campEditData = {
      ...campData,
      image: campData?.image[0]?.src || "",
      lat: String(campData.lat),
      lng: String(campData.lng),
      email: campData.email || "",
      facebook: campData.facebook || "",
      instagram: campData.instagram || "",
      link: campData.link || "",
      place_id: campData.link || "",
      userId: Number(sessionData.user.id),
      authorName: sessionData?.user?.name as string,
    };
    return (
      <>
        <CampEditForm
          campData={campEditData as CreateCampData}
          isEdit
          campId={id as string}
        />
      </>
    );
  }
  if (sessionStatus === "authenticated") {
    return <Box>You need to be logged in to see this page</Box>;
  }
  return (
    <Box>
      <Spinner />
    </Box>
  );
};

export default Detail;
