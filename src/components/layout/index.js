import React from 'react';
import Footer from '@/components/atoms/Footer/Footer';
import '../../app/globals.css';
import Header from '@/components/atoms/Footer/Footer';
const Layout = ({ children }) => {

    // useEffect(() => {
    //     const cmpScript = document.createElement("script");
    //     cmpScript.id = "Cookiebot";
    //     cmpScript.src = "https://consent.cookiebot.com/uc.js";
    //     cmpScript.setAttribute("data-cbid", "db859ade-e940-4582-87f4-defbc13c23c9");
    //     cmpScript.setAttribute("type", "text/javascript");
    //     cmpScript.setAttribute("async", "true");
    //     cmpScript.setAttribute("data-blockingmode", "auto");
    //     document.head.appendChild(cmpScript);

    //     return () => {
    //         document.head.removeChild(cmpScript);
    //     };
    // }, []);

    return (
        <div>
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
