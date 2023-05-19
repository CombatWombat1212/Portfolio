import Head from "next/head";
import { useState, useEffect } from "react";

export default function Favicon() {
  const [colorScheme, setColorScheme] = useState("dark");

  useEffect(() => {
    // Function to change color scheme
    const changeColorScheme = (e) => {
      setColorScheme(e.matches ? "dark" : "light");
    };

    // Create the matcher and add listener
    const matcher = window.matchMedia("(prefers-color-scheme: dark)");
    matcher.addEventListener("change", changeColorScheme);

    // Call the function once manually at component mounting time
    changeColorScheme(matcher);
    // Clean up after ourselves to avoid memory leak
    return () => {
      matcher.removeEventListener("change", changeColorScheme);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return (
    <Head>
      <link rel="icon" type="image/x-icon" href={`/favicons/favicon_${colorScheme}.ico`} />
      <link rel="icon" type="image/png" sizes="16x16" href={`/favicons/favicon_${colorScheme}-16x16.png`} />
      <link rel="icon" type="image/png" sizes="32x32" href={`/favicons/favicon_${colorScheme}-32x32.png`} />
      <link rel="apple-touch-icon" sizes="180x180" href={`/favicons/favicon_${colorScheme}-apple-touch-icon.png`} />
      <link rel="icon" type="image/png" sizes="192x192" href={`/favicons/favicon_${colorScheme}-android-chrome-192x192.png`} />
      <link rel="icon" type="image/png" sizes="512x512" href={`/favicons/favicon_${colorScheme}-android-chrome-512x512.png`} />
    </Head>
  );
}
