import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { MapProvider } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import PageLayout from "../components/Styled/PageLayout";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <MapProvider>
      <SessionProvider session={session}>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </SessionProvider>
    </MapProvider>
  );
};

export default trpc.withTRPC(MyApp);
