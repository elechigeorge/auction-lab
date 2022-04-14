import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { login } from "../action/user";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      return navigate("/");
    }
  }, [userInfo, dispatch, login]);

  const submitHandler = (e) => {

    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <h1>Account Login</h1>

      <Form onSubmit={submitHandler}>
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
            Login
          </Button>
        </div>
        <p className="mt-3">
          Dont have an account yet{" "}
          <a href="/register">Register</a>
        </p>
      </Form>
    </FormContainer>
  );
};

export default UserLogin;
