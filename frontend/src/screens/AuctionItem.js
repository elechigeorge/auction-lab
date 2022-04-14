import React, { useEffect, useState } from "react";
import {
  Container,
  Image,
  Modal,
  Button,
  Form,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getSingle } from "../action/auction";
import { grabBid, makeBid } from "../action/bid";
import Moment from "react-moment";

const AuctionItem = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [price, setPrice] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getSingleAuction = useSelector((state) => state.getSingleAuction);
  const { loading, error, auction } = getSingleAuction;

  const getBid = useSelector((state) => state.getBid);
  const { loading: bid_loading, error: bid_error, bids } = getBid;

  useEffect(() => {
    dispatch(getSingle(params.id));
  }, [getSingle, dispatch]);

  useEffect(() => {
    dispatch(grabBid(params.id));
  }, [grabBid, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    // create bid
    dispatch(makeBid(price, params.id));

    dispatch(handleClose);
  };

  return (
    <div className="mt-5 mb-5">
      <Container>
        <a
          href="/"
          className="btn btn-dark btn-md mb-5"
          style={{ borderRadius: "0px" }}
        >
          Go back
        </a>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        {auction && (
          <div>
            <p className="text-underline text-uppercase text-success h4">
              Auction Title
            </p>
            <h3 className="mb-3">{auction.title}</h3>

            <p className="text-underline text-uppercase text-success h4 mt-2">
              Auction Expiry Date
            </p>

            <h3 className="mb-3">
              <Moment format="YYYY/MM/DD">{auction.expiry}</Moment>
            </h3>
            <div className="mt-3">
              <Image
                src={`https://auction-lab.herokuapp.com/${auction.image}`}
                alt="auction image"
              />
            </div>
            <p className="text-underline text-uppercase text-success h4">
              Description
            </p>
            <p className="lead mt-3">{auction.description}</p>

            <p className="text-underline text-uppercase text-success h4 mt-2">
              all bids ||{" "}
              <a
                onClick={handleShow}
                className="btn btn-dark btn-sm text-lowercase lead"
              >
                Create a new bid
              </a>
            </p>

            {bid_error && <Message variant="danger">{bid_error}</Message>}
            {bid_loading && <Loader />}

            {bids &&
              bids.map((bid) => (
                <ListGroup key={bid._id} className="mt-2">
                  <ListGroupItem>
                    Bid price: <span className="lead">{bid.price}</span> ||
                    Bidder: {bid.user.fullname} || Bidder Email:{" "}
                    {bid.user.email}
                  </ListGroupItem>
                </ListGroup>
              ))}
          </div>
        )}
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Bid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mt-3" controlId="title">
              <Form.Label>Price (N)</Form.Label>
              <Form.Control
                type="name"
                placeholder="enter a bid price "
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <p className="lead mt-3">After you submit the form, refresh the page </p>
            <div className="d-grid mt-3">
              <Button type="submit" variant="dark" className="btn-block">
                create
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="mb-5" style={{ height: "20vh" }}></div>
    </div>
  );
};

export default AuctionItem;
