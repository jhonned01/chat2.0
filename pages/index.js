import React from "react";
import Head from "next/head";
import SideBar from "../components/SideBar/SideBar";
const index = () => {
  return (
    <div>
      <Head>
        <title>WhatsApp 2.0</title>
      </Head>
      <SideBar />
    </div>
  );
};

export default index;
