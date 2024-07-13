import React, { ReactNode } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div>
      {pathname !== '/' && <Header />}
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;