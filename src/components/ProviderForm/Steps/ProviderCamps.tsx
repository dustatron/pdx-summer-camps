import {
  Center,
  Box,
  Button,
  Card,
  Heading,
  Stack,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import type { Camp, Provider } from "@prisma/client";
import { trpc } from "../../../utils/trpc";
import React from "react";
import CampCard, { CardDetails } from "../../CampCard";

type Props = {
  provider: Provider & {
    camps: Camp[];
  };
};

const ProviderCamps = ({ provider }: Props) => {
  const { data, isLoading, refetch } = trpc.camps.getAllCamps.useQuery(
    undefined,
    {
      enabled: false,
    }
  );
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
        <Tabs>
          <TabList>
            <Tab>Camps</Tab>
            <Tab>Add Camp</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Stack>
                <div>Number of camps {provider.camps.length}</div>
                {!!provider.camps.length &&
                  provider.camps.map((camp) => (
                    <CampCard
                      key={camp.id}
                      details={camp as unknown as CardDetails}
                      onSelect={() => {
                        return "";
                      }}
                      showDetails={() => {
                        return "";
                      }}
                    />
                  ))}
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack spacing={5}>
                <Box p="5">
                  <Button onClick={() => refetch()}>Get Camp List</Button>
                </Box>
                {isLoading && (
                  <Center>
                    <Spinner />
                  </Center>
                )}

                {data &&
                  data.map((camp) => (
                    <Card key={camp.id} p="5">
                      <Heading size="sm">{camp.title}</Heading>
                      <Button onClick={() => handleAddCamp(camp.id)}>
                        Add Camp
                      </Button>
                    </Card>
                  ))}
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Box></Box>
      </Box>
    </>
  );
};

export default ProviderCamps;
