import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { providerSchema } from "../../types/provider";
import { useForm, FormProvider } from "react-hook-form";
import { trpc } from "../../utils/trpc";
import type * as z from "zod";

import { Button, Container, Divider, Heading, Stack } from "@chakra-ui/react";
import ContactInfo from "./Steps/ContactInfo";
import Location from "./Steps/Location";
import Details from "./Steps/Details";
import Preview from "./Steps/Preview";
import { useAlert } from "../../context/AlertContext";
import { useRouter } from "next/router";

function ProviderForm() {
  const [step, setStep] = useState(1);
  const { addAlert } = useAlert();
  const router = useRouter();

  const { mutate, status } = trpc.provider.addProvider.useMutation({
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
  });

  const submitForm = (form: any) => {
    console.log("form data", form);

    mutate(form);
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
      <Heading textAlign="center"> New Provider </Heading>
      <FormProvider {...methods}>
        <Stack
          direction={{ sm: "column", md: "column", lg: "column" }}
          w={{ sm: "100%", md: "100%", lg: "80%" }}
          p="5"
          spacing={5}
        >
          <form onSubmit={methods.handleSubmit((e) => submitForm(e))}>
            <Location />
            <Divider m="5" />
            <ContactInfo />
            <Divider m="5" />
            <Details />
            <Divider m="5" />
            {step === 4 && <Preview />}
            <Stack direction="row" justifyContent="space-between">
              <Button
                onClick={() => {
                  methods.reset();
                  setStep(1);
                }}
              >
                Clear
              </Button>
              <Stack direction="row">
                {step > 1 && (
                  <Button colorScheme="blue" onClick={() => setStep(step - 1)}>
                    Back
                  </Button>
                )}
                {step < 4 && (
                  <Button colorScheme="blue" onClick={() => setStep(step + 1)}>
                    Next
                  </Button>
                )}
                {step === 4 && (
                  <>
                    <Button type="submit" isLoading={status === "loading"}>
                      Submit
                    </Button>
                  </>
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
