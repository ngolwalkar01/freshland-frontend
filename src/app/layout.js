import Head from 'next/head';
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CookieConsentComponent from "@/components/atoms/CookieConsent";
import { DataProvider } from '@/contexts/DataContext';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pubKey = process.env.NEXT_PUBLIC_KLAVIYO_COMPANY;
  const src = `https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${pubKey}`;
  return (
    <html lang="en">
      <head>
        <script type="text/javascript" async
          defer src="/scripts/googleAnalytics.js"></script>
        <title>Fresh.Land - Nyhøstet frugt og grøntsager. Bestil nu!</title>
      </head>
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

        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${588900118705548}');
              fbq('track', 'PageView');
            `,
          }}
        /> */}
        {/* <noscript>
          <img
            height="1"
            width="1"
            alt="No image"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=588900118705548&ev=PageView&noscript=1`}
          />
        </noscript> */}
{/* 
        <script dangerouslySetInnerHTML={{
          __html: `
              !function(e){if(!window.pintrk){window.pintrk = function () {
            window.pintrk.queue.push(Array.prototype.slice.call(arguments))
          };var
          n=window.pintrk;n.queue=[],n.version="3.0";var
          t=document.createElement("script");t.async=!0,t.src=e;var
          r=document.getElementsByTagName("script")[0];
            r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
            `,
        }}></script> */}
        <DataProvider>
          {children}
        </DataProvider>
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
