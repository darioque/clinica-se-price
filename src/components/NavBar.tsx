import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CrossIcon } from '../icons/icons';

const NavBar = () => {
  const { logout } = useAuth();
  return (
    <header className='bg-gray-900 text-white px-4 lg:px-6 h-14 flex items-center'>
      <a
        href='#'
        className='flex items-center justify-center'
      >
        <CrossIcon className='h-6 w-6' />
        <span className='font-bold text-lg p-1'>Clinica SePrice</span>
      </a>
      <nav className='ml-auto flex gap-4 sm:gap-6'>
        <button
          onClick={() => {
            logout();
          }}
          className='text-sm font-medium hover:underline underline-offset-4'
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default NavBar;