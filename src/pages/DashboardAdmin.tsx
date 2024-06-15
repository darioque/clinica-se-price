import React from 'react';
import NavBar from '../components/NavBar';
import { Footer } from '../components';
import UserTable from '../components/UserTable';

const DashboardAdmin = () => {
  return (
    <div className='h-screen w-full'>
      <NavBar message='Logout' />
      <UserTable />
      <Footer />
    </div>
  );
};

export default DashboardAdmin;
