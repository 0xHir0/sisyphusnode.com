import React from 'react';
import Button from '../button';
import './Header.scss';

const Header = () => {
  return (
    <div className='header'>
      <a href='/'>
        <img
          src='./assets/images/trywith.png'
          className='w-40 h-34 min-w-[128px] min-h-[96px]'
          alt='logo'
        />
      </a>
      <div className='flex flex-col sm:flex-row gap-8 gap-y-4 items-center w-full md:w-auto'>
        <Button
          title='Contract address'
          className='btn-primary'
          handleClick={() => {}}
        />
        <Button
          title='Connect wallet'
          className='btn-secondary'
          handleClick={() => {}}
        />
      </div>
    </div>
  );
};

export default Header;
