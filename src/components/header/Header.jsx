import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button';
import './Header.scss';
import { toast } from 'react-toastify';
import { Avalanche, useEthers } from '@usedapp/core';
import { truncate } from '../../utils';

const Header = () => {
  const navigate = useNavigate();
  const { activateBrowserWallet, account } = useEthers();

  window.ethereum.on('chainChanged', () => {
    window.location.reload();
  });

  const handleClickAddressButton = (link) => {
    window.open('https://www.snowtrace.io/' + link, '_blank');
  };

  const handleConnectWalletBtn = async () => {
    if (typeof web3 !== 'undefined') {
      const networkId = await window.ethereum.request({
        method: 'net_version',
      });

      console.log(networkId, Avalanche.chainId);

      if (networkId == Avalanche.chainId) {
        activateBrowserWallet();
      } else {
        toast.error('Please make sure you are on the Avalanche network.');
      }
    } else {
      toast.error('Please make sure your metamask.');
    }
  };

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
          handleClick={() => handleClickAddressButton('')}
        />
        {account ? (
          <Button
            title={truncate(account)}
            className='btn-secondary'
            handleClick={(e) => {}}
          />
        ) : (
          <Button
            title='Connect wallet'
            className='btn-secondary'
            handleClick={() => handleConnectWalletBtn()}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
