import React, { useReducer } from "react";
import { Container, Box, Heading, useToast } from "@chakra-ui/react";

import { trpc } from "../../utils/trpc";
import type { CampData } from "../../types/camp";
import { campSchema } from "../../types/camp";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Form from "./Form";
import { useAlert } from "../../context/AlertContext";
import { Routes } from "../../types/sharedTypes";

const initialState: CampData = {
  lat: 0,
  lng: 0,
  title: "",
  address: "",
  website: "",
  email: "",
  description: "",
  tags: [],
  ages: [],
  quadrant: [],
  status: "UNKNOWN",
  brief: "",
  contactName: "",
  link: "",
  phone: "",
  facebook: "",
  instagram: "",
  pickUp: "",
  dropOff: "",
  price: "0",
  dateStart: "",
  dateEnd: "",
};

const reducer = (
  prevState: CampData,
  action: { type: string; payload: string | string[] | number }
) => {
  const { type, payload } = action;
  if (type !== "reset") {
    return { ...prevState, [type]: payload };
  } else if (type === "reset") {
    return initialState;
  } else {
    return prevState;
  }
};

type Props = {
  campData?: CampData;
  isEdit?: boolean;
  campId?: string;
  providerId?: string;
};

function CampEditForm({ campData, isEdit, campId, providerId }: Props) {
  const [formState, dispatch] = useReducer(reducer, campData || initialState);
  const toast = useToast();
  const { data: session } = useSession();

  const router = useRouter();

  const { mutate: deleteCamp } = trpc.camps.delete.useMutation({
    onSuccess: () => {
      const history = window.history.state.url;
      toast({
        title: `Camp was successfully deleted`,
        status: "success",
        isClosable: true,
        position: "top",
      });
      if (history === `${Routes.campDetail}${campData?.id}`) {
        router.push(Routes.home);
      } else {
        router.push(Routes.userCamps);
      }
    },
  });
  const { mutate: removeImage } = trpc.camps.removeImage.useMutation({
    onSuccess: () => {
      toast({
        title: `Removed Image`,
        status: "success",
        isClosable: true,
        position: "top",
      });
    },

    onError: () => {
      toast({
        title: `Unable to delete image`,
        status: "error",
        isClosable: true,
        position: "top",
      });
    },
  });

  const { mutate: addCamp, status } = trpc.camps.addCamp.useMutation({
    onSuccess: () => {
      toast({
        title: `New camp added`,
        status: "success",
        isClosable: true,
        position: "top",
      });
      router.push(Routes.userCamps);
    },
    onError: () => {
      toast({
        title: `Unable to save camp`,
        status: "error",
        isClosable: true,
        position: "top",
      });
    },
  });

  const { mutate: updateCamp, status: updateStatus } =
    trpc.camps.update.useMutation({
      onSuccess: () => {
        toast({
          title: `Successfully updated`,
          status: "success",
          isClosable: true,
          position: "top",
        });

        router.push(`${Routes.campDetail}${campData?.id}`);
      },
      onError: () => {
        toast({
          title: `Error: Unable so update camp`,
          status: "error",
          isClosable: true,
          position: "top",
        });
      },
    });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanFormData = Object.fromEntries(
      Object.entries(formState).filter(([_, v]) => v != null)
    ) as CampData;

    const validate = campSchema.safeParse(cleanFormData);
    console.log("validate", validate);

    if (!validate.success) {
      const error = validate.error.issues[0];

      toast({
        title: `Error: ${
          error?.message || "Form was not filled out correctly"
        }`,
        status: "error",
        isClosable: true,
        position: "top",
      });
    }

    if (isEdit && validate.success && campId) {
      updateCamp({ ...cleanFormData, id: campId });
    } else if (validate.success && session && session.user) {
      addCamp(providerId ? { ...cleanFormData, providerId } : cleanFormData);
    }
  };

  return (
    <Container
      bg="white"
      marginTop="2rem"
      py="10"
      rounded="md"
      centerContent
      border="2px"
      borderColor="gray.100"
      boxShadow="2xl"
      maxW={{ sm: "100%", md: "100%", lg: "80%" }}
    >
      <Heading textAlign="center">
        {isEdit ? "Edit Camp Details" : "New Camp"}
      </Heading>
      <Box w={{ sm: "100%", md: "100%", lg: "80%" }} marginTop={10}>
        <Form
          deleteCamp={deleteCamp}
          dispatch={dispatch}
          formState={formState}
          isEdit={isEdit}
          onSubmit={onSubmit}
          status={status}
          deleteImage={removeImage}
          updateStatus={updateStatus}
        />
      </Box>
    </Container>
  );
}

export default CampEditForm;
