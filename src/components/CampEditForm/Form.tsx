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
  Text,
} from "@chakra-ui/react";
import type { CampData } from "../../types/camp";
import { useRouter } from "next/router";
import AddImage from "./AddImage";
import AddressSelector, { Feature } from "./AddressSelector";

type Status = "error" | "success" | "loading" | "idle";

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formState: CampData;
  dispatch: React.Dispatch<{
    type: string;
    payload: string;
  }>;
  isEdit?: boolean;
  deleteCamp: (value: { campId: string }) => void;
  deleteImage: (value: { imgId: string }) => void;
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
  const { back } = useRouter();

  const onSelectAddress = (location: Feature) => {
    dispatch({
      type: "lng",
      payload: String(location.geometry.coordinates[0]),
    });
    dispatch({
      type: "lat",
      payload: String(location.geometry.coordinates[1]),
    });
    dispatch({
      type: "address",
      payload: String(location.place_name),
    });
  };

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
        </Stack>
        <Stack spacing={3} w="50%">
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
        </Stack>
      </Stack>
      <Stack direction="row" py="4">
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
      <FormControl marginTop="3">
        <FormLabel>Address *</FormLabel>
        <Input type="text" isRequired value={formState.address} isDisabled />
      </FormControl>
      <AddressSelector onSelectAddress={onSelectAddress} />
      <FormControl marginTop="3">
        {formState.description && (
          <>
            <Flex justifyContent="space-between">
              <FormLabel>Description</FormLabel>
              <Text color={formState.description.length > 2300 ? "red" : ""}>
                {formState.description.length}/2500
              </Text>
            </Flex>
            <Textarea
              height="4rem"
              value={formState.description || ""}
              isInvalid={formState.description.length > 2500}
              maxLength={2500}
              minH="15rem"
              onChange={(e) =>
                dispatch({ type: "description", payload: e.target.value })
              }
            />
          </>
        )}
      </FormControl>
      {isEdit && (
        <FormControl>
          <AddImage campId={formState.id!} />
        </FormControl>
      )}

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

            <Button onClick={back}>Cancel</Button>
          </Box>
        )}
        <Button
          type="submit"
          colorScheme="blue"
          isDisabled={updateStatus === "loading"}
          isLoading={updateStatus === "loading"}
        >
          {isEdit ? "Save" : "Add Camp"}
        </Button>
      </Flex>
    </form>
  );
};

export default Form;
