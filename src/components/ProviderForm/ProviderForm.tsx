import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { trpc } from "../../utils/trpc";
import type * as z from "zod";
import type { Camp, Provider } from "@prisma/client";

import {
  Accordion,
  AccordionIcon,
  AccordionPanel,
  Box,
  Button,
  Container,
  AccordionButton,
  Heading,
  AccordionItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import ContactInfo from "./Steps/ContactInfo";
import Location from "./Steps/Location";
import Details from "./Steps/Details";
import Preview from "./Steps/Preview";
import { useAlert } from "../../context/AlertContext";
import { useRouter } from "next/router";
import { providerSchema } from "../../types/provider";
import AddImage from "./AddImage";
import ProviderCamps from "./Steps/ProviderCamps";

interface FormProps {
  isEdit?: boolean;
  provider?: Provider;
}

function ProviderForm({ isEdit, provider }: FormProps) {
  const [isPreview, setIsPreview] = useState(false);
  const { addAlert } = useAlert();
  const router = useRouter();

  const { mutate: updateProviderMutation, isLoading } =
    trpc.provider.updateProvider.useMutation({
      onSuccess: () => {
        addAlert({
          status: "success",
          title: "Success",
          body: "New Provider added",
          autoClose: false,
        });
        router.push(`/providerdetail/${provider?.id}`);
      },
    });

  const { mutate: addProviderMutation, status } =
    trpc.provider.addProvider.useMutation({
      onSuccess: (provider) => {
        addAlert({
          status: "success",
          title: "Success",
          body: "New Provider added",
          autoClose: false,
        });
        router.push(`/providerdetail/${provider?.id}`);
      },
    });

  type ProviderSchema = z.infer<typeof providerSchema>;
  const methods = useForm<ProviderSchema>({
    mode: "onBlur",
    resolver: zodResolver(providerSchema),
    defaultValues: {
      ...provider,
      contact: provider?.contact || "",
      lat: String(provider?.lat),
      lng: String(provider?.lng),
      phone: String(provider?.phone),
    },
  });

  const submitForm = (form: any) => {
    console.log("form data", form);
    if (isEdit) {
      updateProviderMutation(form);
    }
    if (!isEdit) {
      addProviderMutation(form);
    }
  };
  return (
    <Container
      bg="white"
      marginTop="2rem"
      py="10"
      rounded="md"
      centerContent
      border="2px"
      borderColor="gray.100"
      boxShadow="2xl"
      maxW={{ sm: "100%", md: "100%", lg: "80%" }}
    >
      <Heading textAlign="center">
        {isEdit && provider && <> Edit {provider?.title}</>}
        {!isEdit && <>New Provider</>}
      </Heading>
      <FormProvider {...methods}>
        <Stack
          direction={{ sm: "column", md: "column", lg: "column" }}
          w={{ sm: "100%", md: "100%", lg: "80%" }}
          p="5"
          spacing={5}
        >
          <form onSubmit={methods.handleSubmit((e) => submitForm(e))}>
            {!isPreview && provider && (
              <>
                <Accordion defaultIndex={[0, 1, 2, 3]} allowMultiple>
                  <AccordionItem>
                    <Text as="h2" bg="gray.100">
                      <AccordionButton>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontWeight="bold"
                          fontSize="2xl"
                        >
                          Contact Info
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </Text>
                    <AccordionPanel pb={4}>
                      <ContactInfo />
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <Text as="h2" bg="gray.50">
                      <AccordionButton>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontWeight="bold"
                          fontSize="2xl"
                        >
                          Camp Details
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </Text>
                    <AccordionPanel pb={4}>
                      <Details />
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <Text as="h2" bgColor="gray.100">
                      <AccordionButton>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontWeight="bold"
                          fontSize="2xl"
                        >
                          Location
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </Text>
                    <AccordionPanel pb={4}>
                      <Location />
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <Text as="h2" bg="gray.50">
                      <AccordionButton>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontWeight="bold"
                          fontSize="2xl"
                        >
                          Images
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </Text>
                    <AccordionPanel pb={4}>
                      <AddImage providerId={provider.id} />
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <Text as="h2" bg="gray.100">
                      <AccordionButton>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontWeight="bold"
                          fontSize="2xl"
                        >
                          Camps
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </Text>
                    <AccordionPanel pb={4}>
                      <ProviderCamps
                        provider={provider as Provider & { camps: Camp[] }}
                      />
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </>
            )}
            {isPreview && <Preview />}
            <Stack direction="row" justifyContent="space-between" py="10">
              <Button
                onClick={() => {
                  // methods.reset();
                  setIsPreview(false);
                }}
              >
                back
              </Button>
              <Stack direction="row">
                {!isPreview && (
                  <Button colorScheme="blue" onClick={() => setIsPreview(true)}>
                    {isEdit ? <>Update</> : <>Submit</>}
                  </Button>
                )}
                {isPreview && (
                  <Button
                    type="submit"
                    isLoading={status === "loading" || isLoading}
                    colorScheme="green"
                  >
                    Confirm
                  </Button>
                )}
              </Stack>
            </Stack>
          </form>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default ProviderForm;
