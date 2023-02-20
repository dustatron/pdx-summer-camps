import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { providerSchema } from "../../types/provider";

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

function ProviderForm() {
  type ProviderSchema = z.infer<typeof providerSchema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProviderSchema>({
    mode: "onBlur",
    resolver: zodResolver(providerSchema),
  });
  console.log("errors", errors);
  return (
    <form onSubmit={handleSubmit((e) => console.log("submit", e))}>
      <Stack
        direction={{ sm: "column", md: "column", lg: "row" }}
        w="100%"
        spacing={5}
      >
        <FormControl>
          <FormLabel>Camp Title *</FormLabel>
          <Input placeholder={"Provider Title"} {...register("title")} />
          {errors.title?.message && (
            <Text color="red.500">{errors.title.message}</Text>
          )}
        </FormControl>
        <FormControl>
          <FormLabel>Address *</FormLabel>
          <Input {...register("address")} />
          {errors.address?.message && (
            <Text color="red.500">{errors.address.message}</Text>
          )}
        </FormControl>
        <FormControl>
          <FormLabel>website *</FormLabel>
          <Input {...register("website")} />
          {errors.website?.message && (
            <Text color="red.500">{errors.website.message}</Text>
          )}
        </FormControl>
        <FormControl>
          <FormLabel>Description </FormLabel>
          <Textarea {...register("description")} />
          {errors.description?.message && (
            <Text color="red.500">{errors.description.message}</Text>
          )}
        </FormControl>

        <FormControl>
          <FormLabel>Phone*</FormLabel>
          <Input {...register("phone")} isRequired />
          {errors.phone?.message && (
            <Text color="red.500">{errors.phone.message}</Text>
          )}
        </FormControl>
        <Button onClick={() => reset()}>Clear</Button>
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
}

export default ProviderForm;
