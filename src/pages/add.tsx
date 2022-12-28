import React, { useReducer } from "react";
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
import { trpc } from "../utils/trpc";
import { z } from "zod";
import { useSession } from "next-auth/react";

export const createCampSchema = z.object({
  title: z.string().max(150),
  address: z.string().max(255),
  website: z.string().max(150),
  email: z.string().max(100).optional(),
  link: z.string().optional(),
  facebook: z.string().max(150).optional(),
  instagram: z.string().optional(),
  description: z.string().max(500).optional(),
  image: z.string().optional(),
  location: z.object({
    lat: z.string(),
    lng: z.string(),
  }),
  tags: z.string().optional(),
  quadrant: z.string().optional(),
  userId: z.number(),
  authorName: z.string(),
});

type CreateCampData = z.input<typeof createCampSchema>;

const initialState: CreateCampData = {
  location: { lat: "", lng: "" },
  title: "",
  address: "",
  website: "",
  userId: 0,
  authorName: "",
};

const reducer = (
  prevState: CreateCampData,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;
  if (type.length > 3) {
    return { ...prevState, [type]: payload };
  } else if (type.length === 3) {
    return {
      ...prevState,
      location: { ...prevState.location, [type]: payload },
    };
  } else {
    return prevState;
  }
};

function Add() {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const { data: session, status: authStatus } = useSession();
  const { mutate: addCamp, status } = trpc.camps.addCamp.useMutation();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validate = createCampSchema.safeParse(formState);
    console.log("validate", validate);
    if (validate.success && session && session.user) {
      addCamp({
        ...formState,
        userId: Number(session.user.id),
        authorName: session.user.name as string,
      });
    }
  };

  console.log("formState", formState);
  console.log("session", session);
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
                <FormLabel>Camp Title *</FormLabel>
                <Input
                  type="text"
                  value={formState.title}
                  isRequired
                  onChange={(e) =>
                    dispatch({ type: "title", payload: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Website *</FormLabel>
                <Input
                  type="text"
                  value={formState.website}
                  isRequired
                  onChange={(e) =>
                    dispatch({ type: "website", payload: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>e-mail</FormLabel>
                <Input
                  type="text"
                  value={formState.email}
                  onChange={(e) =>
                    dispatch({ type: "email", payload: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>lat</FormLabel>
                <Input
                  type="text"
                  value={formState.location.lat}
                  onChange={(e) =>
                    dispatch({ type: "lat", payload: e.target.value })
                  }
                />
              </FormControl>
            </Stack>
            <Stack spacing={3} w="50%">
              <FormControl>
                <FormLabel>Image</FormLabel>
                <Input
                  type="text"
                  value={formState.image}
                  onChange={(e) =>
                    dispatch({ type: "image", payload: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Tag</FormLabel>
                <Input
                  type="text"
                  value={formState.tags}
                  onChange={(e) =>
                    dispatch({ type: "tags", payload: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Quadrant</FormLabel>
                <Input
                  type="text"
                  value={formState.quadrant}
                  onChange={(e) =>
                    dispatch({ type: "quadrant", payload: e.target.value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>lng</FormLabel>
                <Input
                  type="text"
                  value={formState.location.lng}
                  onChange={(e) =>
                    dispatch({ type: "lng", payload: e.target.value })
                  }
                />
              </FormControl>
            </Stack>
          </Stack>
          <FormControl>
            <FormLabel>Address *</FormLabel>
            <Input
              type="text"
              isRequired
              value={formState.address}
              onChange={(e) =>
                dispatch({ type: "address", payload: e.target.value })
              }
            />
          </FormControl>
          <FormControl marginTop="3">
            <FormLabel>Description</FormLabel>
            <Textarea
              value={formState.description}
              onChange={(e) =>
                dispatch({ type: "description", payload: e.target.value })
              }
            />
          </FormControl>
          <Flex marginTop="3" w="100%" justifyContent="end">
            <Button
              type="submit"
              colorScheme="blue"
              isDisabled={status === "loading"}
            >
              {status === "loading" ? "...Adding" : "Add Camp"}
            </Button>
          </Flex>
        </form>
      </Box>
    </Container>
  );
}

export default Add;
