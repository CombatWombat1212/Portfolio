// LoadingScreen.js
import React, { useEffect, useState } from "react";
import useEllipse from "@/scripts/hooks/useEllipse";

const LoadingScreen = ({ chosen, showLoading }) => {
  const ellipse = useEllipse(450, 3, 1);

  return (
    <div className={`loading-screen 
    `
    }>
      <h3
        className={`loading-screen--text
        ${showLoading ? "" : "loading-screen--text__hidden"}
        `}
        dangerouslySetInnerHTML={{
          __html: chosen ? (chosen.endsWith("...") ? `${chosen.slice(0, -3)}${ellipse}` : chosen) : ellipse,
        }}></h3>
    </div>
  );
};

export default LoadingScreen;
