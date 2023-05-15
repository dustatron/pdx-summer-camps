import { useRouter } from "next/router";
import { Spinner, Center } from "@chakra-ui/react";
import React from "react";
import { trpc } from "../../../utils/trpc";
import ProviderForm from "../../../components/ProviderForm";

const EditProvider = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = trpc.provider.getProvider.useQuery(
    { providerId: id as string },
    {
      cacheTime: 0,
    }
  );

  if (isLoading) {
    return (
      <Center p="10" h="50vh">
        <Spinner />
      </Center>
    );
  }

  if (data) {
    return <ProviderForm isEdit provider={data} />;
  }
};

export default EditProvider;
