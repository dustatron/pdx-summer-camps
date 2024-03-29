import React from "react";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import CampEditForm from "../../../components/CampEditForm";
import type { CampData } from "../../../types/camp";
import { useSession } from "next-auth/react";

import RenderTree from "../../../components/RenderTree";

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: sessionData } = useSession();

  const { data: campData, status } = trpc.camps.getCamp.useQuery(
    {
      campId: id as string,
    },
    {
      cacheTime: 0,
    }
  );

  const campEditData = {
    ...campData,
    images: campData?.image,
    lat: campData?.lat,
    lng: campData?.lng,
    email: campData?.email || "",
    facebook: campData?.facebook || "",
    instagram: campData?.instagram || "",
    link: campData?.link || "",
    place_id: campData?.link || "",
  };

  return (
    <RenderTree
      status={status}
      session={sessionData}
      isProtected
      finalRender={
        <CampEditForm
          campData={campEditData as CampData}
          isEdit
          campId={id as string}
        />
      }
    />
  );
};

export default Detail;
