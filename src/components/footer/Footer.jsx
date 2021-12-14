import React from 'react';
import { FaDiscord, FaTwitter, FaFacebook } from 'react-icons/fa';
import './Footer.scss';

const Footer = () => {
  return (
    <div className='flex items-center justify-center gap-8 py-8'>
      <div
        className='text-white text-2xl hover:text-gray-200 duration-300'
      >
        SISYPHUS
      </div>
      <a
        href='/'
        className='text-white text-2xl hover:text-gray-200 duration-300'
      >
        <FaTwitter />
      </a>
      <a
        href='/'
        className='text-white text-2xl hover:text-gray-200 duration-300'
      >
        <FaDiscord />
      </a>
    </div>
  );
};

export default Footer;
