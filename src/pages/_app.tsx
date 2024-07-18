import '@/app/globals.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const pub_key: string = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
const stripePromise = loadStripe(pub_key);

function Main({ Component, pageProps }: AppProps) {
  return (
    <Elements stripe={stripePromise}>
      <Head>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <title>Fresh.Land - Nyhøstet frugt og grøntsager. Bestil nu!</title>
      </Head>
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
      <Component {...pageProps} />
    </Elements>
  )
}

export default Main;