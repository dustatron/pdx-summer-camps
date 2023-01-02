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
  FormHelperText,
} from "@chakra-ui/react";
import makeAnimated from "react-select/animated";
import Select, { MultiValue } from "react-select";
import {
  quadrantsOptions,
  QuadrantValues,
  ageOptions,
  AgeValues,
} from "../../types/camp";
import type { CampData, MultiSelectOption } from "../../types/camp";
import { useRouter } from "next/router";
import AddImage from "./AddImage";
import type { Feature } from "./AddressSelector";
import AddressSelector from "./AddressSelector";

type Status = "error" | "success" | "loading" | "idle";

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formState: CampData;
  dispatch: React.Dispatch<{
    type: string;
    payload: string | string[];
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
  const animatedComponents = makeAnimated();

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

  const setTags = (values: string) => {
    const tagsArray = values.toLowerCase().split(",");
    dispatch({
      type: "tags",
      payload: tagsArray,
    });
  };

  const getFormattedQuadrant = (values: string[]): MultiSelectOption[] | [] => {
    if (values) {
      return values.map((val) => ({
        value: val,
        label: QuadrantValues[val as keyof typeof QuadrantValues],
      }));
    }
    return [];
  };
  const getFormattedAges = (values: string[]): MultiSelectOption[] | [] => {
    if (values) {
      return values.map((val) => ({
        value: val,
        label: AgeValues[val as keyof typeof AgeValues],
      }));
    }
    return [];
  };

  const formatQuadrant = getFormattedQuadrant(formState.quadrant);

  const formatAges = getFormattedAges(formState.ages);

  const setQuadrant = (quadrants: MultiSelectOption[]) => {
    const toStringArray = quadrants.map((quad) => quad.value);
    dispatch({
      type: "quadrant",
      payload: toStringArray,
    });
  };
  const setAges = (ages: MultiSelectOption[]) => {
    const toStringArray = ages.map((age) => age.value);
    dispatch({
      type: "ages",
      payload: toStringArray,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack direction="row" w="100%" spacing={5}>
        <Stack direction="column" spacing={5} w="50%">
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
            <FormHelperText>Include https:// at the beginning</FormHelperText>
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
            <FormLabel>Phone</FormLabel>
            <Input
              type="text"
              value={formState.phone || ""}
              onChange={(e) =>
                dispatch({ type: "phone", payload: e.target.value })
              }
            />
          </FormControl>
        </Stack>
        <Stack spacing={5} w="50%">
          <FormControl>
            <FormLabel>Tags</FormLabel>
            <Input
              type="text"
              placeholder="Comma separated list"
              value={formState.tags || ""}
              onChange={(e) => setTags(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Quadrant</FormLabel>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={quadrantsOptions}
              value={formatQuadrant}
              onChange={(e) => setQuadrant(e as MultiSelectOption[])}
            />
            <FormHelperText>select none if not in Portland</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Age Range</FormLabel>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={ageOptions}
              value={formatAges}
              onChange={(e) => setAges(e as MultiSelectOption[])}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Price Per Camp</FormLabel>
            <Input type="number" />
          </FormControl>
          <FormControl>
            <FormLabel>Dates</FormLabel>
            <Input
              type="text"
              value={formState.quadrant || ""}
              onChange={(e) =>
                dispatch({ type: "dates", payload: e.target.value })
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
          <FormHelperText>Include https:// at the beginning</FormHelperText>
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
          <FormHelperText>Include https:// at the beginning</FormHelperText>
        </FormControl>
      </Stack>

      <FormControl marginTop="3">
        <>
          <Flex justifyContent="space-between">
            <FormLabel>Description</FormLabel>
            {formState && formState.description && (
              <Text color={formState.description.length > 2300 ? "red" : ""}>
                {formState.description.length}/2500
              </Text>
            )}
          </Flex>
          <Textarea
            height="4rem"
            value={formState.description || ""}
            placeholder="Full Address"
            maxLength={2500}
            minH="15rem"
            onChange={(e) =>
              dispatch({ type: "description", payload: e.target.value })
            }
          />
        </>
      </FormControl>

      <FormControl my="5" border="1px" rounded="md" p="3">
        <FormLabel>Address *</FormLabel>
        <AddressSelector onSelectAddress={onSelectAddress} />
        <Input type="text" isRequired value={formState.address} isDisabled />
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
