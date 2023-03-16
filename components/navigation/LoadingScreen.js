// LoadingScreen.js
import React, { useEffect, useState } from "react";
import useEllipse from "@/scripts/hooks/useEllipse";

const LoadingScreen = ({ chosen, showLoading }) => {
  const ellipse = useEllipse(450, 3, 1);

  return (
    <div className={`loading-screen 
    `
    // ${showLoading ? "" : "loading-screen__hidden"}
    }>
      <h3
        className="loading-screen--text"
        dangerouslySetInnerHTML={{
          __html: chosen ? (chosen.endsWith("...") ? `${chosen.slice(0, -3)}${ellipse}` : chosen) : ellipse,
        }}></h3>
    </div>
  );
};

export default LoadingScreen;
