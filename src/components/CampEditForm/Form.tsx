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
  Select as ChakraSelect,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import makeAnimated from "react-select/animated";
import Select from "react-select";
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
    payload: string | string[] | number;
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
      payload: location.geometry.coordinates[0] || "",
    });
    dispatch({
      type: "lat",
      payload: location.geometry.coordinates[1] || "",
    });
    dispatch({
      type: "address",
      payload: location.place_name,
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
  const formatQuadrant = getFormattedQuadrant(formState.quadrant);

  const getFormattedAges = (values: string[]): MultiSelectOption[] | [] => {
    if (values) {
      return values.map((val) => ({
        value: val,
        label: AgeValues[val as keyof typeof AgeValues],
      }));
    }
    return [];
  };
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
      <Stack
        direction={{ sm: "column", md: "column", lg: "row" }}
        w="100%"
        spacing={5}
      >
        <Stack
          direction="column"
          spacing={5}
          w={{ sm: "100%", md: "100%", lg: "50%" }}
        >
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
            <InputGroup size="md">
              <InputLeftAddon> http:// </InputLeftAddon>
              <Input
                type="text"
                placeholder="your website address"
                value={formState.website}
                isRequired
                onChange={(e) =>
                  dispatch({ type: "website", payload: e.target.value })
                }
              />
            </InputGroup>
            <FormHelperText>
              Please link directly to your camps page
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>e-mail</FormLabel>
            <InputGroup size="md">
              <InputLeftAddon> @ </InputLeftAddon>
              <Input
                type="email"
                value={formState.email || ""}
                onChange={(e) =>
                  dispatch({ type: "email", payload: e.target.value })
                }
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input
              type="tel"
              value={formState.phone || ""}
              placeholder="Number parents can use"
              onChange={(e) =>
                dispatch({ type: "phone", payload: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Contact Name</FormLabel>
            <Input
              type="text"
              value={formState.contactName || ""}
              onChange={(e) =>
                dispatch({ type: "contactName", payload: e.target.value })
              }
            />
          </FormControl>
        </Stack>
        <Stack spacing={5} w={{ sm: "100%", md: "100%", lg: "50%" }}>
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
              className="black-border"
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
            <FormLabel>Status</FormLabel>
            <ChakraSelect>
              <option value="UNKNOWN">Unknown</option>
              <option value="OPEN">Open</option>
              <option value="FULL">Full</option>
            </ChakraSelect>
          </FormControl>
          <FormControl>
            <FormLabel>price</FormLabel>
            <InputGroup size="md">
              <InputLeftAddon> $ </InputLeftAddon>
              <Input
                type="number"
                placeholder="Time kids can show up"
                value={formState.price || ""}
                onChange={(e) =>
                  dispatch({ type: "price", payload: e.target.value })
                }
              />
            </InputGroup>
          </FormControl>
        </Stack>
      </Stack>
      <Stack pt="10" direction={{ sm: "column", md: "column", lg: "row" }}>
        <FormControl>
          <FormLabel>Drop off time</FormLabel>
          <Input
            type="time"
            placeholder="Time kids can show up"
            value={formState.dropOff || ""}
            onChange={(e) =>
              dispatch({ type: "dropOff", payload: e.target.value })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Pickup time</FormLabel>
          <Input
            type="time"
            placeholder="Time the camp ends"
            value={formState.pickUp || ""}
            onChange={(e) =>
              dispatch({ type: "pickUp", payload: e.target.value })
            }
          />
        </FormControl>
      </Stack>
      <Stack pt="10" direction={{ sm: "column", md: "column", lg: "row" }}>
        <FormControl>
          <FormLabel>Start Date</FormLabel>
          <Input
            type="date"
            placeholder="Time kids can show up"
            value={formState.dateStart}
            onChange={(e) =>
              dispatch({ type: "dateStart", payload: e.target.value })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>End Date</FormLabel>
          <Input
            type="date"
            placeholder="Time the camp ends"
            value={formState.dateEnd}
            onChange={(e) =>
              dispatch({ type: "dateEnd", payload: e.target.value })
            }
          />
        </FormControl>
      </Stack>
      <FormControl my="5" border="1px" rounded="md" p="3">
        <FormLabel>Address *</FormLabel>
        <Text>Please search your address and select it from the results</Text>
        <AddressSelector
          onSelectAddress={onSelectAddress}
          placeholder="your camps address"
        />
        <Input
          type="text"
          isRequired
          value={formState.address}
          isDisabled
          placeholder="Final Address"
        />
      </FormControl>

      <Box bg="black" h="1px" mt="25px" mb="25px" />

      <FormControl marginTop="3">
        <FormLabel>Brief</FormLabel>
        <Textarea
          height="1rem"
          value={formState.brief || ""}
          onChange={(e) => dispatch({ type: "brief", payload: e.target.value })}
        />
        <FormHelperText>
          Give a brief quick one or two sentence description of your camp
        </FormHelperText>
      </FormControl>
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
      <Box bg="black" h="1px" mt="25px" mb="25px" />

      <Stack direction={{ sm: "column", lg: "row" }} py="4">
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

      {isEdit && formState.id && (
        <FormControl>
          <AddImage campId={formState.id} />
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
