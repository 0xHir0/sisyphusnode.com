import React, { useEffect } from 'react';
import Button from '../button';
import './Header.scss';
import { toast } from 'react-toastify';
import { Ropsten, useEthers } from '@usedapp/core';
import { truncate } from '../../utils';

const Header = () => {
  const { activateBrowserWallet, account } = useEthers();

  useEffect(() => {
    if (typeof web3 !== 'undefined') {
      const networkId = parseInt(window.ethereum.chainId, 16);
      console.log(networkId, Ropsten.chainId);

      if (networkId !== Ropsten.chainId) {
        toast.error('Please make sure you are on the Avalanche network.');
      }
    } else {
      toast.error('Please make sure your metamask.');
    }
  }, []);

  window.ethereum.on('chainChanged', () => {
    window.location.reload();
  });

  const handleClickAddressButton = (link) => {
    window.open('https://testnet.snowtrace.io/address/' + link, '_blank');
  };

  const handleConnectWalletBtn = async () => {
    if (typeof web3 !== 'undefined') {
      const networkId = parseInt(window.ethereum.chainId, 16);
      console.log(networkId, Ropsten.chainId);

      if (networkId === Ropsten.chainId) {
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
          src='./assets/images/logo.png'
          className='w-40 h-34 min-w-[128px] min-h-[96px]'
          alt='logo'
        />
      </a>
      <div className='flex flex-col sm:flex-row gap-8 gap-y-4 items-center w-full md:w-auto'>
        <Button
          title='Contract address'
          className='btn-primary'
          handleClick={() =>
            handleClickAddressButton(
              '0x2fbfcbcbeb28b18c7cf94ee68565b852f247f200'
            )
          }
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
