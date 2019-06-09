import React from "react";
import { Container } from "next/app";
import Head from "next/head";

import AppLayout from "../components/AppLayout";

const Instagram = ({ Component }) => {
  return (
    <>
      <Head>
        <title>NodeBird</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js" />
      </Head>
      <Container>
        <AppLayout>
          <Component />
        </AppLayout>
      </Container>
    </>
  );
};

export default Instagram;
