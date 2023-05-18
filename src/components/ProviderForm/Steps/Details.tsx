import {
  FormControl,
  FormLabel,
  Text,
  Heading,
  Input,
  Stack,
  FormHelperText,
  Flex,
  Box,
  Textarea,
} from "@chakra-ui/react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import type { ProviderSchema } from "../../../types/provider";
import "react-quill/dist/quill.snow.css";
import type { MultiSelectOption } from "../../../types/camp";
import { ageOptions } from "../../../types/camp";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function Details() {
  const {
    register,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useFormContext<ProviderSchema>();

  const animatedComponents = makeAnimated();

  const descriptionValue = getValues("description");

  return (
    <Stack spacing={5}>
      <Stack direction="row" spacing={10}>
        {/* Left */}
        <Stack spacing={10} w="50%">
          <FormControl>
            <FormLabel>ages</FormLabel>
            <Controller
              control={control}
              name="agesObject"
              render={({ field: { onChange, value } }) => (
                <Select
                  className="black-border"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={ageOptions as MultiSelectOption[]}
                  value={value}
                  onChange={(val) => onChange(val)}
                />
              )}
            />
            {errors.ages?.message && (
              <Text color="red.500">{errors.ages.message}</Text>
            )}
          </FormControl>
        </Stack>
        {/* Right  */}
        <Stack spacing={10} w="50%">
          <FormControl>
            <FormLabel>Drop Off Times</FormLabel>
            <Input type="time" {...register("dropOff")} />
            {errors.dropOff?.message && (
              <Text color="red.500">{errors.dropOff.message}</Text>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Pick Up Times</FormLabel>
            <Input type="time" {...register("pickUp")} />
            {errors.pickUp?.message && (
              <Text color="red.500">{errors.pickUp.message}</Text>
            )}
          </FormControl>
        </Stack>
      </Stack>

      <Heading size="md">Description</Heading>
      <FormControl>
        <FormLabel>Brief Description</FormLabel>
        <Textarea
          placeholder={"One sentence description"}
          {...register("brief")}
        />
        {errors.brief?.message && (
          <Text color="red.500">{errors.brief.message}</Text>
        )}
        <FormHelperText>
          Give a brief quick one or two sentence description of your camp
        </FormHelperText>
      </FormControl>
      <FormControl marginTop="3">
        <Flex justifyContent="space-between">
          <FormLabel>Long Description</FormLabel>
          {descriptionValue && (
            <Text color={descriptionValue.length > 2300 ? "red" : ""}>
              {descriptionValue.length}/2500
            </Text>
          )}
        </Flex>
        <Box h="300px" maxH="500px">
          <ReactQuill
            theme="snow"
            value={descriptionValue || ""}
            onChange={(e) => {
              setValue("description", e);
            }}
          />
        </Box>
      </FormControl>
    </Stack>
  );
}

export default Details;
