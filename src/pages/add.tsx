import React from "react";
import {
  Container,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Button,
  Stack,
  Input,
  Textarea,
  Flex,
} from "@chakra-ui/react";

function add() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <Container
      marginTop="2rem"
      marginBottom="10rem"
      maxW={["100%", "100%", "60%"]}
      bg="white"
      py="10"
      rounded="md"
      centerContent
      border="2px"
      borderColor="gray.300"
    >
      <Heading textAlign="center">New Camp</Heading>
      <Box w="80%">
        <form onSubmit={onSubmit}>
          <Stack direction="row" w="100%" spacing={5}>
            <Stack direction="column" spacing={3} w="50%">
              <FormControl>
                <FormLabel>Came Name</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl>
                <FormLabel>Website</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl>
                <FormLabel>e-mail</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl>
                <FormLabel>lat</FormLabel>
                <Input type="text" />
              </FormControl>
            </Stack>
            <Stack spacing={3} w="50%">
              <FormControl>
                <FormLabel>Image</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl>
                <FormLabel>Tag</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl>
                <FormLabel>Quadrant</FormLabel>
                <Input type="text" />
              </FormControl>

              <FormControl>
                <FormLabel>lng</FormLabel>
                <Input type="text" />
              </FormControl>
            </Stack>
          </Stack>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl marginTop="3">
            <FormLabel>Description</FormLabel>
            <Textarea />
          </FormControl>
          <Flex marginTop="3" w="100%" justifyContent="end">
            <Button colorScheme="blue">Add Camp</Button>
          </Flex>
        </form>
      </Box>
    </Container>
  );
}

export default add;
