import React from "react";
import { useFormContext } from "react-hook-form";
import { Text, Box, Heading, Stack, Badge } from "@chakra-ui/react";
import type { ProviderSchema } from "../../../types/provider";
import type { MultiSelectOption } from "../../../types/camp";

interface BasicProps {
  title: string;
  value: string;
  hasError: boolean;
  errorMessage?: string;
  isHTML?: boolean;
}

function DisplayBasicData({
  title,
  value,
  hasError,
  errorMessage,
  isHTML,
}: BasicProps) {
  return (
    <Stack borderBottom="1px" borderColor="gray.300">
      <Box>
        <Text fontWeight="bold" textTransform="capitalize">
          {title}:
        </Text>
      </Box>
      <Box>
        {!hasError && !isHTML && <Text>{value}</Text>}
        {!hasError && isHTML && (
          <Text dangerouslySetInnerHTML={{ __html: value }} />
        )}
        {hasError && <Text color="red.400">{errorMessage}</Text>}
      </Box>
    </Stack>
  );
}

function DisplayMultiData({
  title,
  values,
  hasError,
}: {
  title: string;
  values: MultiSelectOption[];
  hasError: boolean;
}) {
  return (
    <Stack borderBottom="1px" borderColor="gray.300">
      <Text fontWeight="bold" textTransform="capitalize">
        {title}:
      </Text>
      {!hasError && values && (
        <Stack direction="row" spacing={2} padding="5">
          {values.map((val) => (
            <Badge
              key={val.value}
              px={2}
              py={1}
              bg="blue.100"
              fontWeight={"400"}
            >
              {val.label}
            </Badge>
          ))}
        </Stack>
      )}
      {!hasError && !values && <Text> - </Text>}

      {hasError && <Text color="red.400">No able to display details</Text>}
    </Stack>
  );
}
function Preview() {
  const {
    getValues,
    formState: { errors, isValid },
  } = useFormContext<ProviderSchema>();
  console.log("errors", errors);
  console.log("isValid", isValid);

  const values = Object.entries(getValues());
  console.log("values", values);

  const errorMap = new Map(Object.entries(errors));
  const valuesMap = new Map(values);

  return (
    <>
      <Heading size="md">Preview</Heading>
      {!isValid && <Text color="red.300">Errors need to be addressed</Text>}
      <Stack spacing={5}>
        <DisplayBasicData
          title={"title"}
          value={String(valuesMap.get("title") || "-")}
          hasError={errorMap.has("title")}
          errorMessage={errorMap.get("title")?.message}
        />
        <DisplayBasicData
          title={"address"}
          value={String(valuesMap.get("address") || "-")}
          hasError={errorMap.has("address")}
          errorMessage={errorMap.get("address")?.message}
        />
        <DisplayBasicData
          title={"website"}
          value={String(valuesMap.get("website") || "-")}
          hasError={errorMap.has("website")}
          errorMessage={errorMap.get("website")?.message}
        />
        <DisplayBasicData
          title={"email"}
          value={String(valuesMap.get("email") || "-")}
          hasError={errorMap.has("email")}
          errorMessage={errorMap.get("email")?.message}
        />
        <DisplayBasicData
          title={"phone"}
          value={String(valuesMap.get("phone") || "-")}
          hasError={errorMap.has("phone")}
          errorMessage={errorMap.get("phone")?.message}
        />
        <DisplayBasicData
          title={"Contact Name"}
          value={String(valuesMap.get("contactName") || "-")}
          hasError={errorMap.has("contactName")}
          errorMessage={errorMap.get("contactName")?.message}
        />
        <DisplayBasicData
          title={"facebook"}
          value={String(valuesMap.get("facebook") || "-")}
          hasError={errorMap.has("facebook")}
          errorMessage={errorMap.get("facebook")?.message}
        />
        <DisplayBasicData
          title={"instagram"}
          value={String(valuesMap.get("instagram") || "-")}
          hasError={errorMap.has("instagram")}
          errorMessage={errorMap.get("instagram")?.message}
        />
        <DisplayBasicData
          title={"Drop Off"}
          value={String(valuesMap.get("dropOff") || "-")}
          hasError={errorMap.has("dropOff")}
          errorMessage={errorMap.get("dropOff")?.message}
        />
        <DisplayBasicData
          title={"Pick Up"}
          value={String(valuesMap.get("pickUp") || "-")}
          hasError={errorMap.has("pickUp")}
          errorMessage={errorMap.get("pickUp")?.message}
        />
        <DisplayBasicData
          title={"Brief"}
          value={String(valuesMap.get("brief") || "-")}
          hasError={errorMap.has("brief")}
          errorMessage={errorMap.get("brief")?.message}
        />
        <DisplayBasicData
          title={"description"}
          value={String(valuesMap.get("description") || "-")}
          hasError={errorMap.has("description")}
          errorMessage={errorMap.get("description")?.message}
          isHTML
        />
        <DisplayMultiData
          title={"ages"}
          values={valuesMap.get("agesObject") as MultiSelectOption[]}
          hasError={errorMap.has("agesObject")}
        />
      </Stack>
    </>
  );
}

export default Preview;
