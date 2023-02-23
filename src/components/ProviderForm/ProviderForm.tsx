import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { providerSchema } from "../../types/provider";
import { useForm, FormProvider } from "react-hook-form";

import type * as z from "zod";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Text,
} from "@chakra-ui/react";
import ContactInfo from "./Steps/ContactInfo";
import Location from "./Steps/Location";
import Details from "./Steps/Details";
import Preview from "./Steps/Preview";

function ProviderForm() {
  const [step, setStep] = useState(1);
  type ProviderSchema = z.infer<typeof providerSchema>;
  const methods = useForm<ProviderSchema>({
    mode: "onBlur",
    resolver: zodResolver(providerSchema),
  });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((e) => console.log("submit", e))}>
        <Stack
          direction={{ sm: "column", md: "column", lg: "column" }}
          w="100%"
          p="5"
          spacing={5}
        >
          {step === 1 && <Location />}
          {step === 2 && <ContactInfo />}
          {step === 3 && <Details />}
          {step === 4 && <Preview />}
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
            <Button
              onClick={() => {
                methods.reset();
                setStep(1);
              }}
            >
              Clear
            </Button>
            <Button type="submit">Submit</Button>
          </Stack>
        </Stack>
      </form>
    </FormProvider>
  );
}

export default ProviderForm;
