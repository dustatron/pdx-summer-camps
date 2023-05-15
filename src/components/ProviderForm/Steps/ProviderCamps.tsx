import { Box, Button } from "@chakra-ui/react";
import type { Camp, Provider } from "@prisma/client";
import { trpc } from "../../../utils/trpc";
import React from "react";

type Props = {
  provider: Provider & {
    camps: Camp[];
  };
};

const ProviderCamps = ({ provider }: Props) => {
  const { data, isLoading, refetch } = trpc.camps.getAllCamps.useQuery();
  const { data: campData, mutate: addCamp } =
    trpc.provider.addCamp.useMutation();

  console.log("campData", campData);
  const handleAddCamp = (campId: string) => {
    addCamp({ campId, providerId: provider.id });
    return "";
  };
  return (
    <>
      <Box>
        <div>Number of camps {provider.camps.length}</div>
        <Button onClick={() => refetch()}>Get Camp List</Button>
        {isLoading && <>...isLoading</>}
        <Box>
          {data &&
            data.map((camp) => (
              <Button key={camp.id} onClick={() => handleAddCamp(camp.id)}>
                {" "}
                {camp.title}
              </Button>
            ))}
        </Box>
      </Box>
    </>
  );
};

export default ProviderCamps;
