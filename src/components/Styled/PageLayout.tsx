import Head from "next/head";
import React from "react";
import Navbar from "./NavBar";
import { Box, Stack } from "@chakra-ui/react";
type Props = {
  children: React.ReactNode;
};

const PageLayout = ({ children }: Props) => {
  return (
    <Stack direction="column" className="h-screen" spacing={0}>
      <Head>
        <title>PDX Summer Camps</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <Box as="main" height="100%" bg="#FBFBFB">
        {children}
      </Box>
    </Stack>
  );
};

export default PageLayout;
