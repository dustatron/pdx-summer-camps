import React, { useState, useCallback } from "react";
import {
  Box,
  FormLabel,
  Input,
  Button,
  FormControl,
  Stack,
  Image,
  Heading,
  Tabs,
  Text,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { trpc } from "../../utils/trpc";
import type { FileWithPath } from "react-dropzone";
import { useDropzone } from "react-dropzone";
import { useAlert } from "../../context/AlertContext";

type Props = {
  providerId: string;
  images?: [];
};

const CLOUDINARY_UPLOAD_PRESET = "basic-preset";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dtqlulaog/image/upload";

export default function AddImage({ providerId }: Props) {
  const [urlImage, setUrlImage] = useState("");
  const { addAlert } = useAlert();

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    acceptedFiles.forEach((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      console.log("file", file.path);

      fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          mutate({
            src: data.url,
            providerId,
            asset_id: data.asset_id,
            created_at: data.created_at,
            folder: data.folder,
            original_filename: data.original_filename,
            public_id: data.public_id,
          });
        })
        .catch((err) => console.error(err));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const { data: imageData, refetch } = trpc.provider.getImages.useQuery({
    providerId,
  });

  const { mutate: removeImage } = trpc.provider.removeImage.useMutation({
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

  const { mutate, status } = trpc.provider.addImage.useMutation({
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
    const formData = new FormData();
    formData.append("file", urlImage);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    console.log("file", urlImage);

    fetch(CLOUDINARY_UPLOAD_URL, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        mutate({
          src: data.url,
          providerId,
          asset_id: data.asset_id,
          created_at: data.created_at,
          folder: data.folder,
          original_filename: data.original_filename,
          public_id: data.public_id,
        });
      })
      .catch((err) => console.error(err));
    // mutate({ src: image, campId });
  };

  return (
    <Box>
      <Tabs>
        <TabList>
          <Tab>Upload Image</Tab>
          <Tab>Use Image URL</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box
              border="2px"
              borderColor="gray.300"
              borderStyle="dashed"
              rounded="md"
              backgroundColor="gray.50"
              p="10"
              cursor="pointer"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <Text w="100%" textAlign="center">
                  Drop the files here ...
                </Text>
              ) : (
                <Text w="100%" textAlign="center">
                  Drag &apos;n&apos; drop a here, or click to select files
                </Text>
              )}
            </Box>
          </TabPanel>
          <TabPanel>
            <Box
              padding={3}
              border="1px"
              my="3"
              rounded="md"
              borderColor="gray.400"
            >
              <FormControl>
                <FormLabel>Add Image by URL</FormLabel>
                <Stack direction="row">
                  <Input
                    value={urlImage}
                    onChange={(e) => setUrlImage(e.target.value)}
                  />
                  <Button onClick={onSubmit} isLoading={status === "loading"}>
                    Add Image
                  </Button>
                </Stack>
              </FormControl>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <FormControl>
        <Heading>Images</Heading>
        <Box>
          {imageData && imageData.length === 0 && (
            <Box> No images provided </Box>
          )}
          {imageData &&
            imageData.map((img) => {
              return (
                <Box
                  key={img.id}
                  p="5"
                  border="1px"
                  borderColor="gray.200"
                  m="2"
                >
                  <Image src={img.src} alt="image of camp" />
                  <Button
                    mt="3"
                    colorScheme="red"
                    variant="outline"
                    onClick={() =>
                      removeImage({ imgId: img.id, public_id: img.public_id })
                    }
                  >
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
