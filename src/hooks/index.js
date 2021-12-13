import { ethers } from 'ethers';
import { useContractCall } from '@usedapp/core';
import PokerpupsnftABI from '../abi/PokerpupsnftABI.json';
import { PokerpupsnftContractAddress } from '../contracts';

const PokerpupsnftContractInterface = new ethers.utils.Interface(
  PokerpupsnftABI
);

export const useMaxAmount = () => {
  const [maxAmount] =
    useContractCall({
      abi: PokerpupsnftContractInterface,
      address: PokerpupsnftContractAddress,
      method: 'MAX_AMOUNT',
      args: [],
    }) ?? [];

  return maxAmount;
};

export const useTokenPrice = () => {
  const [PRICE] =
    useContractCall({
      abi: PokerpupsnftContractInterface,
      address: PokerpupsnftContractAddress,
      method: 'PRICE',
      args: [],
    }) ?? [];

  return PRICE;
};

export const useMaxMint = () => {
  const [MAX_MINT] =
    useContractCall({
      abi: PokerpupsnftContractInterface,
      address: PokerpupsnftContractAddress,
      method: 'MAX_MINT',
      args: [],
    }) ?? [];

  return MAX_MINT;
};

export const useSaleIsActive = () => {
  const [saleIsActive] =
    useContractCall({
      abi: PokerpupsnftContractInterface,
      address: PokerpupsnftContractAddress,
      method: 'saleIsActive',
      args: [],
    }) ?? [];

  return saleIsActive;
};

export const useWhiteListSaleIsActive = () => {
  const [whiteListSaleIsActive] =
    useContractCall({
      abi: PokerpupsnftContractInterface,
      address: PokerpupsnftContractAddress,
      method: 'whiteListSaleIsActive',
      args: [],
    }) ?? [];

  return whiteListSaleIsActive;
};

export const useWhitelist = (address) => {
  const [whitelist] =
    useContractCall({
      abi: PokerpupsnftContractInterface,
      address: PokerpupsnftContractAddress,
      method: 'whitelist',
      args: [address],
    }) ?? [];

  return whitelist;
};
