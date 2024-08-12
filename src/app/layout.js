import Head from 'next/head';
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CookieConsentComponent from "@/components/atoms/CookieConsent";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pubKey = process.env.NEXT_PUBLIC_KLAVIYO_COMPANY;
  const src = `https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${pubKey}`;
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <title>Fresh.Land - Nyhøstet frugt og grøntsager. Bestil nu!</title>
        {/* <script src="https://apis.google.com/js/platform.js" async defer></script> */}
        {/* <script>
                        {`
              (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:5068577,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `}
                    </script> */}
      </Head>
      <body className={inter.className}>
        {pubKey ? (
          <script type="text/javascript" async="" src={src}></script>
        ) : ''}
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <CookieConsentComponent />
      </body>
    </html>
  );
}
