import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { grabAuction } from "../action/auction";
import Message from "../components/Message";
import Loader from "../components/Loader";

const AuctionHome = () => {
  

  const dispatch = useDispatch();

  const getAuction = useSelector((state) => state.getAuction);
  const { loading, error, auctions } = getAuction;

  useEffect(() => {
    dispatch(grabAuction());
  }, [grabAuction, dispatch]);

  return (
    <div className="mt-3">
      <Container>
        <h2>
          Latest <span className="text-light bg-dark p-1">Auction</span>
        </h2>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Row>
          {auctions &&
            auctions.map((auction) => (
              <Col sm={12} md={6} lg={6} key={auction._id}>
                <div className="mb-4">
                  <Card style={{ width: "100%" }}>
                    <Card.Img
                      variant="top"
                      src={`http://localhost:4000/${auction.image}`}
                    />
                    <Card.Body>
                      <Card.Title>{auction.title}</Card.Title>
                      <div className="">
                        <a
                          href={`/auction/${auction._id}`}
                          className="btn btn-dark btn-md btn-block"
                        >
                          View Auction
                        </a>
                        
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            ))}
        </Row>
      </Container>
      
    </div>
  );
};

export default AuctionHome;
