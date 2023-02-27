import React from "react";
import { Heading, Box } from "@chakra-ui/react";
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
      {data && <Box>{data.length}</Box>}
      {data && (
        <>
          {data.map((provider) => (
            <Box key={provider.id}>
              {" "}
              <a href={`/providerdetail/${provider.id}`}>
                {provider.title}
              </a>{" "}
            </Box>
          ))}
        </>
      )}
    </div>
  );
};

export default providers;
