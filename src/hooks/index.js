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

export const useGetNodeNumberOf = (account) => {
  const [getNodeNumberOf] =
    useContractCall({
      abi: SisyphusContractInterface,
      address: SisyphusContractAddress,
      method: 'getNodeNumberOf',
      args: [account],
    }) ?? [];

  return getNodeNumberOf;
};

export const useGetRewardAmount = (nodeNumber) => {
  const [getRewardAmount] =
    useContractCall(
      nodeNumber > 0 && {
        abi: SisyphusContractInterface,
        address: SisyphusContractAddress,
        method: 'getRewardAmount',
        args: [],
      }
    ) ?? [];

  return getRewardAmount;
};

export const useGetTotalCreatedNodes = () => {
  const [getTotalCreatedNodes] =
    useContractCall({
      abi: SisyphusContractInterface,
      address: SisyphusContractAddress,
      method: 'getTotalCreatedNodes',
      args: [],
    }) ?? [];

  return getTotalCreatedNodes;
};

export const useCashoutAll = () => {
  const { state, send, event } = useContractFunction(
    sisyphusContract,
    'cashoutAll',
    {}
  );

  return { state, send, event };
};

export const useApprove = () => {
  const { state, send, event } = useContractFunction(
    sisyphusContract,
    'approve',
    {}
  );

  return { state, send, event };
};

export const useCreateNodeWithTokens = () => {
  const { state, send, event } = useContractFunction(
    sisyphusContract,
    'createNodeWithTokens',
    {}
  );

  return { state, send, event };
};
