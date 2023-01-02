import React, { useReducer } from "react";
import { Container, Box, Heading } from "@chakra-ui/react";

import { trpc } from "../../utils/trpc";
import type { CampData } from "../../types/camp";
import { campSchema } from "../../types/camp";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Form from "./Form";
import { useAlert } from "../../context/AlertContext";

const initialState: CampData = {
  lat: "",
  lng: "",
  title: "",
  address: "",
  website: "",
  userId: 0,
  authorName: "",
  email: "",
  description: "",
  image: [],
  tags: [],
  ages: [],
  quadrant: [],
};

const reducer = (
  prevState: CampData,
  action: { type: string; payload: string | string[] }
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
};

function CampEditForm({ campData, isEdit, campId }: Props) {
  const [formState, dispatch] = useReducer(reducer, campData || initialState);
  const { data: session } = useSession();
  const { addAlert } = useAlert();

  const router = useRouter();

  const { mutate: deleteCamp } = trpc.camps.delete.useMutation({
    onSuccess: () => {
      const history = window.history.state.url;
      addAlert({
        status: "success",
        title: "Success",
        body: "Camp was successfully deleted",
        autoClose: true,
      });
      if (history === "/detail/[id]") {
        router.push("/");
      } else {
        router.push("/your-camps");
      }
    },
  });
  const { mutate: removeImage } = trpc.camps.removeImage.useMutation({
    onSuccess: () => {
      addAlert({
        status: "success",
        title: "Success",
        body: "Removed Image",
        autoClose: true,
      });
    },

    onError: () => {
      addAlert({
        status: "error",
        title: "Error",
        body: "Unable to delete image",
      });
    },
  });

  const { mutate: addCamp, status } = trpc.camps.addCamp.useMutation({
    onSuccess: () => {
      addAlert({
        status: "success",
        title: "Success",
        body: "New camp added",
        autoClose: true,
      });
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
        const history = window.history.state.url;

        addAlert({
          status: "success",
          title: "Success",
          body: "Camp details updated",
          autoClose: true,
        });
        if (history === "/detail/[id]") {
          router.push("/");
        } else {
          router.push("/your-camps");
        }
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
    const validate = campSchema.safeParse(formState);
    console.log("validate", validate);

    if (!validate.success) {
      const error = validate.error.issues[0];
      addAlert({
        status: "error",
        title: String(error?.path[0]),
        body: error?.message || "Form was not filled out correctly",
      });
    }

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
          deleteImage={removeImage}
          updateStatus={updateStatus}
        />
      </Box>
    </Container>
  );
}

export default CampEditForm;
