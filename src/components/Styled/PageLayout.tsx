import Head from "next/head";
import React from "react";
import Navbar from "./NavBar";
type Props = {
  children: React.ReactNode;
};

const PageLayout = ({ children }: Props) => {
  return (
    <div className="h-screen">
      <Head>
        <title>PDX Summer Camps</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <main className="max-h-fill">{children}</main>;
    </div>
  );
};

export default PageLayout;
