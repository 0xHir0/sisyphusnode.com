import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { MdAccountBalanceWallet, MdViewAgenda, MdPaid, MdGeneratingTokens } from 'react-icons/md';
import Button from '../../components/button';
import Input from '../../components/input';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { ReactComponent as InfoIcon } from '../../assets/icons/icon-info.svg';
import { ReactComponent as PrizeIcon } from '../../assets/icons/icon-prize.svg';
import 'react-toastify/dist/ReactToastify.css';
import './HomePage.scss';
import { useEthers } from '@usedapp/core';
import { useTotalFees, useGetNodeNumberOf, useBalanceOf, useGetRewardAmountOf } from '../../hooks';

const HomePage = () => {
  const { account } = useEthers();
  
  const totalFees = useTotalFees();
  const getNodeNumberOf = useGetNodeNumberOf(account);
  const balanceOf = useBalanceOf(account);
  // const rewardAmountOf = useGetRewardAmountOf(account);

  const [state, setState] = useState({
    nodeName: '',
    myNode: 0,
    allNodes: 0,
    ssph: 0,
    rewards: 0,
  });

  useEffect(() => {
    setState({...state, myNode: getNodeNumberOf / 10 ** 18})
  },[getNodeNumberOf]);

  useEffect(() => {
    setState({...state, ssph: balanceOf / 10 ** 18})
  },[balanceOf]);

  // useEffect(() => {
  //   setState({...state, rewards: rewardAmountOf})
  // },[rewardAmountOf]);

  const handleInputChange = (e) => {
    setState({ ...state, nodeName: e.target.value });
  };

  /* Handle the event to claim all rewards token for each user */
  const handleClaim = () => {
    // alert(state.nodeName)
  };

  /* Handle the event happened by click `BUY SISYPHUS` button */
  const handleBuySisyphus = (tokenAddress) => {
    // alert('buy sisyphus')
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
    // alert('approve function')
    console.log('total fees=>', parseInt(totalFees, 10));
  };

  /* Handle the event to create new node */
  const handleCreateNode = () => {
    //  alert('approve function')
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
                    end={state.nodeNumberOf}
                    duration={2}
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
                    end={state.allNodes}
                    duration={2}
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
                    end={state.ssph}
                    duration={2}
                    separator=','
                    decimal=','
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
                    end={state.rewards}
                    duration={3}
                    separator=','
                    decimal='.'
                  />
                </h3>
                <div className='uppercase'>My rewards</div>
                <Button
                  className='btn-primary btn-claim absolute -bottom-6'
                  title='Claim all'
                  handleClick={(e) => handleClaim()}
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
                  <span className='uppercase text-[#c6934b]'>$SSPH</span>{' '}
                  tokens to earn lifetime high-yield{' '}
                  <span className='uppercase text-[#c6934b]'>$SSPH</span> token
                  rewards. token Currently estimated rewards: 0.7{' '}
                  <span className='uppercase text-[#c6934b]'>$SSPH</span> /
                  day.
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
                    value={state.nodeName}
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
