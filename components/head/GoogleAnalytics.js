import Script from "next/script";

function GoogleAnalytics() {
  const run = `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-Y044SNS4TJ');`;

  return (
    <>
      <Script strategy="afterInteractive" id="google-gtag" src="https://www.googletagmanager.com/gtag/js?id=G-Y044SNS4TJ" async />
      <Script strategy="afterInteractive" id="google-gtag-inline" dangerouslySetInnerHTML={run} />
    </>
  );
}

export default GoogleAnalytics;
