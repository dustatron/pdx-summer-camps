import React from "react";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import { Box, Spinner } from "@chakra-ui/react";
import CampEditForm from "../../components/CampEditForm";
import type { CampData } from "../../types/camp";
import { useSession } from "next-auth/react";

import RenderTree from "../../components/RenderTree";
import CardDetail from "../../components/CardDetail";
import type { CampDetail } from "../../components/CardDetail/CardDetail";

const Show = () => {
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

  return (
    <RenderTree
      status={status}
      session={sessionData}
      isProtected
      finalRender={
        <CardDetail
          onBack={() => router.back()}
          campData={campData as unknown as CampDetail}
        />
      }
    />
  );
};

export default Show;