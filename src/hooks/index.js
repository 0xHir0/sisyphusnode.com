import { ethers } from 'ethers';
import { Contract } from '@ethersproject/contracts';
import { useContractCall, useContractFunction } from '@usedapp/core';
import SisyphusABI from '../abi/SisyphusABI.json';
import { SisyphusContractAddress } from '../contracts';

const SisyphusContractInterface = new ethers.utils.Interface(SisyphusABI);
const sisyphusContract = new Contract(
  SisyphusContractAddress,
  SisyphusContractInterface
);

export const useTotalFees = () => {
  const [totalFees] =
    useContractCall({
      abi: SisyphusContractInterface,
      address: SisyphusContractAddress,
      method: 'totalFees',
      args: [],
    }) ?? [];

  return totalFees;
};

export const useGetNodeNumberOf = (address) => {
  const [getNodeNumberOf] =
    useContractCall({
      abi: SisyphusContractInterface,
      address: SisyphusContractAddress,
      method: 'getNodeNumberOf',
      args: [address],
    }) ?? [];

  return getNodeNumberOf;
};

export const useBalanceOf = (address) => {
  const [balanceOf] =
    useContractCall({
      abi: SisyphusContractInterface,
      address: SisyphusContractAddress,
      method: 'balanceOf',
      args: [address],
    }) ?? [];

  return balanceOf;
};

export const useGetRewardAmountOf = (address) => {
  const [getRewardAmountOf] =
    useContractCall({
      abi: SisyphusContractInterface,
      address: SisyphusContractAddress,
      method: 'getRewardAmountOf',
      args: [address],
    }) ?? [];

  return getRewardAmountOf;
};

export const useGestationApprove = () => {
  const { state, send, event } = useContractFunction(
    sisyphusContract,
    'gestationApprove',
    {}
  );

  return { state, send, event };
};