import { useRouter } from "next/router";
import React from "react";
import { trpc } from "../../utils/trpc";

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
    </div>
  );
};

export default ProviderDetails;
