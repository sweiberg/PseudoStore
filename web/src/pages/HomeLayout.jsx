import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer, Header } from '../components';

const HomeLayout = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <>
      {!isDashboard && <Header />}
      <Outlet />
      {!isDashboard && <Footer />}
    </>
  );
};

export default HomeLayout;