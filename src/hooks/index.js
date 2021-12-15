import { ethers } from 'ethers';
import { useContractCall } from '@usedapp/core';
import SisyphusABI from '../abi/SisyphusABI.json';
import { SisyphusContractAddress } from '../contracts';

const SisyphusContractInterface = new ethers.utils.Interface(
  SisyphusABI
);

export const useMaxAmount = () => {
  const [maxAmount] =
    useContractCall({
      abi: SisyphusContractInterface,
      address: SisyphusContractAddress,
      method: 'MAX_AMOUNT',
      args: [],
    }) ?? [];

  return maxAmount;
};

export const useTokenPrice = () => {
  const [PRICE] =
    useContractCall({
      abi: SisyphusContractInterface,
      address: SisyphusContractAddress,
      method: 'PRICE',
      args: [],
    }) ?? [];

  return PRICE;
};

export const useMaxMint = () => {
  const [MAX_MINT] =
    useContractCall({
      abi: SisyphusContractInterface,
      address: SisyphusContractAddress,
      method: 'MAX_MINT',
      args: [],
    }) ?? [];

  return MAX_MINT;
};

export const useSaleIsActive = () => {
  const [saleIsActive] =
    useContractCall({
      abi: SisyphusContractInterface,
      address: SisyphusContractAddress,
      method: 'saleIsActive',
      args: [],
    }) ?? [];

  return saleIsActive;
};

export const useWhiteListSaleIsActive = () => {
  const [whiteListSaleIsActive] =
    useContractCall({
      abi: SisyphusContractInterface,
      address: SisyphusContractAddress,
      method: 'whiteListSaleIsActive',
      args: [],
    }) ?? [];

  return whiteListSaleIsActive;
};

export const useWhitelist = (address) => {
  const [whitelist] =
    useContractCall({
      abi: SisyphusContractInterface,
      address: SisyphusContractAddress,
      method: 'whitelist',
      args: [address],
    }) ?? [];

  return whitelist;
};
