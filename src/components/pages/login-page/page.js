import React, { useState } from "react";
import Header from "@/components/atoms/Header/Header";
import styles from "./Login.module.css";
import { toast } from "react-toastify";
import authService from "@/services/auth";
import { useRouter } from "next/navigation";
import { loginTranslation, serviceTranslation } from "@/locales";
// import cookieService from '@/services/auth';
import { signIn, signOut as googleSignOut } from "next-auth/react";
import { setUserLoggedInData } from "@/components/service/auth";
import Link from "next/link";
import Image from "next/image";
import { identifyUser } from "@/components/service/klaviyoTrack";


const toastTimer = parseInt(process.env.NEXT_PUBLIC_TOAST_TIMER);
const lang = process.env.NEXT_PUBLIC_LANG || "se";

const expires = parseInt(process.env.NEXT_PUBLIC_CART_KEY_EXPIRY);
// const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Byb3pvbmVkLmNvbS9mcmVzaC1sYW5kIiwiaWF0IjoxNzE2OTAxMzk4LCJleHAiOjE3MTY5MDQ5OTgsImRhdGEiOnsidXNlciI6eyJpZCI6MTZ9fX0.V0XQTF1fUA1FEHZce3J2tX6MPy7x9vOaavN26fldnzg';

const Login = () => {
  const log = loginTranslation[lang];
  const service = serviceTranslation[lang];
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const logoutGoogle = async () => {
    try {
      await googleSignOut({
        redirect: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.login({ username, password });
      if (data && data.token && data.user_email) {
        setUserLoggedInData(data);
        identifyUser(data.user_email);
        await logoutGoogle();
        // localStorage.setItem("token", `Bearer ${data.token}`);
        // cookieService.setCookie("token", `Bearer ${data.token}`, expires);

        // localStorage.setItem("userId", data.user_id);
        // cookieService.setCookie("userId", data.user_id, expires);
        router.push("/account");
      }
    } catch (error) {
      // localStorage.setItem("token", `Bearer ${TOKEN}`);
      // cookieService.setCookie("token", `Bearer ${TOKEN}`, expires);
      // router.push("/account");
      const msg = error?.response?.data?.message || service.loginAttempt;
      toast.error(msg,
        { autoClose: toastTimer }
      );
    }
  };

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     (async () => {
  //       try {
  //         const data = await authService.loginWithGoogle({ id_token: session.idToken });
  //         if (typeof window !== 'undefined') {
  //           localStorage.setItem('data', JSON.stringify(data));
  //         }
  //         router.push("/account");
  //       } catch (error) {
  //         toast.error("Failed to fetch user data.", { autoClose: toastTimer });
  //       }
  //     })();
  //   }
  // }, [session, status, router]);

  return (
    <>
      <Header />
      <div className={styles.modal}>
        <h1>{log.login}</h1>
        <form className={styles.modalContent} onSubmit={handleLogin}>
          <div className={styles.container}>
            <label htmlFor="uname">
              <b>{log.usern}</b>
            </label>
            <input
              type="text"
              placeholder={log.usern}
              name="uname"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="psw">
              <b>{log.password}</b>
            </label>
            <input
              type="password"
              placeholder={log.password}
              name="psw"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className={styles.loginsubmit}>
              {log.login}
            </button>
          </div>
          <div className={styles.btncontainer}>
            <label>
              <input type="checkbox" name="remember" />
              {log.remb}
            </label>
            <span className={styles.psw}>
              <Link href="/forgotpassword"> {log.forgot} {log.pass}</Link>
            </span>
          </div>
          <p>{log.useSocial}</p>
          <div className={styles.socialmedia}>
            <a href="#" className="fb btn" onClick={(e) => {
              e.preventDefault();
              signIn("facebook")
            }}>
              <i className="fa-brands fa-facebook-f"></i> {log.logfb}
            </a>
            {/* <a href="#" className={styles.twitter}>
              <i className="fa-brands fa-twitter"></i> {log.logt}
            </a> */}
            <a
              href="#"
              onClick={async (e) => {
                e.preventDefault();
                signIn("google");
              }}
              className={`${styles.google} login-with-google-button`}
            >
              <Image
                src="/Images/googleiconimg.png"
                alt="Solar Impulse"
                width={28}
                height={28}
              />
              {log.logg}
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;

