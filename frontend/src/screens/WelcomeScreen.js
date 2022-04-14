import React from 'react'
import { Container } from 'react-bootstrap'

const WelcomeScreen = () => {
  return (
    <div className='bg-light' style={{height: "30vh"}}>
        <Container>
            <div style={{display: "flex", flexDirection: "column", justifyContent:"center", height: "30vh"}}>
            <h1>Welcome to the Auction Market</h1>
            <p className='lead'>create auctions, bid on existing auction and buy more...</p>
            </div>
        </Container>
    </div>
  )
}

export default WelcomeScreen