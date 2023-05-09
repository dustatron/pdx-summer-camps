import { useRouter } from "next/router";
import React from "react";
import { trpc } from "../../utils/trpc";
import { Box } from "@chakra-ui/react";

const ProviderDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, status } = trpc.provider.getProvider.useQuery({
    providerId: id as string,
  });

  return (
    <div>
      ProviderDetails {id}
      {status === "success" && data && <>{data.title}</>}
      {status === "loading" && <>...loading</>}
      <Box> {JSON.stringify(data, null, 2)}</Box>
    </div>
  );
};

export default ProviderDetails;
