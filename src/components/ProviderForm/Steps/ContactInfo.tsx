import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import type { ProviderSchema } from "../../../types/provider";

const ContactInfo = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ProviderSchema>();
  return (
    <Stack spacing={5}>
      <Stack direction="row" spacing={5}>
        {/* Left */}
        <Stack w="50%" spacing={5}>
          <FormControl>
            <FormLabel>Organization Title *</FormLabel>
            <Input {...register("title")} />
            {errors.title?.message && (
              <Text color="red.500">{errors.title.message}</Text>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Website *</FormLabel>
            <InputGroup size="md">
              <Input
                type="text"
                isRequired
                placeholder="your website address"
                {...register("website")}
              />
            </InputGroup>
            {errors.website?.message && (
              <Text color="red.500">{errors.website.message}</Text>
            )}
          </FormControl>

          <FormControl>
            <FormLabel>Contact Title</FormLabel>
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
        </Stack>

        {/* Right */}
        <Stack w="50%" spacing={5}>
          <FormControl>
            <FormLabel>e-mail</FormLabel>
            <InputGroup size="md">
              <InputLeftAddon> @ </InputLeftAddon>
              <Input {...register("email")} />
            </InputGroup>
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
            <FormLabel>Tags</FormLabel>
            <Input
              type="text"
              placeholder="Comma separated list"
              {...register("tags")}
            />
          </FormControl>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={5}>
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
      </Stack>
    </Stack>
  );
};

export default ContactInfo;
