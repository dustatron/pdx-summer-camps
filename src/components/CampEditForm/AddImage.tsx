import React, { useState } from "react";
import {
  Box,
  FormLabel,
  Input,
  Button,
  FormControl,
  Stack,
  Image,
} from "@chakra-ui/react";
import { trpc } from "../../utils/trpc";
import { useAlert } from "../../context/AlertContext";

type Props = {
  campId: string;
};

function AddImage({ campId }: Props) {
  const [image, setImage] = useState("");
  const { addAlert } = useAlert();

  const { data: imageData, refetch } = trpc.camps.getImages.useQuery({
    campId,
  });

  const { mutate: removeImage } = trpc.camps.removeImage.useMutation({
    onSuccess: () => {
      addAlert({
        status: "success",
        title: "Success",
        body: "Removed Image",
        autoClose: true,
      });
      refetch();
    },

    onError: () => {
      addAlert({
        status: "error",
        title: "Error",
        body: "Unable to delete image",
      });
    },
  });

  const { mutate, status } = trpc.camps.addImage.useMutation({
    onSuccess: () => {
      addAlert({
        title: "Success",
        status: "success",
        body: "Image was added successfully",
      });
      refetch();
    },
  });

  const onSubmit = () => {
    mutate({ src: image, campId });
  };

  return (
    <Box>
      <Box padding={3} border="1px" my="3" rounded="md" borderColor="gray.400">
        <FormControl>
          <FormLabel>Add Image by URL</FormLabel>
          <Stack direction="row">
            <Input value={image} onChange={(e) => setImage(e.target.value)} />
            <Button onClick={onSubmit} isLoading={status === "loading"}>
              Add Image
            </Button>
          </Stack>
        </FormControl>
      </Box>
      <FormControl>
        <FormLabel>Images</FormLabel>
        <Box>
          {imageData && imageData.length === 0 && (
            <Box> No images provided </Box>
          )}
          {imageData &&
            imageData.map((img) => {
              return (
                <Box key={img.id}>
                  <Image src={img.src} alt="image of camp" />
                  <Button onClick={() => removeImage({ imgId: img.id! })}>
                    Delete Image
                  </Button>
                </Box>
              );
            })}
        </Box>
      </FormControl>
    </Box>
  );
}

export default AddImage;
