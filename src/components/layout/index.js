import React from 'react';
import Footer from '@/components/atoms/Footer/Footer';
import '../../app/globals.css';

const Layout = ({ children }) => {
    return (
        <div>
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
