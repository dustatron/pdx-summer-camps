import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Box, Text, Stack, Button, FormLabel } from "@chakra-ui/react";
import type { MultiSelectOption } from "../../types/camp";
import { ageOptions, quadrantsOptions } from "../../types/camp";

type Props = {
  filterOptions: Set<string>;
  tagsSelected?: MultiSelectOption[];
  quadrantSelected?: MultiSelectOption[];
  ageSelected?: MultiSelectOption[];
  setTagsSelected: (val: MultiSelectOption[]) => void;
  setQuadrantSelected: (val: MultiSelectOption[]) => void;
  setAgeSelected: (val: MultiSelectOption[]) => void;
};

function FilterBox({
  filterOptions,
  tagsSelected,
  ageSelected,
  quadrantSelected,
  setTagsSelected,
  setAgeSelected,
  setQuadrantSelected,
}: Props) {
  const tagOptions: MultiSelectOption[] = [];
  filterOptions.forEach((tag) => tagOptions.push({ label: tag, value: tag }));

  const animatedComponents = makeAnimated();

  const clearAll = () => {
    setTagsSelected([]);
    setQuadrantSelected([]);
    setAgeSelected([]);
  };

  return (
    <Box
      bg="white"
      px="10"
      py="3"
      w="95%"
      border="1px"
      borderColor="gray.50"
      rounded="md"
      shadow="lg"
    >
      <Stack direction="row" justifyContent="space-between">
        <Box>
          <Text fontWeight="bold">Filters options</Text>
        </Box>
        <Button onClick={clearAll} colorScheme="linkedin">
          Clear All
        </Button>
      </Stack>

      <Stack direction="row">
        <Box py="4" width="50%">
          <FormLabel> Tags </FormLabel>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={tagOptions}
            value={tagsSelected}
            onChange={(e) => setTagsSelected(e as MultiSelectOption[])}
          />
        </Box>
        <Box py="4" width="50%">
          <FormLabel> Quadrants </FormLabel>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={quadrantsOptions}
            value={quadrantSelected}
            onChange={(e) => setQuadrantSelected(e as MultiSelectOption[])}
          />
        </Box>
      </Stack>
      <Stack direction="row">
        <Box py="4" width="100%">
          <FormLabel> Age Range </FormLabel>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={ageOptions}
            value={ageSelected}
            onChange={(e) => setAgeSelected(e as MultiSelectOption[])}
          />
        </Box>
      </Stack>
    </Box>
  );
}

export default FilterBox;
