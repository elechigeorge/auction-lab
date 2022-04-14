import React from 'react';
import AuctionHome from './AuctionHome';
import WelcomeScreen from './WelcomeScreen';

const ExploreScreen = () => {
  return (
    <div className='mb-5'>
      <WelcomeScreen />
      <AuctionHome />
    </div>
  )
}

export default ExploreScreen