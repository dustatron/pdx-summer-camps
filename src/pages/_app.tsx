import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { MapProvider } from "react-map-gl";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme/theme";
import AlertContextProvider from "../context/AlertContext";
import "mapbox-gl/dist/mapbox-gl.css";
import { trpc } from "../utils/trpc";
import { GoogleAnalytics } from "nextjs-google-analytics";
import "../styles/globals.css";

import PageLayout from "../components/Styled/PageLayout";

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
              <GoogleAnalytics trackPageViews />
              <Component {...pageProps} />
            </PageLayout>
          </SessionProvider>
        </MapProvider>
      </AlertContextProvider>
    </ChakraProvider>
  );
};

export default trpc.withTRPC(MyApp);
