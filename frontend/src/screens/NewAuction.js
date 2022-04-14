import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { makeAuction } from "../action/auction";
import api from "../util/api";


const NewAuction = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");
  const [message, setMessage] = useState(null);
  const [expiry, setExpiry] = useState("");

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const createAuction = useSelector((state) => state.createAuction);
  const { loading, error, auction } = createAuction;

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(makeAuction(image, title, description));
  };

  useEffect(() => {
    if (auction) {
      return navigate(`/auction/${auction._id}`);
    }
  }, [auction]);

  // PROFILE PICTURE UPLOADING STUFFS
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await api.post("/upload/image", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <FormContainer>
        <h1>Create a new auction</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mt-3 mb-3" controlId="profile_picture_handler">
            <Form.Label>Auction Image</Form.Label>
            <Form.Control
              type="image"
              placeholder="Auction Cover Picture"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              disabled
            ></Form.Control>
            <input
              type="file"
              name="image"
              id="image-file"
              placeholder="Select your auction cover picture here"
              onChange={uploadFileHandler}
              className="file"
              style={{ width: "300px" }}
            />
            {uploading && <Loader />}
          </Form.Group>

          <Form.Group className="mt-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="name"
              placeholder="Title of your auction "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group
            className="mb-3 mt-2"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Tell us more about this item</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ height: "20vh" }}
            />
            <Form.Text>
              use multiple *** to create a division or paragraph
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="date of birth">
            <Form.Label>Select Auction Expiry date_of_birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter Expiry Date"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <div className="d-grid mt-3">
            <Button type="submit" variant="dark" className="btn-block">
              Submit auction
            </Button>
          </div>
        </Form>
      </FormContainer>
    </div>
  );
};

export default NewAuction;
