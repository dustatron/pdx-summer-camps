import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Button,
  Stack,
  Input,
  Textarea,
  Flex,
} from "@chakra-ui/react";
import type { CreateCampData } from "../../types/camp";

type Status = "error" | "success" | "loading" | "idle";

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formState: CreateCampData;
  dispatch: React.Dispatch<{
    type: string;
    payload: string;
  }>;
  isEdit?: boolean;
  deleteCamp: (value: { campId: string }) => void;
  updateStatus: Status;
  status: Status;
};

const Form = ({
  onSubmit,
  formState,
  dispatch,
  isEdit,
  deleteCamp,
  updateStatus,
}: Props) => {
  return (
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
              value={formState.email || ""}
              onChange={(e) =>
                dispatch({ type: "email", payload: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>lat</FormLabel>
            <Input
              type="text"
              value={formState.lat}
              onChange={(e) =>
                dispatch({ type: "lat", payload: e.target.value })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>lng</FormLabel>
            <Input
              type="text"
              value={formState.lng}
              onChange={(e) =>
                dispatch({ type: "lng", payload: e.target.value })
              }
            />
          </FormControl>
        </Stack>
        <Stack spacing={3} w="50%">
          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input
              type="text"
              value={formState.image || ""}
              onChange={(e) =>
                dispatch({ type: "image", payload: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Tag</FormLabel>
            <Input
              type="text"
              value={formState.tags || ""}
              onChange={(e) =>
                dispatch({ type: "tags", payload: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Quadrant</FormLabel>
            <Input
              type="text"
              value={formState.quadrant || ""}
              onChange={(e) =>
                dispatch({ type: "quadrant", payload: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Facebook</FormLabel>
            <Input
              type="text"
              value={formState.facebook || ""}
              onChange={(e) =>
                dispatch({ type: "facebook", payload: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Instagram</FormLabel>
            <Input
              type="text"
              value={formState.instagram || ""}
              onChange={(e) =>
                dispatch({ type: "instagram", payload: e.target.value })
              }
            />
          </FormControl>
        </Stack>
      </Stack>
      <FormControl marginTop="3">
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
          value={formState.description || ""}
          onChange={(e) =>
            dispatch({ type: "description", payload: e.target.value })
          }
        />
      </FormControl>
      <Flex
        marginTop="3"
        w="100%"
        justifyContent={isEdit ? "space-between" : "end"}
      >
        {isEdit && formState?.id && (
          <Box>
            <Button
              colorScheme="red"
              variant="outline"
              mr="2"
              onClick={() => deleteCamp({ campId: formState.id as string })}
            >
              Delete
            </Button>

            <Button> Cancel </Button>
          </Box>
        )}
        <Button
          type="submit"
          colorScheme="blue"
          isDisabled={status === "loading"}
          isLoading={status === "loading" || updateStatus === "loading"}
        >
          {isEdit ? "Save" : "Add Camp"}
        </Button>
      </Flex>
    </form>
  );
};

export default Form;
