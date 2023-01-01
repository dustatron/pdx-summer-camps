import { Box, Text, Stack, Button, Flex } from "@chakra-ui/react";
import React from "react";

function FilterBox() {
  return (
    <Box bg="white" h="4rem" px="10" py="3" border="1px" borderColor="gray.200">
      <Stack direction="row" justifyContent="space-between">
        <Box>
          <Text fontWeight="bold">Filters options</Text>
        </Box>
        <Button>Clear</Button>
      </Stack>
      <Flex></Flex>
    </Box>
  );
}

export default FilterBox;
