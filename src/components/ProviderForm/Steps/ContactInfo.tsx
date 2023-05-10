import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Heading,
  Stack,
  Divider,
  Box,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import type { ProviderSchema } from "../../../types/provider";

const ContactInfo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProviderSchema>();
  return (
    <Stack spacing={5}>
      <Heading pb="5">Contact Info</Heading>
      <Stack direction="row" spacing={10}>
        {/* Left */}
        <Box w="50%">
          <FormControl>
            <FormLabel>Name of organization *</FormLabel>
            <Input {...register("title")} />
            {errors.title?.message && (
              <Text color="red.500">{errors.title.message}</Text>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Website *</FormLabel>
            <Input {...register("website")} />
            {errors.website?.message && (
              <Text color="red.500">{errors.website.message}</Text>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Contact</FormLabel>
            <Input {...register("contact")} />
            {errors.contact?.message && (
              <Text color="red.500">{errors.contact.message}</Text>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Contact Name</FormLabel>
            <Input {...register("contactName")} />
            {errors.contactName?.message && (
              <Text color="red.500">{errors.contactName.message}</Text>
            )}
          </FormControl>
        </Box>

        {/* Right */}
        <Box w="50%">
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input {...register("email")} />
            {errors.email?.message && (
              <Text color="red.500">{errors.email.message}</Text>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Phone*</FormLabel>
            <Input {...register("phone")} isRequired />
            {errors.phone?.message && (
              <Text color="red.500">{errors.phone.message}</Text>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Facebook Profile Link</FormLabel>
            <Input {...register("facebook")} />
            {errors.facebook?.message && (
              <Text color="red.500">{errors.facebook.message}</Text>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Instagram Profile Link</FormLabel>
            <Input {...register("instagram")} />
            {errors.instagram?.message && (
              <Text color="red.500">{errors.instagram.message}</Text>
            )}
          </FormControl>
        </Box>
      </Stack>
    </Stack>
  );
};

export default ContactInfo;
