import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { MapProvider } from "react-map-gl";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import AlertContextProvider from "../context/AlertContext";
import "mapbox-gl/dist/mapbox-gl.css";
import { trpc } from "../utils/trpc";
import "../styles/globals.css";

import PageLayout from "../components/Styled/PageLayout";

const theme = extendTheme({
  breakpoints: {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
  },
  styles: {
    global: {
      body: {
        bg: "#F7FAFC",
      },
    },
  },
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ChakraProvider theme={theme}>
      <AlertContextProvider>
        <MapProvider>
          <SessionProvider session={session}>
            <PageLayout>
              <Component {...pageProps} />
            </PageLayout>
          </SessionProvider>
        </MapProvider>
      </AlertContextProvider>
    </ChakraProvider>
  );
};

export default trpc.withTRPC(MyApp);
