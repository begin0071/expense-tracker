import React, { useCallback, useState } from "react";
import { Form, Button, Alert, Tabs, Tab } from "react-bootstrap";

import "../../styles/global.css";
import { Wrapper } from "../../components";

import { createUser, loginUser } from "../../utils/APIs";
import Auth from "../../utils/auth";
import Swal from "sweetalert2";

const SignIn = () => {
  const [tab, setTab] = useState("login");
  const [showAlert, setShowAlert] = useState(false);
  const [validated] = useState(false);

  const [userLoginFormData, setUserLoginFormData] = useState({
    email: "",
    password: "",
  });

  const [userSignUpFormData, setUserSignUpFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validateFormData = useCallback((formData) => {
    if (formData.email === "" || formData.password === "") {
      Swal.fire({
        title: "Warning",
        text: "Please fill all the fields!",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return false;
    }

    if (formData.amount <= 0) {
      Swal.fire({
        title: "Warning",
        text: "Amount must be greater than 0!",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return false;
    }

    // check the email format with regex
    const emailRegex = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
    );
    if (!emailRegex.test(formData.email)) {
      Swal.fire({
        title: "Warning",
        text: "Please enter a valid email address!",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return false;
    }

    return true;
  }, []);

  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setUserLoginFormData({ ...userLoginFormData, [name]: value });
  };

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const response = await loginUser(userLoginFormData);
      if (!response.ok) {
        Swal.fire({
          title: "Error",
          text: "Something went wrong!",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      const { token, user } = await response.json();
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserLoginFormData({
      email: "",
      password: "",
    });
  };

  const handleSignUpInputChange = (event) => {
    const { name, value } = event.target;
    setUserSignUpFormData({ ...userSignUpFormData, [name]: value });
  };

  const handleSignUpFormSubmit = async (event) => {
    event.preventDefault();

    if (!validateFormData(userSignUpFormData)) {
      return;
    }

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const response = await createUser(userSignUpFormData);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { token, user } = await response.json();
      console.log(token);
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserSignUpFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <Wrapper>
      <Tabs
        id="controlled-tab-example"
        activeKey={tab}
        onSelect={(t) => setTab(t)}
        className="mb-3"
      >
        <Tab eventKey="login" title="Login">
          <Form
            noValidate
            validated={validated}
            onSubmit={handleLoginFormSubmit}
          >
            <Alert
              dismissible
              onClose={() => setShowAlert(false)}
              show={showAlert}
              variant="danger"
            >
              Something went wrong with your login credentials!
            </Alert>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                className="bg-light"
                type="text"
                placeholder="Your email"
                name="email"
                onChange={handleLoginInputChange}
                value={userLoginFormData.email}
                required
              />
              <Form.Control.Feedback type="invalid">
                Email is required!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                className="bg-light"
                type="password"
                placeholder="Your password"
                name="password"
                onChange={handleLoginInputChange}
                value={userLoginFormData.password}
                required
              />
              <Form.Control.Feedback type="invalid">
                Password is required!
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              id="login-button"
              className="btn btn-danger d-block w-100"
              disabled={
                !(userLoginFormData.email && userLoginFormData.password)
              }
              type="submit"
              variant="success"
            >
              Submit
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="sign-up" title="Sign Up">
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSignUpFormSubmit}
          >
            {/* show alert if server response is bad */}
            <Alert
              dismissible
              onClose={() => setShowAlert(false)}
              show={showAlert}
              variant="danger"
            >
              Something went wrong with your signup!
            </Alert>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="name">Name</Form.Label>
              <Form.Control
                className="bg-light"
                type="text"
                placeholder="Your name"
                name="name"
                onChange={handleSignUpInputChange}
                value={userSignUpFormData.name}
                required
              />
              <Form.Control.Feedback type="invalid">
                Name is required!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                className="bg-light"
                type="email"
                placeholder="Your email address"
                name="email"
                onChange={handleSignUpInputChange}
                value={userSignUpFormData.email}
                required
              />
              <Form.Control.Feedback type="invalid">
                Email is required!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                className="bg-light"
                type="password"
                placeholder="Your password"
                name="password"
                onChange={handleSignUpInputChange}
                value={userSignUpFormData.password}
                required
              />
              <Form.Control.Feedback type="invalid">
                Password is required!
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              id="signup-button"
              className="btn btn-danger d-block w-100"
              disabled={
                !(
                  userSignUpFormData.name &&
                  userSignUpFormData.email &&
                  userSignUpFormData.password
                )
              }
              type="submit"
              variant="success"
            >
              Submit
            </Button>
          </Form>
        </Tab>
      </Tabs>
    </Wrapper>
  );
};

export default SignIn;
