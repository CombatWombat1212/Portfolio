

import Head from "next/head";

function GoogleAnalytics() {
    return (
        <Head>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-Y044SNS4TJ"></script>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-Y044SNS4TJ');
                        `,
                }}
            />
        </Head>
    );
}

export default GoogleAnalytics;