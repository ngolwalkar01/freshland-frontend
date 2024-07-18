import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en-US">
      <Head>
        <meta
          name="description"
          content="Fresh.Land giver dig mulighed for at nyde frugt og grønt nyhøstet fra gården. Bedre for miljøet, bedre for landmanden og bedre for dig."
        ></meta>
        <script id="klarna-sdk" src="https://x.klarnacdn.net/kp/lib/v1/api.js" async></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
