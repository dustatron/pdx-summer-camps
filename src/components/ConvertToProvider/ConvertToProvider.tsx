import { Button, useToast } from "@chakra-ui/react";
import type { Camp, CampImage } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Routes } from "../../types/sharedTypes";
import { trpc } from "../../utils/trpc";

type Props = {
  campData: Camp & { image: CampImage[] };
};

function ConvertToProvider({ campData }: Props) {
  const [providerId, setProviderId] = useState("");
  const toast = useToast();
  const router = useRouter();
  const { mutate: addCamp } = trpc.provider.addCamp.useMutation({
    onSuccess: () => {
      toast({
        title: `Added camp`,
        status: "success",
        isClosable: true,
        position: "top",
      });
      router.push(`${Routes.providerDetail}${providerId}`);
    },
  });
  const { mutate: addImage } = trpc.provider.addImage.useMutation({
    onSuccess: () => {
      toast({
        title: `Added Provider Image`,
        status: "success",
        isClosable: true,
        position: "top",
      });
      addCamp({ campId: campData.id, providerId });
    },
    onError: () => {
      toast({
        title: `Could not add image`,
        status: "error",
        isClosable: true,
        position: "top",
      });
    },
  });
  const { mutate: addProvider } = trpc.provider.addProvider.useMutation({
    onSuccess: (value) => {
      toast({
        title: `Added Provider`,
        status: "success",
        isClosable: true,
        position: "top",
      });
      setProviderId(value.id);
      if (campData.image[0]?.src) {
        addImage({
          providerId: value.id,
          src: campData.image[0]?.src,
          public_id: campData.image[0]?.public_id || "",
        });
      }
    },
    onError: () => {
      toast({
        title: `Could not add provider`,
        status: "error",
        isClosable: true,
        position: "top",
      });
    },
  });

  const handleSubmit = () => {
    if (!campData.email) {
      return toast({
        title: `Must have email`,
        status: "error",
        isClosable: true,
        position: "top",
      });
    }
    if (!campData.phone) {
      return toast({
        title: `Must have phone number`,
        status: "error",
        isClosable: true,
        position: "top",
      });
    }
    addProvider({
      ...campData,
      email: campData.email || "unknown",
      lat: String(campData.lat),
      lng: String(campData.lng),
      phone: campData.phone || "unknown",
    });
  };

  return (
    <Button colorScheme="cyan" onClick={handleSubmit}>
      Convert to provider
    </Button>
  );
}

export default ConvertToProvider;
