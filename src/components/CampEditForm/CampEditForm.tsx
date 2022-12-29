import React, { useReducer } from "react";
import { Container, Box, Heading } from "@chakra-ui/react";

import { trpc } from "../../utils/trpc";
import type { CreateCampData } from "../../types/camp";
import { createCampSchema } from "../../types/camp";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Form from "./Form";
import { useAlert } from "../../context/AlertContext";

let initialState: CreateCampData = {
  lat: "",
  lng: "",
  title: "",
  address: "",
  website: "",
  userId: 0,
  authorName: "",
  email: "",
  description: "",
};

const reducer = (
  prevState: CreateCampData,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;
  if (type) {
    return { ...prevState, [type]: payload };
  } else {
    return prevState;
  }
};

type Props = {
  campData?: CreateCampData;
  isEdit?: boolean;
  campId?: string;
};

function CampEditForm({ campData, isEdit, campId }: Props) {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const { data: session } = useSession();
  const { addAlert } = useAlert();

  const router = useRouter();

  if (campData) initialState = campData;

  const { mutate: deleteCamp } = trpc.camps.delete.useMutation({
    onSuccess: () => {
      router.push("/your-camps");
    },
  });

  const { mutate: addCamp, status } = trpc.camps.addCamp.useMutation({
    onSuccess: () => {
      router.push("/your-camps");
    },
    onError: () => {
      addAlert({
        status: "error",
        title: "Error",
        body: "Unable to save camp",
      });
    },
  });

  const { mutate: updateCamp, status: updateStatus } =
    trpc.camps.update.useMutation({
      onSuccess: () => {
        router.push("/your-camps");
      },
      onError: () => {
        addAlert({
          status: "error",
          title: "Error",
          body: "Unable so update camp",
        });
      },
    });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validate = createCampSchema.safeParse(formState);
    console.log("validate", validate);

    if (isEdit && validate.success && campId) {
      updateCamp({ ...formState, id: campId });
    } else if (validate.success && session && session.user) {
      addCamp({
        ...formState,
        userId: Number(session.user.id),
        authorName: session.user.name as string,
      });
    }
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
      <Heading textAlign="center">
        {isEdit ? "Edit Camp Details" : "New Camp"}
      </Heading>
      <Box w="80%" marginTop={10}>
        <Form
          deleteCamp={deleteCamp}
          dispatch={dispatch}
          formState={formState}
          isEdit={isEdit}
          onSubmit={onSubmit}
          status={status}
          updateStatus={updateStatus}
        />
      </Box>
    </Container>
  );
}

export default CampEditForm;
