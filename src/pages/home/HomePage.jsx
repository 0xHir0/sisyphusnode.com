import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import {
  MdAccountBalanceWallet,
  MdViewAgenda,
  MdPaid,
  MdGeneratingTokens,
} from 'react-icons/md';
import Button from '../../components/button';
import Input from '../../components/input';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { ReactComponent as InfoIcon } from '../../assets/icons/icon-info.svg';
import { ReactComponent as PrizeIcon } from '../../assets/icons/icon-prize.svg';
import 'react-toastify/dist/ReactToastify.css';
import './HomePage.scss';
import { Ropsten, useEthers } from '@usedapp/core';
import {
  useBalanceOf,
  useGetNodeNumberOf,
  useGetRewardAmount,
  useGetTotalCreatedNodes,
  useCashoutAll,
  useApprove,
  useCreateNodeWithTokens,
} from '../../hooks';
import { toast } from 'react-toastify';

const HomePage = () => {
  const { account } = useEthers();

  const balanceOf = useBalanceOf(account);
  const getNodeNumberOf = useGetNodeNumberOf(account);
  const getRewardAmount = useGetRewardAmount(getNodeNumberOf);
  const getTotalNodesCreated = useGetTotalCreatedNodes();

  const { state: cashoutAllState, send: cashoutAll } = useCashoutAll();
  const { state: approveState, send: approve } = useApprove();
  const { state: createNodeState, send: createNodeWithTokens } =
    useCreateNodeWithTokens();

  const [isAvax, setIsAvax] = useState(false);
  const [nodeName, setNodeName] = useState('');
  const [myNode, setMyNode] = useState(0);
  const [allNodes, setAllNodes] = useState(0);
  const [ssph, setSSPH] = useState(0);
  const [rewards, setRewards] = useState(0);

  useEffect(() => {
    const networkId = parseInt(window?.ethereum?.chainId, 16);
    if (networkId === Ropsten.chainId) {
      setIsAvax(true);
    }
  }, []);

  useEffect(() => {
    setSSPH(balanceOf / 10 ** 18);
  }, [balanceOf]);

  useEffect(() => {
    setMyNode(getNodeNumberOf);
  }, [getNodeNumberOf]);

  useEffect(() => {
    setAllNodes(getTotalNodesCreated);
  }, [getTotalNodesCreated]);

  useEffect(() => {
    console.log('TotalNodesCreated => ', getRewardAmount);
    getRewardAmount && setRewards(getRewardAmount);
  }, [getRewardAmount]);

  useEffect(() => {
    console.log(cashoutAllState);
    cashoutAllState.status === 'Exception' &&
      toast.error(cashoutAllState.errorMessage);

    cashoutAllState.status === 'Success' &&
      toast.info('You just claimed all rewards!');
  }, [cashoutAllState]);

  useEffect(() => {
    console.log(approveState);
    approveState.status === 'Success' && toast.info('You are approved!');
  }, [approveState]);

  useEffect(() => {
    console.log(createNodeState);
    createNodeState.status === 'Exception' &&
      toast.error(createNodeState.errorMessage);

    createNodeState.status === 'Success' &&
      toast.info('You just created a node!');
  }, [createNodeState]);

  const handleInputChange = (e) => {
    setNodeName(e.target.value);
  };

  /* Handle the event to claim all rewards token for each user */
  const handleClaimAll = () => {
    if (isAvax) {
      myNode > 0 ? cashoutAll() : toast.error('Please create a node');
    } else {
      toast.error('Please make sure you are on the Avalanche network');
    }
  };

  /* Handle the event happened by click `BUY SISYPHUS` button */
  const handleBuySisyphus = (tokenAddress) => {
    window.open(
      'https://traderjoexyz.com/#/trade?outputCurrency=' + tokenAddress,
      '_blank'
    );
  };

  /* Move to discord channel */
  const handleDiscordBtn = (link) => {
    window.open(link, '_blank');
  };

  /* Handle the event to approve the contract before trying to create a node */
  const handleApprove = () => {
    if (isAvax) {
      approve(
        '0x501efcc1942ce98e42c69e130108a2acc29ebcbf',
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
      );
    } else {
      toast.error('Please make sure you are on the Avalanche network');
    }
  };

  /* Handle the event to create new node */
  const handleCreateNode = () => {
    if (isAvax) {
      if (ssph < 10) {
        toast.error('Please make sure you have at least 10 $SSPH');
      } else if (nodeName === '') {
        toast.error('Please enter your node name.');
      } else {
        createNodeWithTokens(nodeName);
      }
    } else {
      toast.error('Please make sure you are on the Avalanche network');
    }
  };

  return (
    <>
      <div className='homepage'>
        <div className='max-w-7xl mx-auto'>
          <Header />
          <div className='px-6 md:px-12 py-7 grid grid-cols-1 lg:grid-cols-4 gap-y-8 lg:gap-x-8'>
            <div className='col-span-1 flex gap-8 flex-col'>
              <div className='flex flex-col justify-center items-center w-full bg-[#1A202C] px-6 py-8 rounded-[10px] container-shadow gap-2'>
                <div className='text-5xl'>
                  <MdAccountBalanceWallet />
                </div>
                <h3 className='text-3xl text-[#c6934b] font-bold'>
                  <CountUp
                    end={myNode}
                    duration={1}
                    separator=','
                    decimal=','
                  />{' '}
                  / 100
                </h3>
                <div className='uppercase'>My nodes</div>
              </div>
              <div className='flex flex-col justify-center items-center w-full bg-[#1A202C] px-6 py-8 rounded-[10px] container-shadow gap-2'>
                <div className='text-5xl'>
                  <MdViewAgenda />
                </div>
                <h3 className='text-3xl text-[#c6934b] font-bold'>
                  <CountUp
                    end={allNodes}
                    duration={1}
                    separator=','
                    decimal=','
                  />
                </h3>
                <div className='uppercase'>All nodes</div>
              </div>
              <div className='flex flex-col justify-center items-center w-full bg-[#1A202C] px-6 py-8 rounded-[10px] container-shadow gap-2'>
                <div className='text-5xl'>
                  <MdGeneratingTokens />
                </div>
                <h3 className='text-3xl text-[#c6934b] font-bold'>
                  <CountUp
                    end={ssph}
                    duration={2}
                    decimals={2}
                    separator=','
                    decimal='.'
                  />
                </h3>
                <div className='uppercase'>My SSPH</div>
              </div>
              <div className='mb-4 relative flex flex-col justify-center items-center w-full bg-[#1A202C] px-6 pt-8 pb-8 md:pb-16 rounded-[10px] container-shadow gap-2'>
                <div className='text-5xl'>
                  <MdPaid />
                </div>
                <h3 className='text-3xl text-[#c6934b] font-bold'>
                  <CountUp
                    end={rewards}
                    duration={3}
                    decimals={2}
                    separator=','
                    decimal='.'
                  />
                </h3>
                <div className='uppercase'>My rewards</div>
                <Button
                  className='btn-primary btn-claim absolute -bottom-6'
                  title='Claim all'
                  handleClick={(e) => handleClaimAll()}
                />
              </div>
            </div>
            <div className='col-span-3 flex gap-8 flex-col'>
              <div className='flex flex-col w-full bg-[#1A202C] px-6 py-8 rounded-[10px] container-shadow gap-8'>
                <h2 className='text-2xl md:text-4xl uppercase'>
                  Welcome to the sisyphus
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  <img
                    src='./assets/images/image1.jpg'
                    className='relative bg-cover w-full rounded-3xl object-cover h-52 opacity-50'
                    alt='item1'
                  />
                  <img
                    src='./assets/images/image2.jpg'
                    className='relative bg-cover w-full rounded-3xl object-cover h-52 opacity-50'
                    alt='item1'
                  />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  <div>
                    From this console, you can view, manage, and launch SISYPHUS
                    -nodes.You can also see how many rewards have been
                    allocated, and claim them here. Then if you want, you can
                    use them to create more SISYPHUS-nodes, up to a maximum of
                    100 per wallet.
                  </div>
                  <div className='flex flex-col gap-6 items-center justify-center'>
                    <div className='alert'>
                      <InfoIcon />
                      <div>
                        Ensure you are at{' '}
                        <span className='text-[#c6934b]'>
                          https://sisyphusnodes.biz/
                        </span>
                      </div>
                    </div>
                    <div className='alert'>
                      <PrizeIcon />
                      <div>
                        Current rewards:{' '}
                        <span className='font-bold text-[#c6934b]'>0.7</span>{' '}
                        per node, per day
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col sm:flex-row gap-8 gap-y-4 items-center justify-center pt-4 border-t border-t-black'>
                  <Button
                    title='Buy Sisyphus'
                    className='btn-info'
                    handleClick={(e) =>
                      handleBuySisyphus(
                        '0x8f47416cae600bccf9530e9f3aeaa06bdd1caa79'
                      )
                    }
                  />
                  <Button
                    title='Discord'
                    className='btn-primary'
                    handleClick={(e) =>
                      handleDiscordBtn('https://discord.com/')
                    }
                  />
                </div>
              </div>
              <div className='flex flex-col w-full bg-[#1A202C] px-6 py-8 rounded-[10px] container-shadow gap-4'>
                <h2 className='text-2xl md:text-4xl uppercase'>
                  Create Your Node
                </h2>
                <div className='pt-4 border-t border-t-black'>
                  Create a SISYPHUS-node with 10{' '}
                  <span className='uppercase text-[#c6934b]'>$SSPH</span> tokens
                  to earn lifetime high-yield{' '}
                  <span className='uppercase text-[#c6934b]'>$SSPH</span> token
                  rewards. token Currently estimated rewards: 0.7{' '}
                  <span className='uppercase text-[#c6934b]'>$SSPH</span> / day.
                </div>
                <div className='pt-4 border-t border-t-black'>
                  Start earning lifetime high-yield{' '}
                  <span className='uppercase text-[#c6934b]'>$SSPH</span> token
                  rewards. Rewards calculations are based on many factors,
                  including the number of nodes, node revenue, token price, and
                  protocol revenue, and they are variable.
                </div>
              </div>
              <div className='flex flex-col w-full bg-[#1A202C] px-6 py-8 rounded-[10px] container-shadow gap-4'>
                <h2 className='text-2xl md:text-4xl uppercase'>Contract</h2>
                <div className='pt-4 border-t border-t-black text-[#c6934b]'>
                  Please approve the contract before trying to create a node. If
                  it is your first interaction with the <span>contract</span>
                </div>
                <div className='flex flex-col md:flex-row items-center gap-x-8 gap-y-2 pt-2 border-t border-t-black'>
                  <Input
                    className='w-full md:w-60'
                    value={nodeName}
                    minLength={4}
                    maxLength={31}
                    handleInputChange={handleInputChange}
                  />
                  <div>
                    A contribution of 10{' '}
                    <span className='uppercase text-[#c6934b]'>$SSPH</span>{' '}
                    tokens to the community is required to create a node and
                    participate in rewards.
                  </div>
                </div>
                <div className='flex flex-col sm:flex-row gap-8 gap-y-4 items-center justify-center pt-4 border-t border-t-black'>
                  <Button
                    title='Approve'
                    className='btn-success'
                    handleClick={(e) => handleApprove()}
                  />
                  <Button
                    title='Create a node'
                    className='btn-primary'
                    handleClick={(e) => {
                      handleCreateNode();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default HomePage;
