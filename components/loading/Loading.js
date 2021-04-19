import React from "react";
import { Circle } from "better-react-spinkit";

const Loading = () => {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <img
          alt=""
          src="/whatsapp.png"
          style={{ marginBottom: 10 }}
          height={200}
        />
        <Circle color="#3CBC2B" size={60} />
      </div>
    </center>
  );
};

export default Loading;
