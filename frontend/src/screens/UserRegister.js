import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { register } from "../action/user";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const [fullname, setFullName] = useState("");

  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");


  const navigate = useNavigate();
  const dispatch = useDispatch();

  // REGISTER CONFIG
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      return navigate("/");
    }
  }, [userInfo, dispatch, register]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      register(
        fullname,
        email,
        password
      )
    );
  };
  

  return (
    <FormContainer>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <h1>Account Register</h1>

      <Form onSubmit={submitHandler}>
      
        <Form.Group controlId="first_name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="full name"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <div className="d-grid mt-2">
          <Button type="submit" variant="dark" className="btn-block">
            Register
          </Button>
        </div>
        <p className="mt-3">
          Dont have an account yet <a href="/login">Login </a>
        </p>
      </Form>
    </FormContainer>
  );
};

export default UserRegister;