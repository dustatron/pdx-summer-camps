import React from "react";
import { Heading } from "@chakra-ui/react";
import { trpc } from "../utils/trpc";
import ProviderForm from "../components/ProviderForm";

const providers = () => {
  const { data, isLoading } = trpc.provider.getAllProviders.useQuery();
  return (
    <div>
      <Heading> Providers </Heading>
      <ProviderForm />
      <hr />
      {isLoading && <>...loading</>}
      {data && <>{JSON.stringify(data)}</>}
    </div>
  );
};

export default providers;
