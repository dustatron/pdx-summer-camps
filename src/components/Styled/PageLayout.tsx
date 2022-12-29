import Head from "next/head";
import React from "react";
import Navbar from "./NavBar";
import { useAlert } from "../../context/AlertContext";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Stack,
  Flex,
} from "@chakra-ui/react";
import AlertBar from "../AlertBar";

type Props = {
  children: React.ReactNode;
};

const PageLayout = ({ children }: Props) => {
  const { alert } = useAlert();

  return (
    <Stack direction="column" className="h-screen" spacing={0}>
      <Head>
        <title>PDX Summer Camps</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      {alert && <AlertBar alert={alert} />}
      <Box as="main" height="100%" bg="#FBFBFB">
        {children}
      </Box>
    </Stack>
  );
};

export default PageLayout;
